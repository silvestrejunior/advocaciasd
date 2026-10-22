import {
  CalendarClock,
  Clock,
  FileSearch,
  FileWarning,
  Landmark,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp, Perguntas, TituloSecao } from "@/components/site/Sections";
import {
  ChamadaFinal,
  ComoComecaAtendimento,
  DuvidasAntesDeContratar,
  DocumentosQueAjudam,
  FaixaEscritorio,
  HeroServico,
  OQueAnalisar,
  PontosDeAtencao,
  SeoServico,
} from "@/components/site/Servico";
import { breadcrumbJsonLd, faqJsonLd } from "@/components/site/Seo";
import { REVISAO_CONTEUDO, type PerguntaFrequente } from "@/data/previdenciario";
import { WHATSAPP_MENSAGENS } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Perdeu o benefício" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "O motivo escrito da cessação ou suspensão",
    texto:
      "É o primeiro documento a ler, e indica o que o INSS considerou não cumprido.",
  },
  {
    titulo: "Se houve falha na convocação",
    texto:
      "Muitas cessações decorrem de perícia ou revisão que o segurado não foi chamado a fazer.",
  },
  {
    titulo: "A diferença entre suspensão e cessação",
    texto:
      "O que volta automaticamente e o que depende de medida administrativa ou judicial.",
  },
  {
    titulo: "O prazo para reagir",
    texto:
      "A defesa e o recurso administrativo têm prazos próprios, contados da ciência da decisão.",
  },
  {
    titulo: "O que foi pago e pode ser cobrado",
    texto:
      "Quando há cobrança de valores, a discussão é própria e precisa ser tratada separadamente.",
  },
  {
    titulo: "Se o restabelecimento vale desde a data da cessação",
    texto:
      "O efeito financeiro depende do motivo e da medida adotada.",
  },
];

const PONTOS = [
  {
    icone: CalendarClock,
    titulo: "Deixar de comparecer à perícia ou à revisão",
    problema: "A ausência costuma gerar suspensão automática;",
    fazemos:
      "Verificamos se a convocação existiu e se foi recebida, e indicamos a medida cabível.",
  },
  {
    icone: FileSearch,
    titulo: "Não localizar a convocação enviada por sistema",
    problema: "Avisos no aplicativo ou no extrato passam despercebidos;",
    fazemos:
      "Reconstituímos o histórico do benefício para identificar onde a comunicação apareceu.",
  },
  {
    icone: Clock,
    titulo: "Perder o prazo de defesa e recurso",
    problema:
      "O prazo corre da ciência da decisão e não espera a reunião de documentos;",
    fazemos:
      "Conferimos a data e o prazo no primeiro contato e indicamos o que fazer antes que se esgote.",
  },
  {
    icone: FileWarning,
    titulo: "Receber cobrança de valores e não discutir",
    problema:
      "A cobrança pode ser indevida ou ter origem em erro de análise;",
    fazemos:
      "Examinamos a origem dos valores e as formas de discutir a cobrança.",
  },
  {
    icone: Landmark,
    titulo: "Pedir benefício novo em vez de restabelecer o que havia",
    problema:
      "Um pedido novo costuma ter efeito financeiro pior do que o restabelecimento;",
    fazemos:
      "Comparamos as duas alternativas antes de agir.",
  },
];

const DOCUMENTOS = [
  "Carta de cessação ou suspensão.",
  "Histórico do benefício e extratos de pagamento.",
  "Protocolos e números de processo.",
  "Laudos e exames recentes, quando o motivo for incapacidade.",
  "Extrato de contribuições (CNIS).",
  "Comprovantes de convocação ou de ausência.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Meu benefício foi suspenso por não comparecer à perícia. E agora?",
    resposta:
      "Primeiro, conferimos se houve convocação, como a comunicação apareceu e se existe justificativa para a ausência. A partir disso, pode ser analisada a medida administrativa ou judicial cabível para discutir a suspensão.",
  },
  {
    pergunta: "Perdi o prazo. Ainda dá para fazer algo?",
    resposta:
      "Pode haver alternativas, mas depende da data em que você tomou ciência, do motivo da decisão e do que ainda pode ser comprovado. Conferimos o histórico antes de indicar o caminho.",
  },
  {
    pergunta: "O INSS pode cobrar o que pagou?",
    resposta:
      "Pode haver cobrança, mas a origem dos valores e a forma de cálculo precisam ser examinadas. A discussão da cobrança é tratada separadamente do pedido de restabelecimento.",
  },
  {
    pergunta: "Quanto tempo leva para voltar?",
    resposta:
      "Depende do motivo da interrupção e da via escolhida. O atendimento informa o que pode ser feito e quais etapas existem, sem prometer prazo ou resultado.",
  },
  {
    pergunta: "Preciso de advogado para restabelecer?",
    resposta:
      "Nem sempre. O próprio segurado pode buscar atendimento no INSS, mas a necessidade de apoio depende do motivo, dos documentos e dos prazos. A análise indica se o caso exige atuação profissional.",
  },
];

export default function PerdeuOBeneficio() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Perdeu o benefício: o que fazer"
        descricao="Seu benefício foi cessado ou suspenso? Entenda o que pode ser analisado, quais documentos ajudam e quais caminhos dependem do motivo da decisão do INSS."
        caminho="/perdeu-o-beneficio"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/perdeu-o-beneficio" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Perdeu o benefício: o que fazer quando o pagamento para"
        pergunta="O seu benefício foi cessado ou suspenso?"
        linhas={[
          "A cessação raramente acontece sem motivo registrado: a carta ou o extrato indicam o que o INSS considerou.",
          "O caminho depende de entender se houve falha na convocação, revisão não realizada ou decisão sobre o benefício.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.beneficio}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos ajudam a separar o problema de comunicação, a discussão do benefício e eventual cobrança antes de escolher a medida."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise é feita a partir da comunicação que informou a cessação ou
            suspensão e dos registros do benefício. Se você não tiver a carta, é
            possível consultar o histórico nos sistemas do INSS durante o
            atendimento. Referência conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="Estes são os pontos que costumam exigir mais atenção quando o pagamento para — e que devem ser conferidos antes de escolher como agir."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre o benefício interrompido"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos entender por que o benefício parou?"
        texto="Envie a carta, o extrato ou o motivo informado pelo INSS. Explicamos o que precisa ser conferido e quais caminhos podem ser analisados."
        mensagem={WHATSAPP_MENSAGENS.beneficio}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
