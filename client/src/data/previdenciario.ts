/**
 * Base de conteúdo do site.
 *
 * Todo o conteúdo jurídico fica aqui, separado do layout. Assim a revisão é
 * feita em um único arquivo, e a atualização anual das regras acontece em um
 * lugar só.
 *
 * IMPORTANTE: as regras de transição mudam a cada 1º de janeiro. Os números
 * abaixo estão com referência legal ao lado e foram conferidos na EC 103/2019
 * e na tabela oficial de regras de aposentadoria do INSS. Nada deve ser
 * publicado sem a conferência do advogado responsável.
 */

/** Ano de referência das regras de transição exibidas no site. */
export const ANO_REGRAS = 2026;

export type Modalidade = {
  /** Âncora na página. Usada nos links internos. */
  id: string;
  nome: string;
  /** Uma ou duas frases: é o que aparece no cartão. */
  resumo: string;
  /** "É o seu caso se..." — ajuda o visitante a se reconhecer. */
  paraQuem: string;
  requisitos: string[];
  /** Referência legal do requisito, para conferência. */
  base: string;
};

export type PerguntaFrequente = { pergunta: string; resposta: string };

export type LinhaRegra = {
  regra: string;
  mulheres: string;
  homens: string;
  base: string;
};

/* ------------------------------------------------------------------ */
/* Aposentadorias do Regime Geral de Previdência Social (INSS)         */
/* ------------------------------------------------------------------ */

