/**
 * Catálogo de serviços do escritório.
 *
 * A organização segue o momento do cliente — antes, pedido, negativa, perda do
 * benefício, manutenção — e não a lista de espécies de benefício. Cada serviço
 * tem um rótulo de ação próprio: quando existe página, "Conhecer o serviço";
 * quando o assunto é resolvido pelo contato, "Conversar sobre este assunto".
 */

export type AcaoServico = "servico" | "analise" | "conversa";

export type BlocoServico = "principais" | "pedido" | "outras";

export interface Servico {
  id: string;
  nome: string;
  /** A pergunta que o cliente faz a si mesmo — abre o cartão. */
  pergunta: string;
  /** Uma linha explicando o que o serviço cobre. */
  resumo: string;
  /** Página própria do serviço. Quando ausente, o cartão leva ao contato. */
  href?: string;
  acao: AcaoServico;
  bloco: BlocoServico;
}

export const ROTULO_ACAO: Record<AcaoServico, string> = {
  servico: "Conhecer o serviço",
  analise: "Entender a análise",
  conversa: "Conversar sobre este assunto",
};

export const TITULO_BLOCO: Record<BlocoServico, string> = {
  principais: "Principais serviços",
  pedido: "Já fez um pedido ou recebe um benefício?",
  outras: "Outras formas de atuação",
};

export const SERVICOS: Servico[] = [
  /* ------------------------------------------------ Principais serviços */
  {
    id: "aposentadoria-especial",
    nome: "Aposentadoria especial",
    pergunta: "Trabalhou exposto a barulho intenso, agentes químicos ou biológicos?",
    resumo:
      "Análise do trabalho com exposição, documento por documento, e o que a decisão recente do STF mudou.",
    href: "/aposentadoria-especial",
    acao: "servico",
    bloco: "principais",
  },
  {
    id: "beneficios-por-incapacidade",
    nome: "Benefícios por incapacidade",
    pergunta: "Uma doença ou lesão impede você de trabalhar?",
    resumo:
      "Os benefícios conhecidos como auxílio-doença e aposentadoria por invalidez, e o que a perícia costuma exigir.",
    href: "/beneficios-por-incapacidade",
    acao: "servico",
    bloco: "principais",
  },
  {
    id: "auxilio-acidente",
    nome: "Auxílio-acidente",
    pergunta: "Voltou ao trabalho, mas ficou com uma sequela de acidente?",
    resumo:
      "O que pode ser analisado quando a lesão deixa uma limitação permanente, mesmo com retorno à atividade.",
    href: "/auxilio-acidente",
    acao: "servico",
    bloco: "principais",
  },
  {
    id: "servidores-publicos",
    nome: "Servidores públicos e RPPS",
    pergunta: "É servidor efetivo e quer entender o seu regime de previdência?",
    resumo:
      "Aposentadoria no regime próprio, tempo de serviço público, abono de permanência e averbação de tempo.",
    href: "/servidores-publicos",
    acao: "servico",
    bloco: "principais",
  },
  {
    id: "aposentadoria-pcd",
    nome: "Aposentadoria da pessoa com deficiência",
    pergunta: "Trabalhou com uma deficiência?",
    resumo:
      "Análise do grau e do tempo de contribuição na condição de pessoa com deficiência.",
    acao: "conversa",
    bloco: "principais",
  },
  {
    id: "planejamento",
    nome: "Planejamento de aposentadoria",
    pergunta: "Quer entender quando pode se aposentar e como organizar as contribuições?",
    resumo:
      "Comparação das regras aplicáveis ao seu histórico, com as datas em que cada uma se torna possível.",
    href: "/planejamento-de-aposentadoria",
    acao: "servico",
    bloco: "principais",
  },

  /* ------------------------------------- Já fez um pedido ou recebe */
  {
    id: "aposentadoria-negada",
    nome: "Aposentadoria negada",
    pergunta: "Recebeu uma negativa do INSS e não sabe o que fazer?",
    resumo:
      "Antes de recorrer, é preciso ler o motivo da negativa e verificar o que faltou no pedido.",
    href: "/aposentadoria-negada",
    acao: "analise",
    bloco: "pedido",
  },
  {
    id: "perdeu-o-beneficio",
    nome: "Perdeu o benefício",
    pergunta: "O seu benefício foi cessado ou suspenso?",
    resumo:
      "Análise do motivo da cessação e das medidas possíveis, inclusive o restabelecimento.",
    href: "/perdeu-o-beneficio",
    acao: "analise",
    bloco: "pedido",
  },
  {
    id: "revisao-de-aposentadoria",
    nome: "Revisão de aposentadoria",
    pergunta: "Já recebe a aposentadoria e quer conferir o cálculo?",
    resumo:
      "Verificação de cálculos, documentos e prazos antes de pedir qualquer revisão.",
    href: "/revisao-de-aposentadoria",
    acao: "analise",
    bloco: "pedido",
  },

  /* ------------------------------------ Outras formas de atuação */
  {
    id: "pensao-por-morte",
    nome: "Pensão por morte",
    pergunta: "Perdeu alguém da família e precisa entender a pensão?",
    resumo:
      "Orientação aos dependentes sobre o histórico do segurado, os documentos e o pedido ou a negativa.",
    acao: "conversa",
    bloco: "outras",
  },
  {
    id: "bpc-loas",
    nome: "BPC/LOAS",
    pergunta: "Uma pessoa idosa ou com deficiência na família e a renda é baixa?",
    resumo:
      "Benefício assistencial, que não é aposentadoria: exige análise dos requisitos pessoais, sociais e econômicos.",
    acao: "conversa",
    bloco: "outras",
  },
  {
    id: "aposentadoria-rural",
    nome: "Aposentadoria rural",
    pergunta: "Trabalhou no campo, em regime de economia familiar?",
    resumo:
      "Análise da comprovação da atividade rural e dos períodos que podem ser reconhecidos.",
    acao: "conversa",
    bloco: "outras",
  },
  {
    id: "isencao-imposto-renda",
    nome: "Isenção de imposto de renda",
    pergunta: "Quem já se aposentou pode ter isenção de imposto de renda?",
    resumo:
      "Análise da possibilidade de isenção conforme a condição de saúde e a documentação — o diagnóstico, sozinho, não define o enquadramento.",
    acao: "conversa",
    bloco: "outras",
  },
  {
    id: "pedido-parado",
    nome: "Pedido parado no INSS",
    pergunta: "Fez o pedido e ele não anda?",
    resumo:
      "Exame do histórico e da demora do requerimento para avaliar a medida cabível.",
    acao: "conversa",
    bloco: "outras",
  },
];

