import {
  CalendarClock,
  Calculator,
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
  { label: "Revisão de aposentadoria" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "O cálculo que gerou o benefício",
    texto:
      "Qual regra foi aplicada, quais períodos entraram e como o valor foi apurado.",
  },
  {
    titulo: "Os períodos que podem ter ficado de fora",
    texto:
      "Vínculos, tempo com exposição a agentes nocivos e tempo rural frequentemente não são considerados.",
  },
  {
    titulo: "As contribuições posteriores à concessão",
    texto:
      "Nem sempre alteram o valor do benefício já concedido.",
  },
  {
    titulo: "A data de início e a correção dos valores",
    texto:
      "O efeito financeiro da revisão depende da data e do prazo.",
  },
  {
    titulo: "Os limites de tempo para revisar",
    texto:
      "A revisão tem limites temporais que precisam ser conferidos antes de qualquer pedido.",
  },
  {
    titulo: "Se a revisão é vantajosa",
    texto:
      "Aumentar o tempo de contribuição nem sempre aumenta o valor; a simulação vem antes.",
  },
];

const PONTOS = [
  {
    icone: Calculator,
    titulo: "Pedir revisão sem simular o resultado",
    problema: "Há revisões que reduzem o benefício;",
    fazemos:
      "Simulamos o efeito antes de qualquer pedido e só prosseguimos quando há ganho.",
  },
  {
    icone: CalendarClock,
    titulo: "Perder o prazo de revisão",
    problema: "Existem limites temporais para revisar, e eles correm;",
    fazemos: "Conferimos os prazos no primeiro contato.",
  },
  {
    icone: FileSearch,
    titulo: "Confundir revisão com correção de valores atrasados",
    problema: "São medidas diferentes, com efeitos diferentes;",
    fazemos:
      "Explicamos o que cada caminho alcança no seu caso.",
  },
  {
    icone: Landmark,
    titulo: "Deixar de considerar o tempo especial não reconhecido",
    problema: "Períodos com exposição podem ter ficado fora do cálculo;",
    fazemos:
      "Examinamos o histórico de trabalho e a documentação técnica disponível.",
  },
  {
    icone: FileWarning,
    titulo: "Contratar a revisão e descobrir depois que o valor cai",
    problema: "Sem simulação, o risco fica com o segurado;",
    fazemos:
      "Apresentamos o cenário calculado antes da contratação.",
  },
];

const DOCUMENTOS = [
  "Carta de concessão do benefício.",
  "Extrato de pagamento.",
  "Extrato de contribuições (CNIS).",
  "Documentos do processo administrativo.",
  "PPP e documentos de exposição.",
  "Carteiras de trabalho e comprovantes de períodos antigos.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Como saber se vale a pena revisar?",
    resposta:
      "A revisão pode ser analisada quando há indício de erro no cálculo ou de período não considerado. A decisão depende da comparação entre o cálculo original, os períodos comprováveis e o efeito financeiro.",
  },
  {
    pergunta: "Existe prazo para revisar?",
    resposta:
      "Existe um limite temporal para algumas revisões. Conferimos esse limite e a data de início do benefício antes de indicar se o pedido pode ser analisado.",
  },
  {
    pergunta: "O INSS pode reduzir o meu benefício?",
    resposta:
      "Pode, dependendo da revisão e do que for encontrado no cálculo. Por isso simulamos o efeito antes de qualquer pedido e explicamos o cenário identificado.",
  },
  {
    pergunta: "Preciso do processo original?",
    resposta:
      "O processo original ajuda a entender quais documentos foram considerados e como o cálculo foi feito. Se você não o tiver, indicamos como localizar os registros necessários para a análise.",
  },
  {
    pergunta: "A revisão vale para quem já recebe há muitos anos?",
    resposta:
      "Pode ser analisada, mas os documentos antigos, os limites temporais e o histórico do benefício precisam ser conferidos antes de qualquer pedido.",
  },
];

export default function RevisaoDeAposentadoria() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Revisão de aposentadoria: o que conferir antes de pedir"
        descricao="Já recebe aposentadoria? Entenda o que precisa ser conferido no cálculo, nos períodos de contribuição e nos documentos antes de analisar uma revisão."
        caminho="/revisao-de-aposentadoria"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/revisao-de-aposentadoria" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Revisão de aposentadoria: o que conferir antes de pedir"
        pergunta="Já recebe a aposentadoria e quer conferir o cálculo?"
        linhas={[
          "A revisão começa pela leitura do processo que concedeu o benefício: qual regra foi aplicada e quais períodos entraram no cálculo.",
          "Nem toda revisão aumenta o valor, e algumas podem reduzir. Por isso a conferência vem antes do pedido.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.revisao}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos ajudam a entender o cálculo original e a simular se a revisão pode ser vantajosa antes de qualquer pedido."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise começa pela carta de concessão, pelo processo administrativo
            e pelo histórico de contribuições. Se algum documento não estiver
            disponível, indicamos como localizá-lo antes de concluir a simulação.
            Referência conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="Estes são os pontos que precisam ser conferidos antes de pedir uma revisão — especialmente quando o cálculo envolve períodos antigos ou documentação técnica."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre revisão de aposentadoria"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Quer conferir o cálculo da sua aposentadoria?"
        texto="Envie a carta de concessão ou o extrato do benefício. Simulamos o efeito da revisão antes de indicar qualquer pedido."
        mensagem={WHATSAPP_MENSAGENS.revisao}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
