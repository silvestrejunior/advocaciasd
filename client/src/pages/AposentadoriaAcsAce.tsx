/**
 * Página: aposentadoria de ACS e ACE pela EC 140/2026
 * (/aposentadoria-acs-ace).
 *
 * Landing page de campanha para agentes comunitários de saúde e agentes de
 * combate às endemias. Identidade própria: azul-chumbo #32414E nos textos,
 * azul médio #0066AD nos links, ciano #00AEEF apenas em elementos gráficos,
 * fundo #F4F7F9, faixa escura #22303B e WhatsApp #1F8F4E. Títulos em Sora e
 * texto em Source Sans 3, servidas localmente.
 *
 * O simulador roda só no navegador: não envia, não guarda e não registra dados.
 */

import { useEffect, useMemo, useState } from "react";
import { Seo, faqJsonLd } from "@/components/site/Seo";
import { SITE, whatsapp } from "@/config/site";
import "@/styles/fonts-acs.css";

/* --------------------------------------------------------------- contato */

const MENSAGEM_PADRAO =
  "Olá! Sou agente (ACS/ACE) e vi a página sobre a aposentadoria pela EC 140/2026. Gostaria de uma análise do meu caso.";
const LINK_WHATSAPP = whatsapp(MENSAGEM_PADRAO);

const FONTE_TEXTO =
  'Fonte: Tramitação Inteligente, "Da insegurança à soberania constitucional: o novo regime da aposentadoria especial dos ACS e ACE"';
const FONTE_URL =
  "https://planilha.tramitacaointeligente.com.br/blog/previdenciario/ec-140-2026-novas-regras-da-aposentadoria-especial-dos-acs-e-ace";

/** Cores da campanha, em um único lugar. */
const C = {
  chumbo: "#32414E",
  medio: "#0066AD",
  ciano: "#00AEEF",
  fundo: "#F4F7F9",
  escuro: "#22303B",
  verde: "#1F8F4E",
} as const;

/* ------------------------------------------------------------------ SEO */

const TITULO =
  "Aposentadoria ACS e ACE: novas regras da EC 140/2026 | Maringá-PR";
const DESCRICAO =
  "Agente comunitário de saúde ou de endemias? Veja as idades da EC 140/2026, simule sua aposentadoria e fale com advogado previdenciário. Atendimento em todo o PR.";

/* ------------------------------------------------------------- simulador */

type Sexo = "mulher" | "homem";
type Regime = "proprio" | "inss" | "nao-sei";
type Vinculo = "efetivo" | "clt" | "temporario" | "aposentado";

type Estimativa = {
  anoIdade: number | null;
  anosIdade: number | null;
  anoPontos: number | null;
  anosPontos: number | null;
};

const ANO_INICIAL = 2026;
const ANO_FINAL = 2071;

/**
 * Compara a transição por idade e a transição por pontos, ano a ano, supondo
 * que a pessoa continue trabalhando como agente.
 *
 * A idade-base da transição por idade muda a cada cinco anos e cada ano de
 * contribuição além dos 25 reduz um ano da idade exigida, até o limite de 5.
 */
function estimar(
  sexo: Sexo,
  idadeHoje: number,
  exercicio: number,
  contribuicaoInformada: number
): Estimativa {
  const contribuicao = Math.max(contribuicaoInformada, exercicio);
  let anoIdade: number | null = null;
  let anosIdade: number | null = null;
  let anoPontos: number | null = null;
  let anosPontos: number | null = null;

  for (let ano = ANO_INICIAL; ano <= ANO_FINAL; ano += 1) {
    const d = ano - ANO_INICIAL;
    const idade = idadeHoje + d;
    const efetivo = exercicio + d;
    const contrib = contribuicao + d;

    if (anoIdade === null && efetivo >= 25 && contrib >= 25) {
      const base =
        ano <= 2030
          ? sexo === "mulher"
            ? 50
            : 52
          : ano <= 2035
            ? sexo === "mulher"
              ? 52
              : 54
            : ano <= 2040
              ? sexo === "mulher"
                ? 54
                : 56
              : sexo === "mulher"
                ? 57
                : 60;
      const reducao = Math.min(5, Math.min(efetivo, contrib) - 25);
      if (idade >= base - reducao) {
        anoIdade = ano;
        anosIdade = idade;
      }
    }

    if (
      anoPontos === null &&
      idade >= (sexo === "mulher" ? 60 : 63) &&
      contrib >= 15 &&
      efetivo >= 10 &&
      idade + contrib >= (sexo === "mulher" ? 83 : 86)
    ) {
      anoPontos = ano;
      anosPontos = idade;
    }

    if (anoIdade !== null && anoPontos !== null) break;
  }

  return { anoIdade, anosIdade, anoPontos, anosPontos };
}

const REGIMES: { valor: Regime; label: string }[] = [
  {
    valor: "proprio",
    label: "Instituto de previdência do município (regime próprio)",
  },
  { valor: "inss", label: "INSS (Regime Geral)" },
  { valor: "nao-sei", label: "Não sei" },
];

const VINCULOS: { valor: Vinculo; label: string }[] = [
  { valor: "efetivo", label: "Concursado (efetivo)" },
  { valor: "clt", label: "Contratado pela CLT" },
  { valor: "temporario", label: "Contrato temporário ou terceirizado" },
  { valor: "aposentado", label: "Já sou aposentado" },
];

