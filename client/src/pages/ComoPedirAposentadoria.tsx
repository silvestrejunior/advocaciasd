import { useEffect, useRef, useState } from "react";
import { Seo } from "@/components/site/Seo";
import SelecaoAposentadoria from "@/components/site/SelecaoAposentadoria";
import {
  VideoAssessoria,
  type VideoAssessoriaHandle,
} from "@/components/site/VideoAssessoria";
import { SITE, whatsapp } from "@/config/site";
import { PEDIDO_APOSENTADORIA as PAGINA } from "@/config/comoPedirAposentadoria";
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
];
const GEO = { regiao: "BR-PR", cidade: "Maringá" };
const AREA = [
  { tipo: "City" as const, nome: "Maringá" },
  { tipo: "State" as const, nome: "Paraná" },
];

function SimboloWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.297.297-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
      className="cp-whatsapp-fixo"
      aria-label="Falar no WhatsApp"
      style={
        deslocamento
          ? {
              bottom: `calc(${deslocamento}px + env(safe-area-inset-bottom, 0px))`,
            }
          : undefined
      }
    >
      <SimboloWhatsApp />
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
      <footer className="cp-rodape">
        <div className="cp-content cp-rodape-inner">
          <div className="cp-rodape-marca">{PAGINA.nomeEscritorio}</div>
          <p>
            Responsável técnico: {SITE.responsavel} · {SITE.oab}
          </p>
          <p>
            {SITE.endereco.linha1}, sala 708, torre 2 · Maringá/PR · CEP
            87020-015
          </p>
          <div className="cp-rodape-links">
            <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer">
              WhatsApp {SITE.whatsappExibicao}
            </a>
            <a className="cp-rodape-email" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>
          <nav className="cp-rodape-links" aria-label="Links do rodapé">
            <a href="/">Página inicial</a>
            <a href="/privacidade">Política de Privacidade</a>
          </nav>
          <p className="cp-aviso-legal">
            Conteúdo informativo, de acordo com o Provimento nº 205/2021 do
            Conselho Federal da OAB. As informações desta página não substituem
            a análise individual do caso. Dados pessoais enviados pelo WhatsApp
            são usados apenas para o atendimento, nos termos da LGPD.
          </p>
        </div>
      </footer>
      <WhatsAppFlutuantePedido />
    </div>
  );
}