export const APOSENTADORIAS_INSS: Modalidade[] = [
  {
    id: "idade",
    nome: "Aposentadoria por idade",
    resumo:
      "A regra mais comum de todas: exige idade mínima e um tempo de contribuição relativamente curto.",
    paraQuem:
      "É o seu caso se você já tem a idade mínima e contribuiu por pelo menos 15 anos, mesmo que com interrupções.",
    requisitos: [
      "62 anos de idade, se mulher, e 65 anos, se homem",
      "15 anos de contribuição (180 contribuições mensais)",
      "Para quem se filiou ao INSS depois da reforma: 15 anos de contribuição, se mulher, e 20 anos, se homem",
    ],
    base: "EC 103/2019, arts. 18 e 19",
  },
  {
    id: "pontos",
    nome: "Regra dos pontos",
    resumo: `Soma da idade com o tempo de contribuição. Em ${ANO_REGRAS} são 93 pontos para mulheres e 103 para homens.`,
    paraQuem:
      "É o seu caso se você já tem 30 ou 35 anos de contribuição e está perto da idade mínima — muitas vezes é a regra mais vantajosa.",
    requisitos: [
      "30 anos de contribuição, se mulher, e 35 anos, se homem",
      `Somatório de idade e tempo de contribuição de 93 pontos (mulher) e 103 pontos (homem) em ${ANO_REGRAS}`,
      "A pontuação sobe 1 ponto por ano até 100 e 105 pontos",
    ],
    base: "EC 103/2019, art. 15",
  },
  {
    id: "idade-progressiva",
    nome: "Idade mínima progressiva",
    resumo: `Regra de transição em que a idade exigida cresce seis meses por ano. Em ${ANO_REGRAS}: 59 anos e meio e 64 anos e meio.`,
    paraQuem:
      "É o seu caso se você tem bastante tempo de contribuição, mas ainda não alcançou a pontuação da regra dos pontos.",
    requisitos: [
      "30 anos de contribuição, se mulher, e 35 anos, se homem",
      `59 anos e 6 meses (mulher) e 64 anos e 6 meses (homem) em ${ANO_REGRAS}`,
      "A idade sobe 6 meses por ano até 62 e 65 anos, em 2031",
    ],
    base: "EC 103/2019, art. 16",
  },
  {
    id: "pedagio",
    nome: "Pedágio de 100%",
    resumo:
      "Para quem estava a pouco tempo de se aposentar em 2019: cumpre o dobro do tempo que faltava naquela data.",
    paraQuem:
      "É o seu caso se em 13/11/2019 faltavam poucos anos para você completar o tempo de contribuição.",
    requisitos: [
      "57 anos de idade, se mulher, e 60 anos, se homem",
      "30 anos de contribuição, se mulher, e 35 anos, se homem",
      "Período adicional igual a 100% do tempo que faltava em 13/11/2019",
    ],
    base: "EC 103/2019, art. 20",
  },
  {
    id: "especial",
    nome: "Aposentadoria especial",
    resumo:
      "Para quem trabalhou exposto a agentes químicos, físicos ou biológicos prejudiciais à saúde.",
    paraQuem:
      "É o seu caso se você trabalhou em ambiente com ruído, produtos químicos, agentes biológicos ou calor — a exposição precisa estar comprovada em documento.",
    requisitos: [
      "15, 20 ou 25 anos de efetiva exposição a agentes nocivos",
      "Comprovação da exposição por PPP e documentos técnicos de cada vínculo",
      "A idade mínima não é mais exigida: o STF afastou as idades de 55, 58 e 60 anos (ADI 6.309, julgada em junho de 2026)",
      "Quem já contribuía em 13/11/2019 pode ter a regra de transição por pontos aplicada, conforme o período",
    ],
    base:
      "EC 103/2019, arts. 19, §1º, I, e 21; Lei 8.213/1991, arts. 57 e 58 (idade mínima afastada na ADI 6.309)",
  },
  {
    id: "rural",
    nome: "Aposentadoria rural",
    resumo:
      "Regra própria para quem trabalhou no campo, na pesca artesanal ou em atividade indígena.",
    paraQuem:
      "É o seu caso se você sempre trabalhou em atividade rural, mesmo sem registro em carteira.",
    requisitos: [
      "55 anos de idade, se mulher, e 60 anos, se homem",
      "180 meses de atividade rural comprovada",
      "Prova material: notas do produtor, contratos, cadastros, documentos da propriedade",
    ],
    base: "Lei 8.213/1991, art. 48",
  },
  {
    id: "professor",
    nome: "Aposentadoria do professor",
    resumo:
      "Quem exerceu magistério na educação infantil, fundamental ou médio tem idade e pontos reduzidos.",
    paraQuem:
      "É o seu caso se você comprova tempo de efetivo exercício em função de magistério na educação básica.",
    requisitos: [
      "25 anos de magistério, se mulher, e 30 anos, se homem",
      `Regra dos pontos do professor: 88 pontos (mulher) e 98 pontos (homem) em ${ANO_REGRAS}`,
      `Idade mínima progressiva do professor: 54 anos e 6 meses (mulher) e 59 anos e 6 meses (homem) em ${ANO_REGRAS}`,
      "Para quem se filiou depois da reforma: 57 anos (mulher) e 60 anos (homem)",
    ],
    base: "EC 103/2019, arts. 15, §3º, 16, §2º, e 19",
  },
  {
    id: "deficiencia",
    nome: "Aposentadoria da pessoa com deficiência",
    resumo:
      "Tempo de contribuição reduzido conforme o grau da deficiência, com avaliação biopsicossocial.",
    paraQuem:
      "É o seu caso se você contribuiu trabalhando com deficiência, ainda que ela tenha sido reconhecida depois.",
    requisitos: [
      "Deficiência grave: 25 anos de contribuição (homem) e 20 anos (mulher)",
      "Deficiência moderada: 29 anos (homem) e 24 anos (mulher)",
      "Deficiência leve: 33 anos (homem) e 28 anos (mulher)",
      "Ou por idade: 60 anos (homem) e 55 anos (mulher), com 15 anos de contribuição na condição de pessoa com deficiência",
      "A deficiência é verificada por perícia médica e avaliação social",
    ],
    base: "LC 142/2013; EC 103/2019, art. 22",
  },
  {
    id: "incapacidade-permanente",
    nome: "Aposentadoria por incapacidade permanente",
    resumo:
      "Antiga aposentadoria por invalidez: para quem não tem mais capacidade para o trabalho e não pode ser reabilitado.",
    paraQuem:
      "É o seu caso se a perícia reconheceu incapacidade total e permanente, sem possibilidade de reabilitação.",
    requisitos: [
      "Incapacidade total e permanente para o trabalho",
      "Ausência de possibilidade de reabilitação profissional",
      "12 contribuições mensais (há dispensa em acidente e em doenças graves previstas em lei)",
      "Perícia médica federal",
    ],
    base: "Lei 8.213/1991, art. 42",
  },
];

