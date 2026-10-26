import { Youtube, ArrowUpRight } from "lucide-react";
import { SITE } from "@/config/site";

/** O proprietário atualiza SITE.youtubeVideoDestaque; o formato segue o link. */
export function videoYoutube(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (!["youtube.com", "m.youtube.com", "youtu.be"].includes(host))
      return null;
    const segmentos = parsed.pathname.split("/").filter(Boolean);
    const vertical = segmentos[0] === "shorts";
    const id =
      host === "youtu.be"
        ? segmentos[0]
        : (parsed.searchParams.get("v") ??
          (vertical || segmentos[0] === "embed" ? segmentos[1] : ""));
    if (!id || !/^[\w-]{11}$/.test(id)) return null;
    return { id, vertical };
  } catch {
    return null;
  }
}

export function YoutubeDestaque() {
  const video = videoYoutube(SITE.youtubeVideoDestaque);

  return (
    <section
      id="youtube"
      aria-labelledby="youtube-titulo"
      className="overflow-hidden bg-slate-50 py-14 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
              <Youtube size={18} aria-hidden="true" />
              Conheça o nosso canal
            </p>
            <h2
              id="youtube-titulo"
              className="mt-4 max-w-xl font-['Playfair_Display'] text-3xl font-bold leading-tight text-brand-800 md:text-4xl"
            >
              Seu direito merece uma conversa clara.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
              No YouTube, falamos sobre aposentadorias, benefícios do INSS e os
              cuidados que fazem diferença antes de um pedido. Uma forma de
              conhecer nosso trabalho e entender melhor as dúvidas do seu dia a
              dia.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-brand-700">
              Assista ao vídeo em destaque e acompanhe os próximos conteúdos no
              canal.
            </p>
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-brand-800 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600"
            >
              <Youtube size={18} aria-hidden="true" />
              Acompanhar o canal
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <p className="mt-3 break-words text-[12px] text-slate-500">
              {SITE.youtubeNome}
            </p>
          </div>
          <div className="min-w-0">
            {video ? (
              <div
                className={video.vertical ? "mx-auto max-w-[290px]" : "w-full"}
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-brand-800/10 bg-brand-950 shadow-xl"
                  style={{ aspectRatio: video.vertical ? "9 / 16" : "16 / 9" }}
                >
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                    title="Vídeo em destaque — Santana Daufenbach Advocacia"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <a
                  href={SITE.youtubeVideoDestaque}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 py-1.5 text-[12px] font-semibold text-brand-700 underline underline-offset-4 hover:text-cyan-700"
                >
                  Assistir diretamente no YouTube
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            ) : (
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex aspect-video items-center justify-center rounded-2xl bg-brand-800 p-5 text-center font-semibold text-white"
              >
                Conhecer o canal no YouTube →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
