import { z } from "zod";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { storagePut, generateFileKey, storageDelete } from "./storage";
import { uploadDocument, getUserDocuments, deleteDocument, createContactSubmission } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
  }),

  documents: router({
    /**
     * Upload a new document
     * Accepts file data as base64 string
     */
    upload: protectedProcedure
      .input(
        z.object({
          fileName: z.string().min(1),
          fileData: z.string(), // base64 encoded file data
          mimeType: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          // Decode base64 file data
          const buffer = Buffer.from(input.fileData, "base64");

          // Generate unique file key
          const fileKey = generateFileKey(input.fileName, ctx.user?.id.toString());

          // Upload to S3
          const { url } = await storagePut(fileKey, buffer, input.mimeType || "application/octet-stream");

          // Save document metadata to database
          const document = await uploadDocument({
            userId: ctx.user!.id,
            fileName: input.fileName,
            fileKey,
            fileUrl: url,
            mimeType: input.mimeType,
            fileSize: buffer.length,
            description: input.description,
          });

          return document;
        } catch (error) {
          console.error("[Documents] Upload failed:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to upload document",
          });
        }
      }),

    /**
     * Get all documents for the current user
     */
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserDocuments(ctx.user!.id);
    }),

    /**
     * Delete a document
     */
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          // Verify ownership
          const doc = await getUserDocuments(ctx.user!.id);
          const owned = doc.some(d => d.id === input.id);

          if (!owned) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "You do not have permission to delete this document",
            });
          }

          // Delete from S3
          const document = doc.find(d => d.id === input.id);
          if (document) {
            await storageDelete(document.fileKey);
          }

          // Delete from database
          await deleteDocument(input.id);

          return { success: true };
        } catch (error) {
          console.error("[Documents] Delete failed:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete document",
          });
        }
      }),
  }),

  contact: router({
    /**
     * Submit a contact form
     */
    submit: publicProcedure
      .input(
        z.object({
          nome: z.string().min(1),
          whatsapp: z.string().min(1),
          email: z.string().email(),
          mensagem: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const submission = await createContactSubmission({
            ...input,
            status: "novo",
          });

          // TODO: Send notification to admin/owner
          // await notifyOwner({
          //   title: `Novo contato de ${input.nome}`,
          //   content: `${input.email} - ${input.whatsapp}\n\n${input.mensagem}`,
          // });

          return submission;
        } catch (error) {
          console.error("[Contact] Submission failed:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to submit contact form",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