/** Tabela comparativa das regras do INSS, para leitura rápida. */
export const REGRAS_INSS: LinhaRegra[] = [
  {
    regra: "Regra dos pontos",
    mulheres: "30 anos + 93 pontos",
    homens: "35 anos + 103 pontos",
    base: "EC 103, art. 15",
  },
  {
    regra: "Idade mínima progressiva",
    mulheres: "30 anos + 59a6m",
    homens: "35 anos + 64a6m",
    base: "EC 103, art. 16",
  },
  {
    regra: "Pedágio de 100%",
    mulheres: "57 anos + 30 anos + pedágio",
    homens: "60 anos + 35 anos + pedágio",
    base: "EC 103, art. 20",
  },
  {
    regra: "Aposentadoria por idade",
    mulheres: "62 anos + 15 anos",
    homens: "65 anos + 15 anos",
    base: "EC 103, art. 18",
  },
  {
    regra: "Aposentadoria especial",
    mulheres: "15, 20 ou 25 anos de exposição (sem idade mínima)",
    homens: "15, 20 ou 25 anos de exposição (sem idade mínima)",
    base: "EC 103, art. 19, §1º, I — idade mínima afastada na ADI 6.309",
  },
  {
    regra: "Professor",
    mulheres: "25 anos de magistério + 88 pontos",
    homens: "30 anos de magistério + 98 pontos",
    base: "EC 103, arts. 15, §3º, e 16, §2º",
  },
  {
    regra: "Aposentadoria rural",
    mulheres: "55 anos + 180 meses de atividade rural",
    homens: "60 anos + 180 meses de atividade rural",
    base: "Lei 8.213/1991, art. 48",
  },
];

/* ------------------------------------------------------------------ */
/* Aposentadorias de servidores públicos (Regimes Próprios)            */
/* ------------------------------------------------------------------ */

