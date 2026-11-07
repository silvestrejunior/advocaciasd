import type { ComponentType } from "react";

/**
 * Carregamento das páginas por rota.
 *
 * O HTML pré-renderizado é a primeira pintura da página. Para que a montagem do
 * React não apague esse conteúdo antes de ter o que mostrar, cada página é
 * baixada antes da montagem (`precarregarRota`) e renderiza de forma síncrona
 * quando já está em memória. O Suspense só entra em ação se o módulo ainda não
 * tiver chegado — por exemplo, numa navegação interna sem pré-busca.
 */
// As páginas recebem do roteador props cujo tipo varia por rota (params,
// location, navigate); o carregador apenas repassa o que receber.
/* eslint-disable @typescript-eslint/no-explicit-any */
type Pagina = ComponentType<any>;
type Modulo = { default: Pagina };
type Carregador = () => Promise<Modulo>;

export const ROTAS: { caminho: string; carregar: Carregador }[] = [
  { caminho: "/", carregar: () => import("@/pages/Home") },
  { caminho: "/seu-caso", carregar: () => import("@/pages/SeuCaso") },
  { caminho: "/servicos", carregar: () => import("@/pages/Servicos") },
  { caminho: "/cuidados", carregar: () => import("@/pages/Cuidados") },
  {
    caminho: "/aposentadoria-especial",
    carregar: () => import("@/pages/AposentadoriaEspecial"),
  },
  {
    caminho: "/aposentadoria-especial-saude",
    carregar: () => import("@/pages/AposentadoriaEspecialSaude"),
  },
  {
    caminho: "/aposentadoria-saude",
    carregar: () => import("@/pages/AposentadoriaEspecialSaude"),
  },
  {
    caminho: "/aposentadoria-acs-ace",
    carregar: () => import("@/pages/AposentadoriaAcsAce"),
  },
  {
    caminho: "/como-pedir-aposentadoria",
    carregar: () => import("@/pages/ComoPedirAposentadoria"),
  },
  {
    caminho: "/aposentadoria-negada",
    carregar: () => import("@/pages/AposentadoriaNegada"),
  },
  {
    caminho: "/pericia-negada",
    carregar: () => import("@/pages/PericiaNegada"),
  },
  { caminho: "/tempo-rural", carregar: () => import("@/pages/TempoRural") },
  {
    caminho: "/beneficios-por-incapacidade",
    carregar: () => import("@/pages/BeneficiosPorIncapacidade"),
  },
  {
    caminho: "/auxilio-acidente",
    carregar: () => import("@/pages/AuxilioAcidente"),
  },
  {
    caminho: "/servidores-publicos",
    carregar: () => import("@/pages/ServidoresPublicos"),
  },
  {
    caminho: "/planejamento-de-aposentadoria",
    carregar: () => import("@/pages/PlanejamentoDeAposentadoria"),
  },
  {
    caminho: "/perdeu-o-beneficio",
    carregar: () => import("@/pages/PerdeuOBeneficio"),
  },
  {
    caminho: "/revisao-de-aposentadoria",
    carregar: () => import("@/pages/RevisaoDeAposentadoria"),
  },
  { caminho: "/como-funciona", carregar: () => import("@/pages/ComoFunciona") },
  { caminho: "/sobre", carregar: () => import("@/pages/Sobre") },
  { caminho: "/contato", carregar: () => import("@/pages/Contato") },
  { caminho: "/ctc", carregar: () => import("@/pages/CTC") },
  { caminho: "/privacidade", carregar: () => import("@/pages/Privacidade") },
  { caminho: "/blog", carregar: () => import("@/pages/Blog") },
  { caminho: "/blog/:slug", carregar: () => import("@/pages/Artigo") },
];

const NOT_FOUND: Carregador = () => import("@/pages/NotFound");

/** Caminho da URL (sem barra final) correspondente ao padrão da rota. */
function corresponde(padrao: string, caminho: string) {
  const normalizado = caminho.replace(/\/+$/, "") || "/";
  if (padrao === "/") return normalizado === "/";
  const partesPadrao = padrao.split("/").filter(Boolean);
  const partesCaminho = normalizado.split("/").filter(Boolean);
  if (partesPadrao.length !== partesCaminho.length) return false;
  return partesPadrao.every(
    (parte, indice) => parte.startsWith(":") || parte === partesCaminho[indice]
  );
}

/**
 * Cria o componente da página. Renderiza direto quando o módulo já está em
 * memória; se ainda não estiver, suspende uma única vez até o carregamento.
 */
export function criarPagina(carregar: Carregador) {
  let carregado: Pagina | null = null;
  let emAndamento: Promise<unknown> | null = null;

  const iniciar = () => {
    if (!emAndamento) {
      emAndamento = carregar().then(modulo => {
        carregado = modulo.default;
        return modulo;
      });
    }
    return emAndamento;
  };

  const Pagina = (props: any) => {
    if (carregado) {
      const Conteudo = carregado;
      return <Conteudo {...props} />;
    }
    throw iniciar();
  };

  return { Pagina, iniciar };
}

export const PAGINA_NAO_ENCONTRADA = criarPagina(NOT_FOUND);

/**
 * Baixa o módulo da rota antes da montagem. Em caso de falha, a montagem
 * continua: o Suspense assume o carregamento.
 */
export async function precarregarRota(caminho: string) {
  const alvo = ROTAS.find(rota => corresponde(rota.caminho, caminho)) ?? null;
  const carregar = alvo ? alvo.carregar : NOT_FOUND;
  try {
    await carregar();
  } catch {
    /* A montagem segue e o Suspense tenta novamente. */
  }
}

/** Pré-busca discreta ao passar o mouse ou tocar num link interno. */
export function ativarPreBusca() {
  const disparar = (evento: Event) => {
    const alvo = evento.target as Element | null;
    const link = alvo?.closest?.('a[href^="/"]') as HTMLAnchorElement | null;
    if (!link || link.target === "_blank") return;
    const href = link.getAttribute("href");
    if (!href) return;
    void precarregarRota(href.split(/[?#]/)[0]);
  };
  document.addEventListener("mouseover", disparar, { passive: true });
  document.addEventListener("touchstart", disparar, { passive: true });
  document.addEventListener("focusin", disparar);
}
