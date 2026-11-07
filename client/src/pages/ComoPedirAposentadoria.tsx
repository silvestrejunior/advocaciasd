import { useEffect, useRef, useState } from "react";
import { Seo } from "@/components/site/Seo";
import SelecaoAposentadoria from "@/components/site/SelecaoAposentadoria";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  VideoAssessoria,
  type VideoAssessoriaHandle,
} from "@/components/site/VideoAssessoria";
import { SITE, whatsapp } from "@/config/site";
import { PEDIDO_APOSENTADORIA as PAGINA } from "@/config/comoPedirAposentadoria";
import { Phone } from "lucide-react";
import "@/styles/como-pedir-aposentadoria.css";

/**
 * Campanha mobile-first de assessoria antes do pedido. Copy e cores do cliente;
 * marca original, sem fotografias decorativas e sem coleta de respostas.
 * Esta página deve permanecer em prévia até aprovação explícita de publicação.
 */
const URL_PAGINA = `${PAGINA.origemCanonica}${PAGINA.caminho}`;
const LINK_WHATSAPP = whatsapp(PAGINA.mensagemPadrao);
const PONTOS = [
  {
    titulo: "Consciência do direito",
    texto:
      "você entende quais regras valem para o seu caso e o que cada uma exige.",
  },
  {
    titulo: "Escolha com segurança",
    texto:
      "comparamos as regras e o melhor momento do pedido antes do protocolo.",
  },
  {
    titulo: "Documentos em ordem",
    texto:
      "CNIS, carteira de trabalho, PPP e tempo rural conferidos antes de pedir.",
  },
];

const DADOS_ESTRUTURADOS: Record<string, unknown>[] = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${URL_PAGINA}#pagina`,
    url: URL_PAGINA,
    name: PAGINA.titulo,
    description: PAGINA.descricao,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE.dominio}/#site` },
    about: { "@id": `${SITE.dominio}/#escritorio` },
    ...(PAGINA.video.dataPublicacao
      ? { video: { "@id": `${URL_PAGINA}#video` } }
      : {}),
  },
  ...(PAGINA.video.dataPublicacao
    ? [
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "@id": `${URL_PAGINA}#video`,
          name: PAGINA.video.titulo,
          description: PAGINA.video.descricao,
          thumbnailUrl: `${SITE.dominio}${PAGINA.video.capa}`,
          uploadDate: PAGINA.video.dataPublicacao,
          ...(PAGINA.video.duracao ? { duration: PAGINA.video.duracao } : {}),
          embedUrl: `https://www.youtube-nocookie.com/embed/${PAGINA.video.id}`,
          publisher: { "@id": `${SITE.dominio}/#escritorio` },
          inLanguage: "pt-BR",
        },
      ]
    : []),
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${URL_PAGINA}#trilha`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: `${SITE.dominio}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Como pedir aposentadoria",
        item: URL_PAGINA,
      },
    ],
  },
];
const GEO = { regiao: "BR-PR", cidade: "Maringá" };
const AREA = [
  { tipo: "City" as const, nome: "Maringá" },
  { tipo: "State" as const, nome: "Paraná" },
];

/** Ligações internas que reforçam o tema da página para leitores e buscadores. */
const LEIA_TAMBEM = [
  {
    href: "/aposentadoria-especial",
    texto: "Aposentadoria especial: o que analisar antes de pedir",
  },
  {
    href: "/tempo-rural",
    texto: "Tempo rural: como organizar as provas",
  },
  {
    href: "/pericia-negada",
    texto: "Perícia negada: o que fazer primeiro",
  },
  {
    href: "/servicos",
    texto: "Todos os serviços previdenciários do escritório",
  },
];

/** Mantém o envio visível quando ele cruza a zona do flutuante, sem escondê-lo. */
function WhatsAppFlutuantePedido() {
  const [deslocamento, setDeslocamento] = useState(0);
  useEffect(() => {
    let quadro = 0;
    const ajustar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const viewport = window.innerHeight;
        const margem = window.matchMedia("(min-width: 1024px)").matches
          ? 24
          : 20;
        const direita = window.innerWidth - (margem === 24 ? 24 : 14);
        const alvos = [
          ...document.querySelectorAll<HTMLElement>(
            ".cp-hero-acoes > *, #comece button, #comece select, [aria-label='Preferências de cookies'] > div"
          ),
        ].map(elemento => elemento.getBoundingClientRect());
        let inferior = margem;
        // Reposiciona sem animação de posição. Se subir acima de um controle
        // alcançar outro, continua até haver uma área livre para o círculo.
        for (let tentativa = 0; tentativa < alvos.length + 1; tentativa++) {
          const topo = viewport - inferior - 56;
          const base = viewport - inferior;
          const conflitos = alvos.filter(
            alvo =>
              alvo.left < direita &&
              alvo.right > direita - 56 &&
              alvo.top < base &&
              alvo.bottom > topo
          );
          if (conflitos.length === 0) break;
          inferior = Math.max(
            inferior,
            viewport - Math.min(...conflitos.map(alvo => alvo.top)) + 8
          );
        }
        setDeslocamento(inferior === margem ? 0 : inferior);
      });
    };
    window.addEventListener("scroll", ajustar, { passive: true });
    window.addEventListener("resize", ajustar);
    const mutacoes = new MutationObserver(ajustar);
    mutacoes.observe(document.body, { childList: true, subtree: true });
    ajustar();
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", ajustar);
      window.removeEventListener("resize", ajustar);
      mutacoes.disconnect();
    };
  }, []);
  return (
    <a
      href={LINK_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="cp-whatsapp-fixo pulsar-whatsapp flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] py-2 pl-2.5 pr-3.5 text-brand-950 shadow-2xl shadow-green-900/30 transition-transform hover:scale-105"
      aria-label="Fale no WhatsApp"
      style={
        deslocamento
          ? {
              bottom: `calc(${deslocamento}px + env(safe-area-inset-bottom, 0px))`,
            }
          : undefined
      }
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
        <Phone size={24} />
      </span>
      <span className="hidden text-[14px] font-bold leading-tight md:block">
        Fale no WhatsApp
      </span>
    </a>
  );
}