export const APOSENTADORIAS_RPPS: Modalidade[] = [
  {
    id: "regra-permanente",
    nome: "Regra permanente",
    resumo:
      "A regra geral do servidor que ingressou em cargo efetivo depois da reforma de 2019.",
    paraQuem:
      "É o seu caso se você tomou posse em cargo efetivo após 13/11/2019.",
    requisitos: [
      "62 anos de idade, se mulher, e 65 anos, se homem",
      "25 anos de contribuição",
      "10 anos de efetivo exercício no serviço público",
      "5 anos no cargo efetivo em que se dará a aposentadoria",
    ],
    base: "CF, art. 40, §1º, III, com a redação da EC 103/2019",
  },
  {
    id: "pontos",
    nome: "Transição por pontos",
    resumo: `Soma da idade e do tempo de contribuição, com exigências adicionais de tempo de serviço público e de permanência no cargo. Em ${ANO_REGRAS}: 93 e 103 pontos.`,
    paraQuem:
      "É o seu caso se você já ingressou no serviço público antes de 13/11/2019 e tem bastante tempo de contribuição.",
    requisitos: [
      "57 anos de idade, se mulher, e 62 anos, se homem",
      "30 anos de contribuição, se mulher, e 35 anos, se homem",
      `93 pontos (mulher) e 103 pontos (homem) em ${ANO_REGRAS}, somando idade e tempo de contribuição`,
      "20 anos de efetivo exercício no serviço público e 5 anos no cargo efetivo",
    ],
    base: "EC 103/2019, art. 4º",
  },
  {
    id: "pedagio",
    nome: "Pedágio de 100%",
    resumo:
      "Exige cumprir integralmente o tempo que faltava em 13/11/2019, além da idade e do tempo mínimos.",
    paraQuem:
      "É o seu caso se em 2019 faltavam poucos anos para você completar o tempo de contribuição.",
    requisitos: [
      "57 anos de idade, se mulher, e 60 anos, se homem",
      "30 anos de contribuição, se mulher, e 35 anos, se homem",
      "20 anos de efetivo exercício no serviço público e 5 anos no cargo efetivo",
      "Período adicional igual a 100% do tempo que faltava em 13/11/2019",
    ],
    base: "EC 103/2019, art. 20",
  },
  {
    id: "compulsoria",
    nome: "Aposentadoria compulsória",
    resumo:
      "Não é uma escolha do servidor: é obrigatória ao completar 75 anos de idade.",
    paraQuem:
      "É o seu caso se você está próximo dos 75 anos e precisa entender os efeitos no cálculo dos proventos.",
    requisitos: [
      "75 anos de idade, para ambos os sexos",
      "Aposentadoria obrigatória, com proventos proporcionais ao tempo de contribuição",
    ],
    base: "CF, art. 40, §1º, II; LC 152/2015",
  },
  {
    id: "especial",
    nome: "Aposentadoria especial do servidor",
    resumo:
      "Regras próprias para professores, policiais, agentes penitenciários e servidores expostos a agentes nocivos.",
    paraQuem:
      "É o seu caso se você é professor, policial civil, agente penitenciário ou trabalhou exposto a agentes nocivos.",
    requisitos: [
      "Professor: 25 anos de magistério (mulher) e 30 anos (homem), com idade reduzida em 5 anos",
      `Professor, transição por pontos: 88 pontos (mulher) e 98 pontos (homem) em ${ANO_REGRAS}, com 52 e 57 anos`,
      "Policial civil e agente penitenciário: regras da LC 51/1985, com idade mínima de 55 anos",
      "Exposição a agentes nocivos: 66, 76 ou 86 pontos, conforme 15, 20 ou 25 anos de exposição, mais 20 anos de serviço público e 5 anos no cargo",
    ],
    base: "CF, art. 40, §§4º, 4º-B e 5º; EC 103/2019, arts. 5º e 21",
  },
  {
    id: "incapacidade",
    nome: "Incapacidade permanente",
    resumo:
      "Aposentadoria por incapacidade permanente para o trabalho, apurada em perícia.",
    paraQuem:
      "É o seu caso se uma doença ou acidente impediu definitivamente o exercício do cargo.",
    requisitos: [
      "Incapacidade total e permanente para o trabalho",
      "Perícia médica oficial",
      "Proventos proporcionais ao tempo de contribuição, com exceções previstas na Constituição",
    ],
    base: "CF, art. 40, §1º, I; EC 103/2019",
  },
  {
    id: "abono",
    nome: "Abono de permanência",
    resumo:
      "Quem já cumpriu os requisitos da aposentadoria voluntária pode continuar trabalhando e receber um abono equivalente à contribuição previdenciária.",
    paraQuem:
      "É o seu caso se você já poderia se aposentar, mas prefere permanecer no cargo.",
    requisitos: [
      "Ter cumprido todos os requisitos para a aposentadoria voluntária",
      "Optar por permanecer em atividade",
      "Abono de valor equivalente à contribuição previdenciária do servidor",
    ],
    base: "CF, art. 40, §19",
  },
  {
    id: "averbacao",
    nome: "Averbação de tempo e CTC",
    resumo:
      "Uso de tempo trabalhado em outro regime, por meio da Certidão de Tempo de Contribuição. A decisão é definitiva.",
    paraQuem:
      "É o seu caso se você trabalhou na iniciativa privada antes de assumir o cargo público, ou vai migrar entre regimes.",
    requisitos: [
      "Certidão de Tempo de Contribuição emitida pelo regime de origem",
      "Contagem recíproca entre o INSS e o regime próprio",
      "A escolha da destinação do tempo é irreversível — deve ser simulada antes",
    ],
    base: "CF, art. 201, §9º; Lei 8.213/1991, art. 96",
  },
];