/* ---------------------------------------------------------- textos fixos */

const IDADES_TRANSICAO = [
  {
    periodo: "Até 31/12/2030",
    mulher: "50 anos",
    homem: "52 anos",
    destaque: true,
  },
  {
    periodo: "De 2031 a 2035",
    mulher: "52 anos",
    homem: "54 anos",
    destaque: false,
  },
  {
    periodo: "De 2036 a 2040",
    mulher: "54 anos",
    homem: "56 anos",
    destaque: false,
  },
  {
    periodo: "A partir de 2041",
    mulher: "57 anos",
    homem: "60 anos",
    destaque: false,
  },
];

const CAMINHOS = [
  {
    titulo: "Transição por idade",
    numeros: "50 mulher · 52 homem",
    texto:
      "25 anos de contribuição e 25 de efetivo exercício na função. A idade sobe a cada cinco anos, até chegar a 57 e 60 em 2041. Redução de 1 ano de idade por ano de contribuição além dos 25, até 5 anos. Exemplo: a agente que completar 30 anos de serviço até 31/12/2030 pode se aposentar aos 45 anos.",
  },
  {
    titulo: "Transição por pontos",
    numeros: "83 mulher · 86 homem",
    texto:
      "Soma da idade com o tempo de contribuição, incluídas as frações. Idade mínima de 60 anos (mulher) ou 63 anos (homem). Pelo menos 15 anos de contribuição, sendo 10 como agente. O tempo em outras profissões entra na conta. Exemplo: aos 60 anos, a agente precisa de 23 anos de contribuição no total (60 + 23 = 83), sendo só 10 como ACS ou ACE.",
  },
  {
    titulo: "Regra definitiva",
    numeros: "57 mulher · 60 homem",
    texto:
      "25 anos de contribuição e 25 de efetivo exercício na função. Vale para o regime próprio e para o INSS. É a principal regra para quem entrar na profissão depois da emenda.",
  },
];

const QUEM_TEM_DIREITO = [
  "Agentes comunitários de saúde (ACS)",
  "Agentes de combate às endemias (ACE)",
  "Agentes indígenas de saúde e de saneamento",
  "Servidores do município ou do estado ligados a regime próprio de previdência",
  "Agentes filiados ao Regime Geral de Previdência Social (RGPS), ou seja, que contribuem para o INSS",
];

const DOCUMENTOS = [
  "RG e CPF",
  "Extrato do CNIS, baixado no aplicativo Meu INSS",
  "Contracheques recentes ou fichas financeiras",
  "Portaria de nomeação, contrato de trabalho ou carteira de trabalho",
  "Declaração da prefeitura com o tempo de efetivo exercício como agente",
  "Certidão de tempo de contribuição, se trabalhou em outro regime",
  "Documentos de readaptação, laudos médicos ou CAT, se houver",
  "Comprovante de mandato sindical, se houver",
  "Carta de concessão da aposentadoria, se já for aposentado",
];

const ETAPAS = [
  {
    titulo: "Conversa inicial",
    texto: "Você conta sua situação pelo WhatsApp e tira as primeiras dúvidas.",
  },
  {
    titulo: "Análise do tempo",
    texto: "Conferimos CNIS, contracheques e certidões, vínculo por vínculo.",
  },
  {
    titulo: "Cálculo das regras",
    texto:
      "Comparamos as regras e mostramos a data e o valor estimado de cada uma.",
  },
  {
    titulo: "Pedido e acompanhamento",
    texto:
      "Fazemos o requerimento no INSS ou no instituto do município e acompanhamos até a decisão.",
  },
];