/** Serviços de um bloco, na ordem em que aparecem na página. */
export function servicosDoBloco(bloco: BlocoServico): Servico[] {
  return SERVICOS.filter((s) => s.bloco === bloco);
}

export function servicoPorId(id: string): Servico | undefined {
  return SERVICOS.find((s) => s.id === id);
}

/** O aviso que reduz o atrito, repetido em todas as páginas. */
export const AVISO_DOCUMENTOS =
  "Você não precisa enviar documentos neste primeiro contato.";

/** Os três passos do atendimento — texto único para todo o site. */
export const PASSOS_ATENDIMENTO = [
  {
    titulo: "Conte o que aconteceu",
    texto:
      "Explique o que procura, sem precisar enviar documentos neste primeiro contato.",
  },
  {
    titulo: "Conheça o atendimento",
    texto:
      "Apresentamos o serviço indicado para o assunto, o trabalho incluído e as condições de contratação.",
  },
  {
    titulo: "Receba orientação sobre o seu caso",
    texto:
      "Após a contratação, examinamos o seu histórico e os documentos, conforme o serviço combinado.",
  },
];

/**
 * Perguntas sobre o atendimento — e não sobre a lei. São as dúvidas que
 * impedem alguém de mandar a primeira mensagem.
 */
export const FAQ_ATENDIMENTO = [
  {
    pergunta: "Preciso saber qual benefício pedir?",
    resposta:
      "Não. Explique o que aconteceu e o que você procura. Essa informação é o que permite indicar o atendimento correto para o seu caso.",
  },
  {
    pergunta: "O primeiro contato já é uma consulta jurídica?",
    resposta:
      "Não. O primeiro contato serve para entender a sua situação e explicar o atendimento. Consulta, planejamento e acompanhamento de pedido ou processo são serviços diferentes, e a proposta explica o trabalho e as condições antes da contratação.",
  },
  {
    pergunta: "Como funcionam os honorários?",
    resposta:
      "Os honorários, ou seja, o valor do serviço jurídico, dependem do trabalho e do caso. Antes da contratação, a proposta apresenta o que está incluído, os valores e as condições de pagamento.",
  },
  {
    pergunta: "Posso falar com o escritório de outra cidade?",
    resposta:
      "Sim. O escritório está em Maringá, no Paraná, e atende a distância. No primeiro contato, informe a sua cidade e se precisa de ajuda para usar os canais digitais.",
  },
  {
    pergunta: "Estou ajudando um familiar. Posso fazer o primeiro contato?",
    resposta:
      "Sim. Explique que está buscando informações para outra pessoa. Orientamos quais dados e autorizações são necessários para prosseguir.",
  },
  {
    pergunta: "Como confirmar que estou falando com o escritório?",
    resposta:
      "Confira o endereço do site, os canais indicados nas páginas de contato e o registro do advogado responsável na OAB/PR. Em caso de dúvida sobre uma mensagem, ligue antes de enviar documentos ou efetuar um pagamento.",
  },
];