export const REGRAS_RPPS: LinhaRegra[] = [
  {
    regra: "Regra permanente",
    mulheres: "62 anos + 25 anos + 10 no serviço público",
    homens: "65 anos + 25 anos + 10 no serviço público",
    base: "CF, art. 40, §1º, III",
  },
  {
    regra: "Transição por pontos",
    mulheres: "57 anos + 30 anos + 93 pontos",
    homens: "62 anos + 35 anos + 103 pontos",
    base: "EC 103, art. 4º",
  },
  {
    regra: "Pedágio de 100%",
    mulheres: "57 anos + 30 anos + pedágio",
    homens: "60 anos + 35 anos + pedágio",
    base: "EC 103, art. 20",
  },
  {
    regra: "Compulsória",
    mulheres: "75 anos (obrigatória)",
    homens: "75 anos (obrigatória)",
    base: "CF, art. 40, §1º, II",
  },
  {
    regra: "Professor",
    mulheres: "52 anos + 25 anos de magistério + 88 pontos",
    homens: "57 anos + 30 anos de magistério + 98 pontos",
    base: "EC 103, art. 4º, §§4º e 5º",
  },
];

/* ------------------------------------------------------------------ */
/* Demais benefícios                                                   */
/* ------------------------------------------------------------------ */

export const BENEFICIOS: Modalidade[] = [
  {
    id: "incapacidade-temporaria",
    nome: "Auxílio por incapacidade temporária",
    resumo:
      "O antigo auxílio-doença: afastamento remunerado quando uma doença ou acidente impede o trabalho por mais de 15 dias.",
    paraQuem:
      "É o seu caso se você está temporariamente incapaz de trabalhar e precisa de afastamento.",
    requisitos: [
      "Incapacidade temporária para o trabalho, comprovada em perícia",
      "12 contribuições mensais (há dispensa em acidente e doenças graves)",
      "Afastamento superior a 15 dias",
    ],
    base: "Lei 8.213/1991, arts. 59 a 64",
  },
  {
    id: "incapacidade-permanente-beneficio",
    nome: "Aposentadoria por incapacidade permanente",
    resumo:
      "Quando a incapacidade é total, permanente e não há possibilidade de reabilitação.",
    paraQuem:
      "É o seu caso se a perícia concluiu que não há mais condições de trabalho nem de reabilitação.",
    requisitos: [
      "Incapacidade total e permanente",
      "Sem possibilidade de reabilitação profissional",
      "12 contribuições mensais, salvo exceções legais",
    ],
    base: "Lei 8.213/1991, art. 42",
  },
  {
    id: "auxilio-acidente",
    nome: "Auxílio-acidente",
    resumo:
      "Indenização paga a quem ficou com sequelas de acidente que reduzem a capacidade de trabalho.",
    paraQuem:
      "É o seu caso se depois do acidente você continua trabalhando, mas ficou com limitação permanente.",
    requisitos: [
      "Sequela definitiva decorrente de acidente",
      "Redução da capacidade para o trabalho habitual",
      "Independe de carência",
    ],
    base: "Lei 8.213/1991, art. 86",
  },
  {
    id: "salario-maternidade",
    nome: "Salário-maternidade",
    resumo:
      "Benefício pago em razão de nascimento, adoção, guarda judicial para adoção ou natimorto.",
    paraQuem:
      "É o seu caso se você é empregada, autônoma, segurada especial ou está desempregada dentro do período de graça.",
    requisitos: [
      "Nascimento, adoção ou guarda para fins de adoção",
      "Carência conforme a categoria da segurada: sem carência para empregadas",
      "10 contribuições para autônomas e seguradas especiais",
    ],
    base: "Lei 8.213/1991, arts. 71 a 73",
  },
  {
    id: "salario-familia",
    nome: "Salário-família",
    resumo:
      "Valor pago por filho ou equiparado de até 14 anos, para segurados de baixa renda.",
    paraQuem:
      "É o seu caso se você é empregado e a sua renda mensal está dentro do limite legal.",
    requisitos: [
      "Filho ou equiparado de até 14 anos, ou inválido de qualquer idade",
      "Renda mensal dentro do limite definido anualmente",
      "Segurado empregado, inclusive doméstico",
    ],
    base: "Lei 8.213/1991, arts. 65 a 70",
  },
  {
    id: "pensao-por-morte",
    nome: "Pensão por morte",
    resumo:
      "Prestação paga aos dependentes do segurado que faleceu, com duração e valor conforme a idade e o tempo de união.",
    paraQuem:
      "É o seu caso se você era cônjuge, companheiro, filho menor ou dependente do segurado falecido.",
    requisitos: [
      "Óbito do segurado, independentemente de carência, quando já era segurado",
      "Dependência econômica comprovada, conforme o caso",
      "Duração variável conforme a idade e o tempo de casamento ou união estável",
      "Duração de 4 meses para quem tem até 21 anos e não completou 18 meses de união",
    ],
    base: "Lei 8.213/1991, arts. 74 a 79",
  },
  {
    id: "auxilio-reclusao",
    nome: "Auxílio-reclusão",
    resumo:
      "Prestação aos dependentes do segurado de baixa renda preso em regime fechado.",
    paraQuem:
      "É o seu caso se você depende de uma pessoa presa em regime fechado e a última remuneração estava dentro do limite.",
    requisitos: [
      "Recolhimento em regime fechado",
      "Segurado de baixa renda, conforme o limite legal vigente",
      "Comprovação da dependência",
    ],
    base: "Lei 8.213/1991, art. 80",
  },
  {
    id: "bpc-loas",
    nome: "BPC/LOAS",
    resumo:
      "Benefício assistencial de um salário mínimo para idosos e pessoas com deficiência em situação de baixa renda.",
    paraQuem:
      "É o seu caso se a renda por pessoa da família está dentro do limite legal e você não tem como se manter.",
    requisitos: [
      "Idoso com 65 anos ou mais, ou pessoa com deficiência de qualquer idade",
      "Renda familiar por pessoa dentro do limite definido em lei",
      "Não é previdenciário: não exige contribuição ao INSS",
      "Perícia médica e avaliação social, no caso de pessoa com deficiência",
    ],
    base: "Lei 8.742/1993 (LOAS), art. 20",
  },
];

