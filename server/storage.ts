import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

// Initialize S3 client with Manus credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "manus-storage";

/**
 * Upload a file to S3 storage
 * @param key - The S3 object key (path)
 * @param data - The file data (Buffer, Uint8Array, or string)
 * @param contentType - The MIME type of the file
 * @returns Object with key and url
 */
export async function storagePut(
  key: string,
  data: Buffer | Uint8Array | string,
  contentType: string = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: data,
      ContentType: contentType,
    });

    await s3Client.send(command);

    // Generate public URL (assuming bucket is public)
    const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;

    return { key, url };
  } catch (error) {
    console.error("[Storage] Upload failed:", error);
    throw new Error(`Failed to upload file: ${error}`);
  }
}

/**
 * Get a signed URL for downloading a file from S3
 * @param key - The S3 object key
 * @param expiresIn - Expiration time in seconds (default: 3600)
 * @returns Object with key and url
 */
export async function storageGet(
  key: string,
  expiresIn: number = 3600
): Promise<{ key: string; url: string }> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });

    return { key, url };
  } catch (error) {
    console.error("[Storage] Get signed URL failed:", error);
    throw new Error(`Failed to get signed URL: ${error}`);
  }
}

/**
 * Delete a file from S3 storage
 * @param key - The S3 object key
 */
export async function storageDelete(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("[Storage] Delete failed:", error);
    throw new Error(`Failed to delete file: ${error}`);
  }
}

/**
 * Generate a unique file key with random suffix to prevent enumeration
 * @param fileName - The original file name
 * @param userId - Optional user ID for organizing files
 * @returns A unique file key
 */
export function generateFileKey(fileName: string, userId?: string): string {
  const ext = fileName.split(".").pop() || "";
  const baseName = fileName.replace(`.${ext}`, "");
  const randomSuffix = nanoid(8);
  
  if (userId) {
    return `${userId}/documents/${baseName}-${randomSuffix}.${ext}`;
  }
  
  return `documents/${baseName}-${randomSuffix}.${ext}`;
}
