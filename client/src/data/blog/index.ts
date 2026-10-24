/**
 * Registro do conteúdo do blog.
 *
 * Os artigos ficam em arquivos JSON individuais nesta pasta (um por assunto) e
 * são agrupados em `artigos.json` pelo script `scripts/gerar-conteudo.mjs`,
 * que também gera o manifesto de rotas e o sitemap. Para publicar um artigo
 * novo: crie o JSON, rode o script e faça o build.
 */

import artigos from "./artigos.json";

export type SecaoArtigo = {
  titulo: string;
  paragrafos?: string[];
  lista?: string[];
};

export type PerguntaArtigo = {
  pergunta: string;
  resposta: string;
};

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  /** Imagem do cartão, em /images/blog/. Opcional. */
  imagem?: string;
  publicado: string;
  /** Identificador do tema, igual ao de TEMAS. */
  tema: string;
  /** Página de serviço correspondente ao tema. */
  servico: string;
  palavrasChave: string[];
  secoes: SecaoArtigo[];
  perguntas: PerguntaArtigo[];
  palavras: number;
};

export type Tema = {
  id: string;
  nome: string;
  descricao: string;
  servico: string;
};

/**
 * Temas do conteúdo, na ordem em que aparecem na página /blog. Cada tema é
 * também um serviço do escritório: o artigo aprofunda o cuidado e a página de
 * serviço explica o atendimento.
 */
export const TEMAS: Tema[] = [
  {
    id: "aposentadoria-especial",
    nome: "Aposentadoria especial",
    descricao:
      "Exposição a agentes nocivos, PPP, LTCAT e o que costuma decidir o reconhecimento do tempo especial.",
    servico: "/aposentadoria-especial",
  },
  {
    id: "beneficios-por-incapacidade",
    nome: "Benefícios por incapacidade",
    descricao:
      "Afastamento, incapacidade para o trabalho e o que a perícia procura no seu caso.",
    servico: "/beneficios-por-incapacidade",
  },
  {
    id: "pericia-negada",
    nome: "Perícia negada",
    descricao:
      "O que fazer quando a perícia nega ou cessa o benefício, e o que muda entre recurso e novo pedido.",
    servico: "/pericia-negada",
  },
  {
    id: "tempo-rural",
    nome: "Tempo rural",
    descricao:
      "Como organizar as provas da época do trabalho no campo e o que enfraquece o pedido.",
    servico: "/tempo-rural",
  },
  {
    id: "servidores-publicos",
    nome: "Servidores públicos",
    descricao:
      "Averbação de tempo, contagem de tempo e cuidados antes de protocolar o pedido no órgão.",
    servico: "/servidores-publicos",
  },
  {
    id: "ctc",
    nome: "Certidão de tempo de contribuição",
    descricao:
      "Destino do tempo entre regimes: uma decisão que costuma não ter volta.",
    servico: "/ctc",
  },
  {
    id: "aposentadoria-negada",
    nome: "Aposentadoria negada",
    descricao:
      "Como ler o motivo da negativa e escolher entre recorrer, refazer o pedido ou complementar provas.",
    servico: "/aposentadoria-negada",
  },
  {
    id: "revisao-de-aposentadoria",
    nome: "Revisão de aposentadoria",
    descricao:
      "Quando vale a pena conferir o cálculo do benefício que já está sendo pago.",
    servico: "/revisao-de-aposentadoria",
  },
  {
    id: "planejamento-de-aposentadoria",
    nome: "Planejamento de aposentadoria",
    descricao:
      "O que comparar antes de dar entrada, e o custo de pedir sem conferir o histórico.",
    servico: "/planejamento-de-aposentadoria",
  },
];

export const ARTIGOS = artigos as Artigo[];

export const artigoPorSlug = (slug: string) =>
  ARTIGOS.find(artigo => artigo.slug === slug);

export const artigosDoTema = (tema: string) =>
  ARTIGOS.filter(artigo => artigo.tema === tema);

export const temaPorId = (id: string) => TEMAS.find(tema => tema.id === id);