/** Serviços do escritório, exibidos na página inicial. */
export const SERVICOS: { id: string; nome: string; resumo: string }[] = [
  {
    id: "planejamento",
    nome: "Planejamento previdenciário",
    resumo:
      "Estudo do seu histórico de contribuições para comparar regras, datas e valores antes de qualquer pedido.",
  },
  {
    id: "revisao",
    nome: "Revisão de benefício",
    resumo:
      "Conferência do cálculo do benefício já concedido e análise das revisões cabíveis na via administrativa ou judicial.",
  },
  {
    id: "recursos",
    nome: "Recursos e ação judicial",
    resumo:
      "Atuação no recurso ao Conselho de Recursos do INSS e em ação judicial quando o benefício é indeferido ou cessado.",
  },
];

/* ------------------------------------------------------------------ */
/* Perguntas frequentes                                                */
/* ------------------------------------------------------------------ */

export const FAQ_HOME: PerguntaFrequente[] = [
  {
    pergunta:
      "Qual é a diferença entre aposentadoria do INSS e aposentadoria de servidor público?",
    resposta:
      "São regimes diferentes. Quem trabalha na iniciativa privada se aposenta pelo Regime Geral de Previdência Social, administrado pelo INSS. Quem é servidor efetivo tem um regime próprio, com requisitos, cálculo e reajuste próprios. A escolha da regra e o momento do pedido mudam bastante entre os dois.",
  },
  {
    pergunta: "Preciso ter todos os documentos antes de falar com o escritório?",
    resposta:
      "Não. Você pode começar apenas relatando a sua situação. A partir disso indicamos quais documentos são necessários e, quando for o caso, solicitamos extratos e certidões diretamente nos órgãos competentes.",
  },
  {
    pergunta: "Vale a pena pedir a aposentadoria agora ou esperar mais um ano?",
    resposta:
      "Depende. Esperar pode aumentar o valor do benefício, mas também pode fazer você perder uma regra de transição que ainda está disponível. É exatamente essa comparação que fazemos no planejamento previdenciário, com datas e valores estimados.",
  },
  {
    pergunta: "O escritório atende quem não mora em Maringá?",
    resposta:
      "Sim. A maior parte do atendimento é feita de forma remota, por WhatsApp, e-mail e videochamada. O escritório está em Maringá, no Paraná, e atua em processos administrativos e judiciais de clientes de outras cidades.",
  },
  {
    pergunta: "Já tive um benefício negado. Ainda há o que fazer?",
    resposta:
      "Sim. A negativa não encerra a discussão: existem o recurso administrativo ao Conselho de Recursos do INSS e a via judicial. Em muitos casos é possível corrigir a causa da negativa, apresentando documentos que comprovem o período ou a atividade questionada.",
  },
];