export default function ComoPedirAposentadoria() {
  const video = useRef<VideoAssessoriaHandle>(null);
  const assistir = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      video.current?.abrir();
    } else {
      document.getElementById("video-assessoria")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="cp-pagina">
      <Seo
        titulo={PAGINA.titulo}
        descricao={PAGINA.descricao}
        caminho={PAGINA.caminho}
        origemCanonica={PAGINA.origemCanonica}
        palavrasChave="como pedir aposentadoria, como dar entrada na aposentadoria, documentos para aposentadoria, assessoria para aposentadoria, advogado previdenciário Maringá, aposentadoria rural, aposentadoria especial, insalubridade"
        geo={GEO}
        areaAtendimento={AREA}
        jsonLd={DADOS_ESTRUTURADOS}
      />
      <header className="cp-navbar">
        <nav
          className="cp-content cp-navbar-inner"
          aria-label="Navegação da página"
        >
          <a
            href="/"
            className="cp-marca"
            aria-label="Santana Daufenbach Advocacia, página inicial"
          >
            <img
              src={SITE.logoInterface}
              width={128}
              height={128}
              alt="Santana Daufenbach Advocacia, logo oficial"
            />
            <span className="cp-marca-escrita" aria-hidden="true">
              Santana Daufenbach<small>ADVOCACIA</small>
            </span>
          </a>
          <a href="https://advocaciasd.com.br/" className="cp-escritorio">
            Conheça o escritório
          </a>
        </nav>
      </header>
      <main>
        <section className="cp-hero" aria-labelledby="cp-titulo">
          <div className="cp-content cp-hero-grid">
            <div>
              <p className="cp-kicker">APOSENTADORIA COM ASSESSORIA</p>
              <h1 id="cp-titulo">
                Antes de pedir sua aposentadoria, conheça o seu direito
              </h1>
              <p className="cp-hero-texto">
                A regra escolhida, a data do pedido e os períodos reconhecidos
                pelo INSS influenciam o valor do seu benefício. Com assessoria,
                seu histórico e seus documentos são analisados antes de dar
                entrada, para você decidir com mais segurança.
              </p>
              <ul className="cp-pontos">
                {PONTOS.map(ponto => (
                  <li key={ponto.titulo}>
                    <strong>{ponto.titulo}:</strong> {ponto.texto}
                  </li>
                ))}
              </ul>
              <div className="cp-hero-acoes">
                <button
                  type="button"
                  className="cp-botao cp-botao-video"
                  onClick={assistir}
                >
                  Assistir ao vídeo
                </button>
                <a
                  href={LINK_WHATSAPP}
                  className="cp-botao cp-botao-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </div>
              <p className="cp-assinatura">
                Dr. {SITE.responsavel} · {SITE.oab} · Atendimento em Maringá e
                online
              </p>
            </div>
            <VideoAssessoria ref={video} />
          </div>
        </section>
        <SelecaoAposentadoria />
        <section className="cp-links" aria-labelledby="cp-links-titulo">
          <div className="cp-content">
            <h2 id="cp-links-titulo" className="cp-links-titulo">
              Veja também
            </h2>
            <ul className="cp-links-lista">
              {LEIA_TAMBEM.map(item => (
                <li key={item.href}>
                  <a href={item.href}>{item.texto}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="cp-frase" aria-labelledby="cp-frase-titulo">
          <div className="cp-content">
            <div className="cp-filete" aria-hidden="true" />
            <h2 id="cp-frase-titulo">
              Você não trabalhou a vida inteira pra aposentar de qualquer jeito.
            </h2>
            <p>{PAGINA.nomeEscritorio}</p>
          </div>
        </section>
      </main>
      <SiteFooter mensagem={PAGINA.mensagemPadrao} />
      <WhatsAppFlutuantePedido />
    </div>
  );
}
