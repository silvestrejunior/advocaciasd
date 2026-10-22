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
  beneficio:
    "Olá, vim pelo site e preciso de ajuda com um benefício do INSS.",
  negado:
    "Olá, vim pelo site e meu benefício foi negado. Gostaria de orientação.",
  revisao:
    "Olá, vim pelo site e gostaria de avaliar uma revisão do meu benefício.",
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
  {
    label: "Aposentadorias",
    href: "/aposentadoria-inss",
    filhos: [
      {
        label: "Aposentadoria no INSS",
        href: "/aposentadoria-inss",
        descricao: "Regras do regime geral para trabalhadores e autônomos",
      },
      {
        label: "Servidores públicos",
        href: "/aposentadoria-servidor-publico",
        descricao: "Regimes próprios, regra permanente e transições",
      },
    ],
  },
  {
    label: "Benefícios",
    href: "/beneficios",
    filhos: [
      { label: "Todos os benefícios", href: "/beneficios" },
      {
        label: "Auxílio por incapacidade temporária",
        href: "/beneficios#incapacidade-temporaria",
      },
      { label: "Aposentadoria por incapacidade permanente", href: "/beneficios#incapacidade-permanente" },
      { label: "Pensão por morte", href: "/beneficios#pensao-por-morte" },
      { label: "BPC/LOAS", href: "/beneficios#bpc-loas" },
    ],
  },
  { label: "CTC e averbação", href: "/ctc" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

/** Links do rodapé. */
export const RODAPE = {
  aposentadorias: [
    { label: "Aposentadoria no INSS", href: "/aposentadoria-inss" },
    { label: "Servidores públicos", href: "/aposentadoria-servidor-publico" },
    { label: "Regras de transição", href: "/aposentadoria-inss#regras" },
    { label: "Aposentadoria especial", href: "/aposentadoria-inss#especial" },
    { label: "CTC e averbação de tempo", href: "/ctc" },
  ],
  beneficios: [
    { label: "Todos os benefícios", href: "/beneficios" },
    { label: "Incapacidade temporária", href: "/beneficios#incapacidade-temporaria" },
    { label: "Pensão por morte", href: "/beneficios#pensao-por-morte" },
    { label: "BPC/LOAS", href: "/beneficios#bpc-loas" },
  ],
  escritorio: [
    { label: "Sobre o escritório", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "ISS em obras de saneamento", href: "/iss" },
  ],
} as const;