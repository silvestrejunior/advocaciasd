import { Link } from "wouter";
import { ArrowRight, Globe2, MessageCircle } from "lucide-react";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";
import { AVISO_DOCUMENTOS } from "@/data/servicos";

/** Retrato real sobre azul institucional; composição empilhada no celular. */
export function BannerPrincipal() {
  return (
    <section className="home-banner relative overflow-hidden bg-brand-950 pb-12 pt-28 text-white sm:pb-16 lg:pt-32">
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet="/images/hero-fachada-mobile.webp"
        />
        <img
          src="/images/hero-fachada.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/90 to-brand-800/85"
      />
      <div className="relative container mx-auto px-4">
        <div className="grid min-w-0 items-center gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300 sm:text-xs">
              Direito previdenciário há quase 15 anos
            </p>
            <h1 className="home-banner-titulo mt-5 max-w-2xl font-['Playfair_Display'] font-bold">
              Aposentadoria no <span className="text-cyan-300">INSS</span> e
              para <span className="text-cyan-300">Servidores Públicos</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-100/90 sm:text-[17px]">
              Analisamos o seu histórico, identificamos o caminho aplicável ao
              seu caso e conduzimos o pedido com acompanhamento em cada etapa.
            </p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-slate-300 sm:text-sm">
              {AVISO_DOCUMENTOS}
            </p>
            <Link
              href="/seu-caso"
              className="pulsar-cta group mt-7 inline-flex max-w-full items-center justify-center gap-2.5 rounded-xl bg-cyan-400 px-6 py-4 text-[15px] font-bold text-brand-950 ring-2 ring-cyan-200/60 transition-all hover:-translate-y-0.5 hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:px-9"
            >
              Descobrir o meu caso
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-cyan-200/90 sm:text-[13px]">
              Duas perguntas para chegar ao seu caso — leva menos de um minuto e
              não pede documento.
            </p>
          </div>

          <figure className="home-banner-perfil relative mx-auto w-full min-w-0 max-w-[430px] text-center">
            <div className="home-banner-retrato relative mx-auto">
              <img
                src="/images/advogado-banner.webp"
                alt={`${SITE.responsavel}, advogado, em conversa ao microfone`}
                width={900}
                height={1244}
                fetchPriority="high"
                className="home-banner-foto mx-auto block h-full w-full object-contain object-bottom"
              />
            </div>
            <figcaption className="relative mx-auto -mt-2 max-w-[400px] px-1">
              <p className="text-[14px] font-medium leading-relaxed text-slate-100 sm:text-[15px]">
                Advogado Especialista há mais de 10 anos atendendo o cliente
                Previdenciário
              </p>
              <p className="mt-3 text-[15px] font-bold leading-snug text-white sm:text-[16px]">
                {SITE.responsavel}
              </p>
              <p className="mt-1 text-xs tracking-wide text-cyan-200">
                {SITE.oab}
              </p>
              <p className="mt-3 inline-flex items-center justify-center gap-2 text-[12px] text-slate-200 sm:text-[13px]">
                <Globe2 size={15} aria-hidden="true" />
                Atendimento em todo o Brasil
              </p>
            </figcaption>
            <a
              href={whatsapp(WHATSAPP_MENSAGENS.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/50 bg-brand-800/70 px-4 py-3.5 text-[14px] font-bold leading-snug text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 sm:text-[15px]"
            >
              <MessageCircle
                size={18}
                className="shrink-0"
                aria-hidden="true"
              />
              Me conte um pouco do seu caso
            </a>
          </figure>
        </div>
      </div>
    </section>
  );
}
