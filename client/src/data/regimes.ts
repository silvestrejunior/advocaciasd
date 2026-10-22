/**
 * Conteúdo por regime previdenciário.
 *
 * A regra editorial deste arquivo: aqui não se explicam regras de aposentadoria.
 * Cada item diz **que benefício é** e, principalmente, **qual cuidado ou alerta**
 * a pessoa precisa ter na hora de pedir. As regras são conhecimento básico; o
 * que muda a vida de quem procura o escritório é o cuidado prático.
 */

export interface BeneficioRegime {
  id: string;
  titulo: string;
  /** O que é o benefício, em uma linha, sem jargão. */
  oQueE: string;
  /** O cuidado que costuma decidir o resultado. */
  cuidado: string;
  /** Página de serviço, quando existir. */
  href?: string;
}

/* ------------------------------------------------------------------ */
/* Aposentadorias do INSS                                              */
/* ------------------------------------------------------------------ */

export const BENEFICIOS_INSS: BeneficioRegime[] = [
  {
    id: "inss-idade",
    titulo: "Aposentadoria por idade",
    oQueE:
      "O benefício de quem já alcançou a idade exigida e o tempo mínimo de contribuição.",
    cuidado:
      "O mês de entrada muda o cálculo: dar entrada antes ou depois de uma data pode valer meses de diferença no valor.",
  },
  {
    id: "inss-tempo",
    titulo: "Aposentadoria por tempo de contribuição",
    oQueE:
      "O caminho de quem contribuiu por muitos anos e escolhe entre as regras de transição.",
    cuidado:
      "Existe mais de um caminho possível para o mesmo histórico, e a escolha entre eles define a data e o valor — comparar antes de pedir evita perder dinheiro.",
  },
  {
    id: "inss-especial",
    titulo: "Aposentadoria especial",
    oQueE:
      "O benefício de quem trabalhou exposto a ruído, agentes químicos ou biológicos.",
    cuidado:
      "PPP e LTCAT precisam descrever a exposição real do seu posto de trabalho. Documento genérico, igual para todos os empregados, costuma ser recusado.",
    href: "/aposentadoria-especial",
  },
  {
    id: "inss-pcd",
    titulo: "Aposentadoria da pessoa com deficiência",
    oQueE:
      "A aposentadoria analisada conforme o grau da deficiência e a atividade exercida.",
    cuidado:
      "A avaliação considera grau, tipo e ambiente de trabalho, e não apenas o laudo médico — o mesmo diagnóstico pode ter enquadramentos diferentes.",
  },
  {
    id: "inss-rural",
    titulo: "Aposentadoria rural",
    oQueE:
      "A aposentadoria de quem trabalhou no campo em economia familiar.",
    cuidado:
      "A prova da atividade é construída com documentos da época. Com o tempo, obtê-los fica mais difícil: reunir antes do pedido é o que decide o caso.",
  },
  {
    id: "inss-incapacidade",
    titulo: "Aposentadoria por incapacidade permanente",
    oQueE:
      "O benefício de quem não tem mais condições de trabalhar, na avaliação do INSS.",
    cuidado:
      "A perícia examina a incapacidade para o seu trabalho, e não a doença em si. O laudo precisa tratar da limitação, não só do diagnóstico.",
    href: "/beneficios-por-incapacidade",
  },
];

/* ------------------------------------------------------------------ */
/* Aposentadorias de servidores públicos                               */
/* ------------------------------------------------------------------ */