export const FAQ_INSS: PerguntaFrequente[] = [
  {
    pergunta: `Quantos pontos são necessários para se aposentar em ${ANO_REGRAS}?`,
    resposta: `Em ${ANO_REGRAS}, a regra dos pontos exige 93 pontos para mulheres e 103 para homens, somando idade e tempo de contribuição. A pontuação sobe um ponto por ano até atingir 100 e 105.`,
  },
  {
    pergunta: "Como sei qual regra de transição é mais vantajosa para mim?",
    resposta:
      "É preciso calcular todas as regras ao mesmo tempo, com o seu histórico real de contribuições. Uma regra pode antecipar a aposentadoria e outra pode dar um valor maior. Só a simulação comparativa responde qual delas vale mais no seu caso.",
  },
  {
    pergunta: "O tempo de trabalho com exposição a agentes nocivos sempre conta como especial?",
    resposta:
      "Não. A exposição precisa estar comprovada em PPP e LTCAT, com indicação dos agentes e dos períodos. Muitas empresas entregam o PPP incompleto, e é justamente aí que o pedido costuma ser negado.",
  },
  {
    pergunta: "O que é o CNIS e por que ele importa tanto?",
    resposta:
      "É o extrato oficial das suas contribuições junto ao INSS. É a partir dele que se verifica o tempo já registrado, os vínculos existentes e as faltas de informação. A leitura e a correção do CNIS costumam ser o primeiro passo de qualquer pedido.",
  },
  {
    pergunta: "A Reforma da Previdência acabou com alguma regra de transição?",
    resposta:
      "Algumas regras deixaram de alcançar novos segurados com o passar dos anos, como a do pedágio de 50%. Outras continuam disponíveis, como a dos pontos, a de idade mínima progressiva e a do pedágio de 100%. Por isso o cálculo precisa ser feito com as regras do ano corrente.",
  },
];

export const FAQ_RPPS: PerguntaFrequente[] = [
  {
    pergunta: "Servidor estadual ou municipal segue a regra da EC 103?",
    resposta:
      "Depende do ente. A EC 103 aplica-se diretamente aos servidores federais. Estados, Distrito Federal e municípios seguem as normas anteriores à reforma enquanto não alterarem a legislação do seu próprio regime de previdência. Por isso é indispensável conferir as regras do regime ao qual o servidor está vinculado.",
  },
  {
    pergunta: "O que é o abono de permanência?",
    resposta:
      "É um valor equivalente à contribuição previdenciária do servidor, pago a quem já cumpriu todos os requisitos para se aposentar mas decide continuar em atividade. Não é aumento de salário nem altera o cálculo da futura aposentadoria.",
  },
  {
    pergunta: "Posso somar o tempo de INSS com o tempo de serviço público?",
    resposta:
      "Sim, por contagem recíproca, com a Certidão de Tempo de Contribuição. O ponto de atenção é que a destinação desse tempo é definitiva: depois de averbado em um regime, não é possível voltar atrás. Por isso a escolha precisa ser simulada antes.",
  },
  {
    pergunta: "A aposentadoria compulsória aos 75 anos pode reduzir meus proventos?",
    resposta:
      "Pode, porque em regra os proventos são proporcionais ao tempo de contribuição. Vale conferir se o servidor já teria direito a uma aposentadoria voluntária mais vantajosa antes dessa data.",
  },
  {
    pergunta: "Professor do serviço público tem regra diferente?",
    resposta:
      "Sim. O professor tem redução de idade e pontuação em relação à regra geral, tanto na regra permanente quanto nas transições, desde que comprove exercício exclusivo em funções de magistério na educação infantil, no ensino fundamental ou no médio.",
  },
];

/** Data da última conferência do conteúdo jurídico publicado. */
export const REVISAO_CONTEUDO = "21 de outubro de 2026";