const PERGUNTAS = [
  {
    pergunta: "A EC 140/2026 já está valendo?",
    resposta:
      "Sim. A emenda foi promulgada em 16 de outubro de 2026 e entrou em vigor na data da publicação. Quem já cumpre os requisitos pode pedir a aposentadoria pelas novas regras.",
  },
  {
    pergunta: "Preciso ter 25 anos só como agente?",
    resposta:
      "Na transição por idade e na regra definitiva, sim: são 25 anos de contribuição e 25 anos de efetivo exercício como ACS ou ACE. Na transição por pontos bastam 15 anos de contribuição, sendo 10 como agente, mas a idade mínima é maior: 60 anos para mulheres e 63 para homens.",
  },
  {
    pergunta: "Trabalhei em outra profissão antes. Esse tempo conta?",
    resposta:
      "Conta como tempo de contribuição. O tempo de efetivo exercício considera só o período na função de agente, somado aos afastamentos que a emenda manda contar, como readaptação por acidente ou doença do trabalho e mandato sindical.",
  },
  {
    pergunta: "Contribuo para o INSS. Tenho direito?",
    resposta:
      "Sim, se você já trabalhava como agente na data da promulgação. A emenda traz regras próprias para os agentes filiados ao Regime Geral de Previdência Social (RGPS), ou seja, que contribuem para o INSS. Valem as mesmas idades de transição e a mesma regra de pontos, e a União paga um benefício extraordinário para garantir integralidade e paridade.",
  },
  {
    pergunta: "Vou me aposentar com o salário integral?",
    resposta:
      "Para quem já era agente na data da emenda, o texto prevê integralidade e paridade. No regime próprio, a exigência é ter ingressado em cargo efetivo até 16/10/2026 e não ter aderido à previdência complementar. Para os filiados ao RGPS, que contribuem para o INSS, a diferença vem por um benefício extraordinário pago pela União.",
  },
  {
    pergunta: "Já sou aposentado. Posso pedir revisão?",
    resposta:
      "A emenda prevê revisão para os agentes aposentados até a promulgação. No regime próprio, a revisão busca a integralidade para quem recebe pela média. No INSS, o caminho é o benefício extraordinário da União. Não há pagamento de atrasados anteriores à promulgação.",
  },
  {
    pergunta: "O adicional de insalubridade entra no cálculo?",
    resposta:
      "A emenda inclui o adicional de insalubridade na base de cálculo e considera as vantagens permanentes do cargo. Vale conferir nas fichas financeiras se essas verbas estão entrando na contribuição.",
  },
  {
    pergunta: "Fui afastado por doença do trabalho. O que muda?",
    resposta:
      "Se a incapacidade permanente decorre de acidente de trabalho, doença profissional ou doença do trabalho, a aposentadoria deve observar integralidade e paridade. Se você foi readaptado, esse período conta como tempo de atividade.",
  },
  {
    pergunta: "Sou contratado temporário. Tenho direito?",
    resposta:
      "A emenda obriga os municípios a efetivar, até 31/12/2028, os agentes que ingressaram por processo seletivo público após 14 de fevereiro de 2006. Cada caso precisa de análise do contrato e do histórico de contribuições.",
  },
  {
    pergunta: "As regras são as mesmas para ACS e ACE?",
    resposta:
      "Sim. A EC 140 trata as duas funções da mesma forma e estende as regras aos agentes indígenas de saúde e de saneamento.",
  },
  {
    pergunta: "Atendem fora de Maringá?",
    resposta:
      "Sim. O escritório fica em Maringá e atende agentes de todo o Paraná de forma virtual. A conversa, o envio de documentos e o acompanhamento do pedido são feitos a distância.",
  },
];

/* ------------------------------------------------------------ componentes */

