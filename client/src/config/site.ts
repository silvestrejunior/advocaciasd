/**
 * Configuração central do site.
 *
 * Tudo que é dado do escritório (contato, endereço, OAB, navegação) fica aqui.
 * Nenhuma página deve escrever telefone, endereço ou número de OAB diretamente:
 * assim, uma mudança de número ou de endereço é feita em um único lugar.
 */

export const SITE = {
  nome: "Santana Daufenbach",
  nomeCompleto: "Santana Daufenbach Advocacia",
  /**
   * Origem pública real do site: usada na canônica, no og:url e no sitemap.
   * Quando o site passar para o domínio definitivo, trocar por
   * "https://www.advocaciasd.com.br" — é o único lugar a alterar.
   */
  dominio: "https://www.advocaciasd.com.br",

  // Responsável técnico pelo escritório
  responsavel: "João Luiz Santana Daufenbach",
  oab: "OAB/PR 66.208",

  // Experiência — usada no banner e nas provas de credibilidade
  experiencia: "quase 15 anos",
  experienciaCurta: "Quase 15 anos",

  // Contato
  whatsapp: "5544998563465",
  whatsappExibicao: "(44) 99856-3465",
  email: "joao@advocaciasd.com.br",

  endereco: {
    linha1: "Av. João Paulino Vieira Filho, 625",
    linha2: "Sala 708 - Torre 2, Novo Centro",
    linha3: "Maringá/PR",
    completo:
      "Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2, Novo Centro, Maringá/PR",
  },

  horario: "Segunda a Sexta: 9h às 17h",

  // Canais do escritório
  youtube: "https://www.youtube.com/@sdadvocaciaprevidenciaria",
  youtubeNome: "@sdadvocaciaprevidenciaria",
  // Troque apenas este link para atualizar manualmente o vídeo da home.
  // Aceita links de Shorts (player vertical), watch e youtu.be (horizontal).
  youtubeVideoDestaque: "https://www.youtube.com/shorts/8tRtrJsjv_Q",

  // Imagens
  logo: "/images/logo-sd.png",
  logoClaro: "/images/logo-sd-branco.png",
} as const;

/** Mensagens padrão do WhatsApp, separadas por intenção de quem chega. */
export const WHATSAPP_MENSAGENS = {
  geral:
    "Olá, vim pelo site e gostaria de falar sobre uma questão previdenciária.",
  inss: "Olá, vim pelo site e gostaria de orientação sobre aposentadoria pelo INSS.",
  servidor:
    "Olá, vim pelo site e gostaria de orientação sobre aposentadoria de servidor público.",
  beneficio: "Olá, vim pelo site e preciso de ajuda com um benefício do INSS.",
  negado:
    "Olá, vim pelo site e meu benefício foi negado. Gostaria de orientação.",
  revisao:
    "Olá, vim pelo site e gostaria de avaliar uma revisão do meu benefício.",
  periciaNegada:
    "Olá, vim pelo site e minha perícia foi negada. Gostaria de orientação.",
  tempoRural:
    "Olá, vim pelo site e preciso de ajuda para comprovar o meu tempo rural.",
  tempoEspecial:
    "Olá, vim pelo site e estou com dificuldades no meu tempo especial.",
} as const;

/** Monta o link do WhatsApp com mensagem inicial. */
export function whatsapp(mensagem: string = WHATSAPP_MENSAGENS.geral) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export type ItemMenu = {
  label: string;
  href: string;
  filhos?: { label: string; href: string; descricao?: string }[];
};

/**
 * Navegação principal do site.
 *
 * O ISS/Saneamento saiu do menu: é outra linha de atuação e vai para site
 * próprio. Permanece apenas um link discreto no rodapé, em "Outras áreas".
 */
export const MENU: ItemMenu[] = [
  { label: "Início", href: "/" },
  { label: "Descubra o seu caso", href: "/seu-caso" },
  { label: "Conteúdo", href: "/blog" },
  {
    label: "Serviços",
    href: "/servicos",
    filhos: [
      {
        label: "Cuidados antes de pedir",
        href: "/cuidados",
        descricao: "O que observar em cada benefício antes de dar entrada",
      },
      {
        label: "Aposentadoria especial",
        href: "/aposentadoria-especial",
        descricao: "Análise do trabalho com exposição a agentes nocivos",
      },
      {
        label: "Aposentadoria negada",
        href: "/aposentadoria-negada",
        descricao: "O que fazer depois de uma negativa do INSS",
      },
      {
        label: "Benefícios por incapacidade",
        href: "/beneficios-por-incapacidade",
        descricao: "O que a perícia analisa e o que precisa ser comprovado",
      },
      {
        label: "Perícia negada",
        href: "/pericia-negada",
        descricao: "O que fazer quando a perícia nega o benefício",
      },
      {
        label: "Tempo rural",
        href: "/tempo-rural",
        descricao: "Como é comprovado o período de trabalho no campo",
      },
      {
        label: "Servidores públicos",
        href: "/servidores-publicos",
        descricao: "Regime próprio, averbação de tempo e abono",
      },
      {
        label: "Perdeu o benefício",
        href: "/perdeu-o-beneficio",
        descricao: "Cessação, suspensão e restabelecimento",
      },
      {
        label: "Revisão de aposentadoria",
        href: "/revisao-de-aposentadoria",
        descricao: "Conferência de cálculo antes de pedir",
      },
      { label: "Todos os serviços", href: "/servicos" },
    ],
  },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

/** Links do rodapé. */
export const RODAPE = {
  aposentadorias: [
    { label: "Cuidados antes de pedir", href: "/cuidados" },
    { label: "Aposentadoria especial", href: "/aposentadoria-especial" },
    { label: "Tempo rural", href: "/tempo-rural" },
    { label: "Servidores públicos", href: "/servidores-publicos" },
    {
      label: "Planejamento de aposentadoria",
      href: "/planejamento-de-aposentadoria",
    },
    { label: "CTC e averbação de tempo", href: "/ctc" },
    { label: "Todos os serviços", href: "/servicos" },
  ],
  beneficios: [
    { label: "Aposentadoria negada", href: "/aposentadoria-negada" },
    {
      label: "Benefícios por incapacidade",
      href: "/beneficios-por-incapacidade",
    },
    { label: "Perícia negada", href: "/pericia-negada" },
    { label: "Auxílio-acidente", href: "/auxilio-acidente" },
    { label: "Perdeu o benefício", href: "/perdeu-o-beneficio" },
    { label: "Revisão de aposentadoria", href: "/revisao-de-aposentadoria" },
  ],
  conteudo: [
    { label: "Todos os artigos", href: "/blog" },
    { label: "Cuidados antes de pedir", href: "/cuidados" },
    { label: "Canal no YouTube", href: SITE.youtube },
  ],
  escritorio: [
    { label: "Descubra o seu caso", href: "/seu-caso" },
    { label: "Como funciona", href: "/como-funciona" },
    { label: "Sobre o escritório", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
} as const;