export const BENEFICIOS_SERVIDOR: BeneficioRegime[] = [
  {
    id: "rpps-voluntaria",
    titulo: "Aposentadoria voluntária no regime próprio",
    oQueE:
      "A aposentadoria do servidor efetivo, analisada pelo regime do ente em que atua.",
    cuidado:
      "Cada ente tem regras próprias. O caminho do servidor municipal não é o do estadual nem o do federal, e a análise precisa começar pelo seu regime.",
    href: "/servidores-publicos",
  },
  {
    id: "rpps-incapacidade",
    titulo: "Aposentadoria por incapacidade do servidor",
    oQueE:
      "O afastamento definitivo por incapacidade no serviço público, com análise própria do cargo.",
    cuidado:
      "Além da perícia médica, o laudo precisa indicar a relação da limitação com as atribuições do cargo — e a forma de ingresso pode mudar o cálculo.",
  },
  {
    id: "rpps-compulsoria",
    titulo: "Aposentadoria compulsória",
    oQueE:
      "A aposentadoria determinada pela idade limite, que independe de pedido.",
    cuidado:
      "A data em que ela é declarada altera o valor e os proventos. Conferir o cálculo antes de concordar, em vez de depois, é o que protege o servidor.",
  },
  {
    id: "rpps-especial",
    titulo: "Aposentadoria especial do servidor",
    oQueE:
      "O benefício de quem exerceu funções com exposição a agentes nocivos no serviço público.",
    cuidado:
      "Depende de previsão no seu ente e de comprovação da exposição no cargo efetivo. Não se transporta automaticamente a análise usada no INSS.",
  },
  {
    id: "rpps-abono",
    titulo: "Abono de permanência",
    oQueE:
      "A devolução da contribuição previdenciária para quem já poderia se aposentar e permanece trabalhando.",
    cuidado:
      "O abono tem requisitos próprios e não é concedido automaticamente. Sem o pedido no momento certo, o valor pode não ser recuperado depois.",
  },
  {
    id: "rpps-averbacao",
    titulo: "Averbação de tempo e CTC",
    oQueE:
      "O reconhecimento, no seu regime, do tempo trabalhado em outro regime ou em outro ente.",
    cuidado:
      "Certidão com divergência de datas ou de vínculos trava o processo no órgão. Conferir a documentação antes de protocolar economiza meses.",
  },
  {
    id: "rpps-compensacao",
    titulo: "Compensação previdenciária",
    oQueE:
      "O acerto financeiro entre os regimes pelo tempo que cada um reconheceu.",
    cuidado:
      "Parte do trâmite é do ente e parte depende do segurado. Sem acompanhamento, a compensação fica pendente sem que o servidor saiba.",
  },
];

/* ------------------------------------------------------------------ */
/* Além da aposentadoria                                               */
/* ------------------------------------------------------------------ */

export const BENEFICIOS_ALEM: BeneficioRegime[] = [
  {
    id: "alem-incapacidade-temporaria",
    titulo: "Auxílio doença",
    oQueE:
      "O benefício de quem precisa se afastar do trabalho por um período — o antigo auxílio-doença.",
    cuidado:
      "O afastamento precisa estar documentado e o pedido feito no tempo certo. Período sem perícia pode reduzir os valores devidos.",
    href: "/beneficios-por-incapacidade",
  },
  {
    id: "alem-auxilio-acidente",
    titulo: "Auxílio-acidente",
    oQueE:
      "O benefício de quem sofreu acidente e ficou com uma sequela que reduz a capacidade de trabalho.",
    cuidado:
      "Ele pode ser devido mesmo depois de voltar ao trabalho, e o laudo precisa tratar da sequela — não apenas da doença.",
    href: "/auxilio-acidente",
  },
  {
    id: "alem-pensao",
    titulo: "Pensão por morte",
    oQueE:
      "O benefício dos dependentes, calculado a partir do histórico de quem faleceu.",
    cuidado:
      "A análise começa pelo histórico de contribuições do segurado. Documentos dos dependentes, por si sós, não sustentam o pedido.",
  },
  {
    id: "alem-bpc",
    titulo: "BPC/LOAS",
    oQueE:
      "O benefício assistencial para idosos e pessoas com deficiência em situação de baixa renda.",
    cuidado:
      "Não é aposentadoria: a análise é da renda, do grupo familiar e do impedimento. O mesmo laudo médico não garante o benefício.",
  },
  {
    id: "alem-revisao",
    titulo: "Revisão de benefício",
    oQueE:
      "A conferência do cálculo e dos períodos que entraram no benefício já concedido.",
    cuidado:
      "Nem toda revisão aumenta o valor, e algumas reduzem. Simular o resultado antes de pedir é o que evita perder o benefício que já existe.",
    href: "/revisao-de-aposentadoria",
  },
  {
    id: "alem-isencao",
    titulo: "Isenção de imposto de renda",
    oQueE:
      "A dispensa do imposto sobre os proventos para quem se enquadra nas hipóteses previstas.",
    cuidado:
      "O diagnóstico, sozinho, não define a isenção: é preciso documentação da condição de saúde e o pedido no órgão ou entidade pagadora.",
  },
  {
    id: "alem-salario-maternidade",
    titulo: "Salário-maternidade",
    oQueE:
      "O benefício do período de afastamento por nascimento, adoção ou guarda.",
    cuidado:
      "Para quem contribui como autônoma ou segurada especial, o pedido pode ter prazo próprio e exigir comprovação de atividade.",
  },
  {
    id: "alem-cessado",
    titulo: "Benefício cessado ou suspenso",
    oQueE:
      "O caso de quem já recebia e teve o pagamento interrompido.",
    cuidado:
      "O motivo escrito da cessação é o primeiro documento a ler. A ausência em uma convocação costuma ser a causa, e o prazo para reagir é curto.",
    href: "/perdeu-o-beneficio",
  },
];

/* ------------------------------------------------------------------ */
/* Alertas — os cuidados que atravessam todos os casos                 */
/* ------------------------------------------------------------------ */