function FonteTramitacao({ className = "" }: { className?: string }) {
  return (
    <p
      className={`texto-pequeno text-[15px] leading-relaxed ${className}`}
      style={{ color: C.chumbo }}
    >
      {FONTE_TEXTO.slice(0, 7)}
      <a
        href={FONTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
        style={{ color: C.medio }}
      >
        {FONTE_TEXTO.slice(7)}
      </a>
    </p>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 h-5 w-5 flex-shrink-0"
      style={{ color: C.medio }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5 8 14.5 16 5.5" />
    </svg>
  );
}

function Chamada({ texto }: { texto: string }) {
  return (
    <p
      className="text-[12.5px] font-semibold uppercase tracking-[0.16em]"
      style={{ color: C.medio, fontFamily: "Sora, sans-serif" }}
    >
      {texto}
    </p>
  );
}

function Titulo({ texto }: { texto: string }) {
  return (
    <h2
      className="mt-3 text-[27px] font-semibold leading-snug md:text-[34px]"
      style={{ color: C.chumbo, fontFamily: "Sora, sans-serif" }}
    >
      {texto}
    </h2>
  );
}

function BotaoWhatsApp({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[17px] font-semibold text-white transition-colors hover:opacity-90 ${className}`}
      style={{ backgroundColor: C.verde, fontFamily: "Sora, sans-serif" }}
    >
      {children}
    </a>
  );
}

/* ----------------------------------------------------------------- página */

export default function AposentadoriaAcsAce() {
  const [sexo, setSexo] = useState<Sexo>("mulher");
  const [idade, setIdade] = useState(47);
  const [exercicio, setExercicio] = useState(20);
  const [contribuicao, setContribuicao] = useState(22);
  const [regime, setRegime] = useState<Regime>("nao-sei");
  const [vinculo, setVinculo] = useState<Vinculo>("efetivo");
  const [aberta, setAberta] = useState<number | null>(0);

  const estimativa = useMemo(
    () => estimar(sexo, idade, exercicio, contribuicao),
    [sexo, idade, exercicio, contribuicao]
  );

  const regimeLabel = REGIMES.find(r => r.valor === regime)?.label ?? "";
  const vinculoLabel = VINCULOS.find(v => v.valor === vinculo)?.label ?? "";

  const primeiroAno = useMemo(() => {
    const anos = [estimativa.anoIdade, estimativa.anoPontos].filter(
      (ano): ano is number => ano !== null
    );
    return anos.length ? Math.min(...anos) : null;
  }, [estimativa]);

  const regraVencedora =
    primeiroAno === null
      ? null
      : primeiroAno === estimativa.anoIdade
        ? "transição por idade"
        : "transição por pontos";

  const idadeVencedora =
    primeiroAno === null
      ? null
      : primeiroAno === estimativa.anoIdade
        ? estimativa.anosIdade
        : estimativa.anosPontos;

  const jaAposentado = vinculo === "aposentado";

  const resultadoMensagem = jaAposentado
    ? "revisão da aposentadoria já concedida"
    : primeiroAno === null
      ? "sem data definida"
      : primeiroAno === ANO_INICIAL
        ? "já posso ter direito"
        : `aposentadoria em ${primeiroAno}`;

  const mensagemSimulacao = [
    "Olá! Sou agente (ACS/ACE) e fiz a simulação da EC 140 no site.",
    `${sexo === "mulher" ? "Mulher" : "Homem"}, ${idade} anos, ${exercicio} anos como agente, ${contribuicao} anos de contribuição, ${regimeLabel}, vínculo: ${vinculoLabel}.`,
    `Resultado: ${resultadoMensagem}. Gostaria de uma análise.`,
  ].join(" ");

  useEffect(() => {
    document.documentElement.style.backgroundColor = C.fundo;
    return () => {
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const linhaRegra = (
    rotulo: string,
    ano: number | null,
    anos: number | null
  ) => (
    <p className="text-[17px] leading-relaxed" style={{ color: C.chumbo }}>
      <strong style={{ fontFamily: "Sora, sans-serif" }}>{rotulo}:</strong>{" "}
      {ano === null ? "não alcançada" : `em ${ano} · aos ${anos} anos`}
    </p>
  );

  return (
    <div
      className="min-h-screen text-[17px] leading-relaxed"
      style={{
        backgroundColor: C.fundo,
        color: C.chumbo,
        fontFamily: '"Source Sans 3", sans-serif',
      }}
    >
      <Seo
        titulo={TITULO}
        descricao={DESCRICAO}
        caminho="/aposentadoria-acs-ace"
        origemCanonica="https://advocaciasd.com.br"
        palavrasChave="aposentadoria ACS, aposentadoria ACE, EC 140/2026, aposentadoria agente comunitário de saúde, regras de transição ACS, advogado previdenciário Maringá"
        geo={{ regiao: "BR-PR", cidade: "Maringá" }}
        areaAtendimento={[
          { tipo: "City", nome: "Maringá" },
          { tipo: "State", nome: "Paraná" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: TITULO,
            description: DESCRICAO,
            url: "https://advocaciasd.com.br/aposentadoria-acs-ace",
            inLanguage: "pt-BR",
            dateModified: "2026-11-05",
            isPartOf: {
              "@type": "WebSite",
              name: SITE.nomeCompleto,
              url: SITE.dominio,
            },
            about: [
              { "@type": "Thing", name: "Emenda Constitucional 140/2026" },
              { "@type": "Thing", name: "Aposentadoria especial" },
              { "@type": "Thing", name: "Agente comunitário de saúde" },
              { "@type": "Thing", name: "Agente de combate às endemias" },
            ],
            provider: { "@id": `${SITE.dominio}/#escritorio` },
          },
          faqJsonLd(PERGUNTAS),
        ]}
      />

      {/* ------------------------------------------------------- cabeçalho */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Página inicial do escritório"
          >
            <img
              src={SITE.logo}
              alt="Santana Daufenbach Advocacia Previdenciária"
              width={512}
              height={512}
              className="h-11 w-11 object-contain"
            />
            <span
              className="hidden sm:block"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <span
                className="block text-[15px] font-semibold leading-tight"
                style={{ color: C.chumbo }}
              >
                Santana Daufenbach
              </span>
              <span
                className="block text-[11.5px] font-semibold tracking-[0.14em]"
                style={{ color: C.medio }}
              >
                ADVOCACIA PREVIDENCIÁRIA
              </span>
            </span>
          </a>
          <a
            href={LINK_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-lg px-5 py-2.5 text-[16px] font-semibold text-white sm:inline-flex"
            style={{ backgroundColor: C.verde, fontFamily: "Sora, sans-serif" }}
          >
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* ------------------------------------------------------------ topo */}
        <section className="bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <Chamada texto="Emenda constitucional 140/2026 · ACS e ACE" />
              <h1
                className="mt-4 text-[30px] font-semibold leading-tight md:text-[40px]"
                style={{ color: C.chumbo, fontFamily: "Sora, sans-serif" }}
              >
                Aposentadoria do agente comunitário de saúde e do agente de
                endemias: as novas regras já valem
              </h1>
              <p className="mt-6 text-[18px] leading-relaxed">
                A EC 140, promulgada em 16 de outubro de 2026, reduziu a idade
                de aposentadoria de ACS e ACE. Na regra de transição, quem
                completar 25 anos de atividade até 2030 pode se aposentar aos 50
                anos (mulher) ou 52 anos (homem). Analisamos o seu tempo de
                serviço e mostramos qual regra se aplica ao seu caso, com
                atendimento em Maringá e virtual para todo o Paraná.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BotaoWhatsApp href={LINK_WHATSAPP}>
                  Quero analisar meu caso
                </BotaoWhatsApp>
                <a
                  href="#simulador"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 px-6 py-3.5 text-[17px] font-semibold"
                  style={{
                    borderColor: C.medio,
                    color: C.medio,
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  Simular minha aposentadoria
                </a>
              </div>
              <ul className="mt-8 space-y-2 text-[15px] leading-relaxed">
                <li>Dr. João Luiz Santana Daufenbach · OAB/PR 66.208</li>
                <li>Mais de 10 anos em Direito Previdenciário</li>
                <li>Regime próprio do município e INSS</li>
                <li>Atendimento virtual em todo o Paraná</li>
              </ul>
            </div>

            <div
              className="h-fit rounded-xl p-6 text-white md:p-7"
              style={{ backgroundColor: C.escuro }}
            >
              <h2
                className="text-[21px] font-semibold leading-snug"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Idade mínima na regra de transição
              </h2>
              <p className="mt-2 text-[16px] opacity-90">
                Para quem já era ACS ou ACE em 16/10/2026
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[300px] border-collapse text-left text-[16px]">
                  <thead>
                    <tr className="text-[13px] uppercase tracking-wide opacity-75">
                      <th className="border-b border-white/25 py-2 pr-3 font-semibold">
                        Requisitos cumpridos
                      </th>
                      <th className="border-b border-white/25 py-2 pr-3 font-semibold">
                        Mulher
                      </th>
                      <th className="border-b border-white/25 py-2 font-semibold">
                        Homem
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {IDADES_TRANSICAO.map(linha => (
                      <tr
                        key={linha.periodo}
                        style={
                          linha.destaque
                            ? { backgroundColor: "rgba(0,174,239,0.18)" }
                            : undefined
                        }
                      >
                        <td
                          className="border-b border-white/15 py-3 pr-3"
                          style={
                            linha.destaque
                              ? {
                                  borderLeft: `4px solid ${C.ciano}`,
                                  paddingLeft: "10px",
                                }
                              : undefined
                          }
                        >
                          {linha.periodo}
                        </td>
                        <td className="border-b border-white/15 py-3 pr-3">
                          {linha.mulher}
                        </td>
                        <td className="border-b border-white/15 py-3">
                          {linha.homem}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[17px] leading-relaxed opacity-90">
                Exige 25 anos de contribuição e 25 anos de efetivo exercício
                como agente. Cada ano a mais, além dos 25, reduz 1 ano da idade,
                até o limite de 5 anos. Exemplo: uma ACS com 50 anos de idade e
                25 anos de efetivo exercício em novembro de 2026 já cumpre os
                requisitos.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- o que mudou */}
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="O que mudou" />
            <Titulo texto="Três caminhos para se aposentar como ACS ou ACE" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              A emenda criou uma regra definitiva e duas regras de transição.
              Quem já trabalhava como agente em 16/10/2026 pode usar a que
              chegar primeiro. As regras valem tanto para quem está no regime
              próprio do município quanto para os filiados ao Regime Geral de
              Previdência Social (RGPS), ou seja, quem contribui para o INSS.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {CAMINHOS.map(caminho => (
                <article
                  key={caminho.titulo}
                  className="rounded-xl border border-black/5 bg-white p-6 shadow-sm"
                  style={{ borderTop: `4px solid ${C.ciano}` }}
                >
                  <h3
                    className="text-[19px] font-semibold leading-snug"
                    style={{ color: C.chumbo, fontFamily: "Sora, sans-serif" }}
                  >
                    {caminho.titulo}
                  </h3>
                  <p
                    className="mt-3 text-[20px] font-semibold"
                    style={{ color: C.medio, fontFamily: "Sora, sans-serif" }}
                  >
                    {caminho.numeros}
                  </p>
                  <p className="mt-3 text-[17px] leading-relaxed">
                    {caminho.texto}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-[17px]">
              Antes da EC 140, o agente seguia a regra geral:{" "}
              <s className="decoration-2">62 anos (mulher) e 65 anos (homem)</s>
            </p>
            <FonteTramitacao className="mt-3" />
          </div>
        </section>

        {/* ----------------------------------------------------- simulador */}
        <section
          id="simulador"
          className="scroll-mt-24 bg-white py-12 md:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="Simulador" />
            <Titulo texto="Em que ano você pode se aposentar?" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              Preencha com números aproximados. A conta compara a transição por
              idade e a transição por pontos e mostra a que chega primeiro,
              supondo que você continue trabalhando como agente.
            </p>
            <p
              className="texto-pequeno mt-2 text-[15px] leading-relaxed"
              style={{ color: C.medio }}
            >
              O simulador funciona só no seu navegador. Nenhum dado é enviado ou
              guardado.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-7">
                <fieldset>
                  <legend
                    className="text-[17px] font-semibold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Você é:
                  </legend>
                  <div className="mt-3 flex gap-3">
                    {(["mulher", "homem"] as Sexo[]).map(opcao => (
                      <button
                        key={opcao}
                        type="button"
                        onClick={() => setSexo(opcao)}
                        aria-pressed={sexo === opcao}
                        className="min-h-12 flex-1 rounded-lg border-2 px-4 text-[17px] font-semibold"
                        style={
                          sexo === opcao
                            ? {
                                borderColor: C.medio,
                                backgroundColor: C.medio,
                                color: "#fff",
                              }
                            : {
                                borderColor: "#C9D3DB",
                                backgroundColor: "#fff",
                                color: C.chumbo,
                              }
                        }
                      >
                        {opcao === "mulher" ? "Mulher" : "Homem"}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="idade"
                    className="text-[17px] font-semibold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Sua idade hoje
                  </label>
                  <input
                    id="idade"
                    type="number"
                    min={18}
                    max={80}
                    value={idade}
                    onChange={e => setIdade(Number(e.target.value))}
                    className="mt-2 min-h-12 w-full rounded-lg border-2 border-[#C9D3DB] bg-white px-4 text-[17px]"
                    style={{ color: C.chumbo }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="exercicio"
                    className="text-[17px] font-semibold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Anos como ACS ou ACE
                  </label>
                  <input
                    id="exercicio"
                    type="number"
                    min={0}
                    max={60}
                    value={exercicio}
                    onChange={e => setExercicio(Number(e.target.value))}
                    className="mt-2 min-h-12 w-full rounded-lg border-2 border-[#C9D3DB] bg-white px-4 text-[17px]"
                    style={{ color: C.chumbo }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contribuicao"
                    className="text-[17px] font-semibold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Anos de contribuição no total
                  </label>
                  <input
                    id="contribuicao"
                    type="number"
                    min={0}
                    max={70}
                    value={contribuicao}
                    onChange={e => setContribuicao(Number(e.target.value))}
                    className="mt-2 min-h-12 w-full rounded-lg border-2 border-[#C9D3DB] bg-white px-4 text-[17px]"
                    style={{ color: C.chumbo }}
                  />
                  <p
                    className="texto-pequeno mt-2 text-[15px]"
                    style={{ color: C.medio }}
                  >
                    Some o tempo como agente com outros empregos e carnês do
                    INSS.
                  </p>
                </div>

                <fieldset>
                  <legend
                    className="text-[17px] font-semibold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Para onde vai o seu desconto previdenciário?
                  </legend>
                  <div className="mt-3 space-y-2">
                    {REGIMES.map(opcao => (
                      <label
                        key={opcao.valor}
                        className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 bg-white px-4 py-2.5 text-[17px]"
                        style={{
                          borderColor:
                            regime === opcao.valor ? C.medio : "#C9D3DB",
                        }}
                      >
                        <input
                          type="radio"
                          name="regime"
                          value={opcao.valor}
                          checked={regime === opcao.valor}
                          onChange={() => setRegime(opcao.valor)}
                          className="h-5 w-5"
                        />
                        {opcao.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend
                    className="text-[17px] font-semibold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    Seu vínculo hoje:
                  </legend>
                  <div className="mt-3 space-y-2">
                    {VINCULOS.map(opcao => (
                      <label
                        key={opcao.valor}
                        className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 bg-white px-4 py-2.5 text-[17px]"
                        style={{
                          borderColor:
                            vinculo === opcao.valor ? C.medio : "#C9D3DB",
                        }}
                      >
                        <input
                          type="radio"
                          name="vinculo"
                          value={opcao.valor}
                          checked={vinculo === opcao.valor}
                          onChange={() => setVinculo(opcao.valor)}
                          className="h-5 w-5"
                        />
                        {opcao.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div
                className="h-fit rounded-xl p-6 md:p-7"
                style={{
                  backgroundColor: C.fundo,
                  border: `1px solid #DCE4EA`,
                }}
              >
                <p
                  className="text-[12.5px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: C.medio, fontFamily: "Sora, sans-serif" }}
                >
                  Estimativa
                </p>

                <div aria-live="polite" className="mt-3">
                  {jaAposentado ? (
                    <p className="text-[18px] leading-relaxed">
                      A EC 140 prevê revisão para quem já se aposentou. Envie
                      seus dados ao escritório para conferirmos se a sua
                      aposentadoria pode ser revista.
                    </p>
                  ) : (
                    <>
                      <p
                        className="text-[46px] font-semibold leading-none"
                        style={{
                          color: C.chumbo,
                          fontFamily: "Sora, sans-serif",
                        }}
                      >
                        {primeiroAno === null
                          ? "—"
                          : primeiroAno === ANO_INICIAL
                            ? "Agora"
                            : primeiroAno}
                      </p>
                      <p className="mt-4 text-[17px] leading-relaxed">
                        {primeiroAno === null
                          ? "Com esses números, as regras de transição não fecham no período simulado. Um histórico de contribuições mais detalhado pode mudar a conta."
                          : primeiroAno === ANO_INICIAL
                            ? `Pela estimativa, você pode já reunir os requisitos pela ${regraVencedora}. Vale conferir os documentos antes de fazer o pedido.`
                            : `Pela estimativa, a primeira regra que fecha é a ${regraVencedora}, em ${primeiroAno}, aos ${idadeVencedora} anos.`}
                      </p>
                      <div className="mt-5 space-y-1.5 border-t border-black/10 pt-5">
                        {linhaRegra(
                          "Transição por idade",
                          estimativa.anoIdade,
                          estimativa.anosIdade
                        )}
                        {linhaRegra(
                          "Transição por pontos",
                          estimativa.anoPontos,
                          estimativa.anosPontos
                        )}
                      </div>
                    </>
                  )}
                </div>

                {vinculo === "temporario" && (
                  <p
                    className="mt-5 border-l-4 pl-3 text-[16px] leading-relaxed"
                    style={{ borderColor: C.ciano }}
                  >
                    A emenda obriga os municípios a efetivar agentes temporários
                    até 31/12/2028. Isso pode mudar o seu regime e a contagem do
                    tempo.
                  </p>
                )}

                <p className="texto-pequeno mt-5 text-[15px] leading-relaxed">
                  Conta aproximada, em anos inteiros. O direito real depende do
                  cálculo em dias, dos documentos de tempo de serviço e do seu
                  regime de previdência.
                </p>

                <BotaoWhatsApp
                  href={whatsapp(mensagemSimulacao)}
                  className="mt-6 w-full"
                >
                  Enviar esta simulação ao escritório
                </BotaoWhatsApp>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- quem tem direito */}
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="Quem tem direito" />
            <Titulo texto="A regra vale para quem trabalha na ponta do SUS" />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
              <ul className="space-y-3.5">
                {QUEM_TEM_DIREITO.map(item => (
                  <li
                    key={item}
                    className="flex gap-3 text-[17px] leading-relaxed"
                  >
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3
                  className="text-[19px] font-semibold"
                  style={{ color: C.chumbo, fontFamily: "Sora, sans-serif" }}
                >
                  Tempo que também conta
                </h3>
                <p className="mt-3 text-[17px] leading-relaxed">
                  A emenda manda contar como tempo de atividade o período de
                  readaptação por acidente de trabalho, doença profissional ou
                  doença do trabalho, e o afastamento para mandato em sindicato
                  ou associação da categoria. O agente readaptado não perde a
                  contagem dos 25 anos.
                </p>
                <p className="texto-pequeno mt-3 text-[15px] leading-relaxed">
                  Esses períodos costumam ficar de fora dos registros da
                  prefeitura. Conferir antes de pedir a aposentadoria evita
                  indeferimento e perda de valor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- valor e cálculo */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="Valor da aposentadoria" />
            <Titulo texto="Integralidade e paridade para quem já estava na função" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              Para quem já era agente na data da emenda, a aposentadoria pode
              corresponder à remuneração do cargo e ser reajustada junto com a
              dos agentes em atividade. O caminho muda conforme o regime.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article
                className="rounded-xl border border-black/5 p-6"
                style={{ backgroundColor: C.fundo }}
              >
                <h3
                  className="text-[18px] font-semibold"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Regime próprio (instituto do município)
                </h3>
                <p className="mt-3 text-[17px] leading-relaxed">
                  Integralidade e paridade para quem ingressou em cargo efetivo
                  até 16/10/2026 e não aderiu à previdência complementar. A base
                  é o vencimento do cargo com as vantagens permanentes.
                </p>
              </article>
              <article
                className="rounded-xl border border-black/5 p-6"
                style={{ backgroundColor: C.fundo }}
              >
                <h3
                  className="text-[18px] font-semibold"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Regime Geral (RGPS), para quem contribui para o INSS
                </h3>
                <p className="mt-3 text-[17px] leading-relaxed">
                  O INSS concede a aposentadoria, limitada ao teto do INSS. A
                  União paga um benefício extraordinário que cobre a diferença
                  até a remuneração integral do cargo, com paridade.
                </p>
              </article>
            </div>
            <div
              className="mt-6 rounded-xl border-l-4 p-6"
              style={{ borderColor: C.ciano, backgroundColor: C.fundo }}
            >
              <h3
                className="text-[18px] font-semibold"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                O que entra no cálculo
              </h3>
              <p className="mt-3 text-[17px] leading-relaxed">
                A emenda considera remuneração o vencimento e as vantagens
                permanentes do cargo, somados aos adicionais de caráter
                individual e às vantagens pessoais permanentes. O adicional de
                insalubridade também passa a compor a base. Antes do pedido,
                vale conferir nas fichas financeiras se insalubridade, triênios
                e outras verbas estão entrando na contribuição.
              </p>
            </div>
            <FonteTramitacao className="mt-4" />
          </div>
        </section>

        {/* --------------------------------------------------------- invalidez */}
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="Afastamento e invalidez" />
            <Titulo texto="Aposentadoria por incapacidade com integralidade quando a doença vem do trabalho" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              Longas caminhadas, sol e contato com doenças fazem parte da rotina
              do agente. Quando a incapacidade permanente decorre de acidente de
              trabalho, doença profissional ou doença do trabalho, a EC 140
              garante integralidade e paridade. Pela regra geral, o valor seria
              calculado sobre 60% da média das contribuições.
            </p>
            <p className="texto-pequeno mt-3 max-w-3xl text-[15px] leading-relaxed">
              Para isso, é preciso demonstrar a ligação entre a doença e o
              trabalho, com laudos médicos e a Comunicação de Acidente de
              Trabalho (CAT), quando houver.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- temporário */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="Vínculo precário" />
            <Titulo texto="Trabalha como agente com contrato temporário?" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              A EC 140 proíbe a contratação temporária ou terceirizada de ACS e
              ACE, salvo em emergência de saúde pública. Os municípios devem
              efetivar, até 31 de dezembro de 2028, os agentes que ingressaram
              por processo seletivo público após 14 de fevereiro de 2006. A
              efetivação define o seu regime de previdência e a forma como o
              tempo de serviço será contado para a aposentadoria.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- já aposentados */}
        <section
          className="py-12 text-white md:py-16"
          style={{ backgroundColor: C.escuro }}
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <p
              className="text-[12.5px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: C.ciano, fontFamily: "Sora, sans-serif" }}
            >
              Já aposentado
            </p>
            <h2
              className="mt-3 text-[27px] font-semibold leading-snug md:text-[34px]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Já se aposentou como ACS ou ACE? A emenda prevê revisão
            </h2>
            <p className="mt-5 max-w-3xl text-[18px] leading-relaxed opacity-95">
              Quem se aposentou até a promulgação da EC 140 tem direito à
              revisão do valor no regime próprio, para receber com base na
              remuneração integral e não mais pela média. Quem é filiado ao
              RGPS, ou seja, aposentado pelo INSS, tem direito ao benefício
              extraordinário pago pela União.
            </p>
            <p
              className="mt-6 max-w-3xl border-l-4 pl-4 text-[17px] leading-relaxed"
              style={{ borderColor: C.ciano }}
            >
              A emenda não permite o pagamento de atrasados anteriores à
              promulgação. O aumento vale para as parcelas mensais daqui para a
              frente. Conferir agora como a sua aposentadoria foi calculada é o
              primeiro passo.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- documentos */}
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Chamada texto="Documentos" />
            <Titulo texto="O que separar para a primeira análise" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              Não precisa ter tudo. Com o extrato do CNIS e um contracheque já
              dá para começar. Os documentos podem ser enviados pelo WhatsApp,
              sem precisar ir ao escritório.
            </p>
            <ul className="mt-7 grid gap-3 md:grid-cols-2">
              {DOCUMENTOS.map(item => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-black/5 bg-white px-4 py-3 text-[17px] leading-relaxed"
                >
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------- como trabalhamos */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Titulo texto="Do primeiro contato ao pedido de aposentadoria" />
            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {ETAPAS.map((etapa, indice) => (
                <li
                  key={etapa.titulo}
                  className="rounded-xl border border-black/5 p-5"
                  style={{ backgroundColor: C.fundo }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[17px] font-semibold text-white"
                    style={{
                      backgroundColor: C.medio,
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {indice + 1}
                  </span>
                  <h3
                    className="mt-4 text-[18px] font-semibold leading-snug"
                    style={{ color: C.chumbo, fontFamily: "Sora, sans-serif" }}
                  >
                    {etapa.titulo}
                  </h3>
                  <p className="mt-2 text-[17px] leading-relaxed">
                    {etapa.texto}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[17px] leading-relaxed">
              Todas as etapas podem ser feitas de forma virtual, de qualquer
              cidade do Paraná.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-4xl px-4">
            <Titulo texto="Dúvidas sobre a aposentadoria de ACS e ACE" />
            <div className="mt-8 divide-y divide-black/10 border-y border-black/10 bg-white">
              {PERGUNTAS.map((item, i) => {
                const ativa = aberta === i;
                return (
                  <div key={item.pergunta}>
                    <button
                      type="button"
                      onClick={() => setAberta(ativa ? null : i)}
                      aria-expanded={ativa}
                      aria-controls={`acs-faq-resposta-${i}`}
                      id={`acs-faq-pergunta-${i}`}
                      className="flex min-h-12 w-full items-start justify-between gap-5 px-5 py-5 text-left"
                    >
                      <span
                        className="text-[18px] font-semibold leading-snug"
                        style={{
                          color: C.chumbo,
                          fontFamily: "Sora, sans-serif",
                        }}
                      >
                        {item.pergunta}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[17px] font-semibold"
                        style={{ backgroundColor: C.fundo, color: C.medio }}
                      >
                        {ativa ? "−" : "+"}
                      </span>
                    </button>
                    <p
                      id={`acs-faq-resposta-${i}`}
                      aria-labelledby={`acs-faq-pergunta-${i}`}
                      hidden={!ativa}
                      className="max-w-3xl px-5 pb-6 text-[17px] leading-relaxed"
                    >
                      {item.resposta}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ chamada final */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <Titulo texto="Descubra qual regra vale para você" />
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed">
              Mande uma mensagem com sua idade, o tempo como agente e o
              município onde trabalha. A equipe do escritório retorna com os
              próximos passos. Atendemos em Maringá e de forma virtual em todo o
              Paraná.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <BotaoWhatsApp href={LINK_WHATSAPP}>
                Conversar pelo WhatsApp
              </BotaoWhatsApp>
              <div className="text-[17px] leading-relaxed">
                <p className="select-all">{SITE.whatsappExibicao}</p>
                <p className="select-all">{SITE.email}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------ rodapé */}
      <footer
        className="py-12 text-white"
        style={{ backgroundColor: C.chumbo }}
      >
        <div className="mx-auto w-full max-w-6xl space-y-4 px-4 text-[17px] leading-relaxed">
          <p
            className="text-[19px] font-semibold"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Santana Daufenbach Advocacia Previdenciária
          </p>
          <p>
            Responsável técnico: João Luiz Santana Daufenbach · OAB/PR 66.208
          </p>
          <p>
            Av. João Paulino Vieira Filho, 625, sala 708, torre 2 · Maringá/PR ·
            CEP 87020-015
          </p>
          <p>
            Fonte das informações sobre a EC 140/2026:{" "}
            <a
              href={FONTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: "#8FD8F7" }}
            >
              Tramitação Inteligente
            </a>
          </p>
          <p className="texto-pequeno max-w-4xl text-[15.5px] opacity-90">
            Aviso: Conteúdo informativo, de acordo com o Provimento nº 205/2021
            do Conselho Federal da OAB. As informações desta página não
            substituem a análise individual do caso. Dados pessoais enviados
            pelo WhatsApp são usados apenas para o atendimento, nos termos da
            LGPD.
          </p>
          <p>
            <a
              href="/privacidade"
              className="underline underline-offset-2"
              style={{ color: "#8FD8F7" }}
            >
              Política de Privacidade
            </a>
            {" · "}
            <a
              href="/"
              className="underline underline-offset-2"
              style={{ color: "#8FD8F7" }}
            >
              Página inicial do escritório
            </a>
          </p>
        </div>
      </footer>

      {/* Barra fixa do celular */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white p-3 sm:hidden"
        style={{
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <a
          href={LINK_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 w-full items-center justify-center rounded-lg text-[17px] font-semibold text-white"
          style={{ backgroundColor: C.verde, fontFamily: "Sora, sans-serif" }}
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