export interface Alerta {
  id: string;
  titulo: string;
  texto: string;
}

export const ALERTAS: Alerta[] = [
  {
    id: "cnis",
    titulo: "O extrato de contribuições, antes de tudo",
    texto:
      "Períodos sem baixa, vínculos com data de saída errada e contribuições que o empregador não recolheu são a causa mais comum de negativa e de valor menor. A conferência vem antes do pedido, não depois.",
  },
  {
    id: "momento",
    titulo: "O momento de dar entrada",
    texto:
      "Adiantar o pedido pode custar valor; esperar demais custa parcelas. Como existe mais de um caminho para o mesmo histórico, comparar antes de pedir é o que evita os dois erros.",
  },
  {
    id: "documentos",
    titulo: "Os documentos do trabalho",
    texto:
      "PPP, laudos e documentos de empresas que fecharam precisam ser buscados enquanto ainda são localizáveis. Depois de anos, a prova da exposição ou do vínculo fica muito mais difícil.",
  },
  {
    id: "contar-nao-e-calcular",
    titulo: "Contar tempo não é calcular benefício",
    texto:
      "Somar mais tempo nem sempre aumenta o valor. Cada escolha — esperar, corrigir um vínculo ou contribuir mais — tem um efeito diferente, e esse efeito pode ser estimado antes de decidir.",
  },
];

/* ------------------------------------------------------------------ */
/* Etapas do atendimento                                              */
/* ------------------------------------------------------------------ */

export const ETAPAS = [
  {
    titulo: "Análise do histórico",
    texto:
      "Lemos o extrato de contribuições, os documentos e o histórico de trabalho, e apontamos cada inconsistência encontrada.",
  },
  {
    titulo: "Comparação dos caminhos",
    texto:
      "Mostramos quais caminhos são possíveis para o seu caso e o efeito de cada um na data e no valor do benefício.",
  },
  {
    titulo: "Organização dos documentos",
    texto:
      "Indicamos o que precisa ser obtido, corrigido ou produzido antes do pedido, e em que ordem fazer isso.",
  },
  {
    titulo: "Pedido e acompanhamento",
    texto:
      "Conduzimos o requerimento administrativo e, quando necessário, a discussão judicial, mantendo você informado em cada etapa.",
  },
];

/* ------------------------------------------------------------------ */
/* Perguntas frequentes da página inicial                              */
/* ------------------------------------------------------------------ */

export const FAQ_HOME = [
  {
    pergunta: "Não sei qual benefício pedir. Isso é um problema?",
    resposta:
      "Não. Explique o que aconteceu e o que você procura. Identificar o benefício e o caminho aplicável ao seu caso faz parte do atendimento — não é algo que você precise saber antes de procurar o escritório.",
  },
  {
    pergunta: "Preciso enviar documentos para ser atendido?",
    resposta:
      "Não. Você não precisa enviar documentos neste primeiro contato. Indicamos o que será necessário quando o serviço for definido e a contratação combinada.",
  },
  {
    pergunta: "Quanto custa o primeiro contato?",
    resposta:
      "O primeiro contato não tem custo e não é uma consulta jurídica. Consulta, planejamento e acompanhamento de pedido ou processo são serviços diferentes, e a proposta apresenta o trabalho incluído, os honorários e as condições antes da contratação.",
  },
  {
    pergunta: "O escritório atende quem mora em outra cidade?",
    resposta:
      "Sim. O escritório está em Maringá, no Paraná, e atende a distância para todo o Brasil. Informe a sua cidade no primeiro contato.",
  },
  {
    pergunta: "Vocês garantem que vou conseguir a aposentadoria?",
    resposta:
      "Não. Nenhum advogado pode garantir resultado. O que fazemos é analisar o histórico, apontar o que pode ser comprovado, comparar os caminhos e conduzir o pedido com o que o caso permite — explicando os limites de cada caminho.",
  },
];

/* ------------------------------------------------------------------ */
/* Resultados do seletor: perfil → cuidados e benefícios               */
/* ------------------------------------------------------------------ */

export type Regime = "inss" | "servidor";
export type Situacao = "vai-aposentar" | "ja-aposentado";

export interface PerfilSelecionado {
  regime: Regime;
  situacao: Situacao;
  titulo: string;
  texto: string;
  cuidados: string[];
  beneficios: string[];
}

export const PERFIS: Record<string, PerfilSelecionado> = {
  "inss-vai-aposentar": {
    regime: "inss",
    situacao: "vai-aposentar",
    titulo: "Você ainda vai se aposentar pelo INSS",
    texto:
      "Esta é a fase em que a decisão custa menos e vale mais: quase tudo que dá errado no pedido pode ser corrigido antes de protocolar.",
    cuidados: [
      "Confira o extrato de contribuições antes de qualquer pedido: períodos sem baixa e vínculos com data errada são a causa mais comum de negativa.",
      "Compare os caminhos possíveis para o seu histórico. Há mais de um, e a escolha entre eles muda a data e o valor.",
      "Levante agora os documentos de trabalho com exposição a agentes nocivos. Empresas fechadas dificultam a prova com o passar do tempo.",
      "Verifique se existe tempo rural, tempo em outro regime ou trabalho na condição de pessoa com deficiência, que podem não aparecer no extrato.",
      "Cuidado com a data de entrada: o mês do pedido influencia o cálculo. Antes de dar entrada, simule.",
    ],
    beneficios: [
      "inss-especial",
      "inss-tempo",
      "inss-idade",
      "inss-rural",
      "inss-pcd",
      "inss-incapacidade",
    ],
  },
  "inss-ja-aposentado": {
    regime: "inss",
    situacao: "ja-aposentado",
    titulo: "Você já é aposentado pelo INSS",
    texto:
      "Quem já recebe também tem o que conferir — e existem benefícios que continuam sendo devidos depois da aposentadoria.",
    cuidados: [
      "Confira o cálculo que gerou o benefício: qual regra foi aplicada e quais períodos entraram na conta.",
      "Verifique se algum período ficou de fora — vínculos antigos, tempo com exposição a agentes nocivos e tempo rural são os mais frequentes.",
      "Cuidado com revisão: nem toda revisão aumenta o valor, e algumas reduzem. Simular o efeito vem antes do pedido.",
      "Se você sofreu acidente e ficou com sequela, o auxílio-acidente pode ser devido mesmo depois de voltar a trabalhar.",
      "Se você tem diagnóstico que se enquadra nas hipóteses de isenção, o imposto sobre os proventos pode ser dispensado — e o pedido precisa ser feito.",
    ],
    beneficios: [
      "alem-revisao",
      "alem-isencao",
      "alem-auxilio-acidente",
      "alem-pensao",
      "alem-cessado",
      "inss-especial",
    ],
  },
  "servidor-vai-aposentar": {
    regime: "servidor",
    situacao: "vai-aposentar",
    titulo: "Você é servidor e ainda vai se aposentar",
    texto:
      "No serviço público, o caminho depende do ente e do seu histórico funcional. A análise começa pelo seu regime, não por uma regra genérica.",
    cuidados: [
      "Identifique qual regime próprio se aplica ao seu caso: municipal, estadual ou federal têm caminhos diferentes.",
      "Confira a certidão de tempo de contribuição e a ficha financeira antes de protocolar. Divergência de datas ou vínculos trava o processo no órgão.",
      "Verifique o tempo trabalhado antes de ingressar no serviço público: ele pode ser averbado, se a documentação estiver no formato exigido.",
      "O abono de permanência não é automático. Sem o pedido no momento certo, o valor pode não ser recuperado depois.",
      "Se houve exposição a agentes nocivos no cargo, a análise é própria do serviço público e depende de previsão no seu ente.",
    ],
    beneficios: [
      "rpps-voluntaria",
      "rpps-averbacao",
      "rpps-abono",
      "rpps-especial",
      "rpps-incapacidade",
      "rpps-compensacao",
    ],
  },
  "servidor-ja-aposentado": {
    regime: "servidor",
    situacao: "ja-aposentado",
    titulo: "Você já é aposentado no regime próprio",
    texto:
      "Mesmo depois da concessão, há pontos que costumam passar em branco — do cálculo à compensação entre regimes.",
    cuidados: [
      "Confira a regra aplicada e a data de início do benefício: elas definem o valor e a correção dos proventos.",
      "Se você acumulou cargos ou regimes, a análise é específica e precisa considerar cada vínculo separadamente.",
      "A compensação previdenciária entre os regimes pode ficar pendente sem que você seja informado. Vale conferir o andamento.",
      "Cuidado com pedidos de revisão: simular o efeito antes de pedir é o que evita perder o que já está garantido.",
      "Verifique a possibilidade de isenção de imposto de renda conforme a sua condição de saúde e a documentação correspondente.",
    ],
    beneficios: [
      "alem-revisao",
      "alem-isencao",
      "rpps-compensacao",
      "rpps-compulsoria",
      "alem-pensao",
      "alem-cessado",
    ],
  },
};

export function perfilPorSelecao(
  regime: Regime,
  situacao: Situacao,
): PerfilSelecionado {
  return PERFIS[`${regime}-${situacao}`];
}

/** Busca um benefício pelo id, em qualquer uma das três listas. */
export function beneficioPorId(id: string): BeneficioRegime | undefined {
  return [...BENEFICIOS_INSS, ...BENEFICIOS_SERVIDOR, ...BENEFICIOS_ALEM].find(
    (b) => b.id === id,
  );
}
