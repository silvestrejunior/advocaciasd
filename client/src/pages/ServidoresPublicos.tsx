import {
  Building2,
  CalendarClock,
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
  { label: "Servidores públicos" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "Se o cargo é efetivo e qual o regime aplicável",
    texto:
      "O regime próprio municipal, estadual ou federal tem regras próprias. Primeiro é preciso identificar qual sistema de previdência se aplica ao cargo.",
  },
  {
    titulo: "O tempo de serviço público e o tempo de contribuição",
    texto:
      "São contados de formas diferentes e produzem efeitos diferentes. A análise separa os períodos para não misturar os requisitos.",
  },
  {
    titulo: "O tempo anterior em outros regimes",
    texto:
      "Períodos no INSS ou em outro ente podem ser averbados, isto é, registrados no regime atual. A documentação precisa comprovar cada período.",
  },
  {
    titulo: "A regra aplicável à data de ingresso",
    texto:
      "Quem ingressou antes ou depois das reformas tem caminhos distintos. A comparação entre eles muda a data possível de aposentadoria.",
  },
  {
    titulo: "A compensação previdenciária entre os regimes",
    texto:
      "A compensação previdenciária organiza o acerto entre os regimes. Parte do trabalho é do ente e parte depende do segurado, e isso afeta o andamento.",
  },
  {
    titulo: "Os documentos funcionais",
    texto:
      "Ficha financeira, certidão de tempo de contribuição, atos de nomeação, exoneração e licenças ajudam a reconstituir o histórico funcional.",
  },
];

const PONTOS = [
  {
    icone: Landmark,
    titulo: "Contar tempo comum como tempo de serviço público",
    problema:
      "Os dois tempos têm efeitos diferentes, e a confusão pode adiar a aposentadoria.",
    fazemos:
      "Separamos cada período e mostramos o efeito de cada um antes de qualquer pedido.",
  },
  {
    icone: FileSearch,
    titulo: "Averbar tempo sem conferir a documentação funcional",
    problema:
      "Certidões incompletas ou divergentes travam o processo no órgão.",
    fazemos:
      "Conferimos os documentos antes de protocolar e apontamos o que precisa ser corrigido.",
  },
  {
    icone: CalendarClock,
    titulo: "Abono de permanência pedido fora do tempo",
    problema:
      "O abono tem requisitos próprios e pode ser perdido por falta de pedido no momento certo.",
    fazemos:
      "Verificamos se os requisitos estão preenchidos e o que ainda falta demonstrar.",
  },
  {
    icone: Building2,
    titulo: "Regime próprio sem análise das regras de transição",
    problema:
      "O caminho mais vantajoso pode não ser o mais evidente.",
    fazemos:
      "Comparamos as regras aplicáveis e as datas em que cada uma se torna possível.",
  },
  {
    icone: FileWarning,
    titulo: "Acumulação de cargos e de regimes",
    problema:
      "Quem acumulou cargos ou regimes precisa de análise específica.",
    fazemos:
      "Examinamos o histórico completo e explicamos as consequências de cada escolha.",
  },
];

const DOCUMENTOS = [
  "Certidão de tempo de contribuição, documento que comprova períodos em outro regime.",
  "Ficha financeira do órgão público.",
  "Atos de nomeação, exoneração e aposentadoria de outros cargos.",
  "Extrato de contribuições (CNIS, registro dos vínculos e recolhimentos no INSS).",
  "Contracheques.",
  "Documentos de licenças e afastamentos.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Sou servidor municipal. O escritório atende?",
    resposta:
      "Sim. O atendimento pode começar à distância, e a análise considera o regime de previdência do município, os documentos funcionais e o histórico completo. A aplicação das regras depende do ente ao qual você está vinculado.",
  },
  {
    pergunta: "Posso somar o tempo do INSS?",
    resposta:
      "Pode ser possível por contagem recíproca, que é o aproveitamento de tempo entre regimes. Em geral, isso depende da Certidão de Tempo de Contribuição e da conferência de onde esse período será usado.",
  },
  {
    pergunta: "Preciso pedir a certidão de tempo antes?",
    resposta:
      "Não necessariamente. Podemos orientar a busca da certidão de tempo de contribuição, documento que comprova os períodos no regime de origem. O pedido e o conteúdo da certidão dependem do histórico funcional.",
  },
  {
    pergunta: "Quanto tempo leva o processo no órgão?",
    resposta:
      "Depende do órgão, dos documentos e das correções necessárias. O andamento pode variar conforme o regime e a análise administrativa. Explicamos as etapas e o que depende do segurado.",
  },
  {
    pergunta: "O abono de permanência é automático?",
    resposta:
      "Depende das regras do regime e da forma como o ente processa o pedido. Primeiro verificamos se os requisitos estão preenchidos e quais documentos o órgão exige.",
  },
];

export default function ServidoresPublicos() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Aposentadoria de servidor público: o que precisa ser analisado"
        descricao="Servidor efetivo não se aposenta pelo INSS. Entenda o que analisamos no regime próprio, no histórico funcional e nos períodos que podem ser averbados."
        caminho="/servidores-publicos"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/servidores-publicos" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Aposentadoria de servidor público: o que precisa ser analisado"
        pergunta="É servidor efetivo e quer entender o seu regime de previdência?"
        linhas={[
          "Servidor efetivo não se aposenta pelo INSS: cada ente tem o seu regime próprio, com regras e prazos diferentes.",
          "O trabalho começa pela leitura do histórico funcional e pela conferência do tempo que pode ser averbado.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.servidor}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos ajudam a separar o regime correto, os períodos aproveitáveis e os documentos que sustentam o pedido."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise parte do histórico funcional e dos documentos do regime
            próprio, o sistema de previdência do ente público. Quando há tempo em
            outro regime, conferimos a certidão de tempo de contribuição e a forma
            de averbação, que é o registro desse tempo no regime atual. Referência
            conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="Estes são pontos que costumam gerar divergências no histórico funcional — e que pedem conferência antes de qualquer pedido."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre servidores públicos"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos analisar o seu histórico funcional?"
        texto="Envie o que você já tem e explique o seu vínculo com o serviço público. Indicamos o que precisa ser conferido e quais documentos podem ajudar."
        mensagem={WHATSAPP_MENSAGENS.servidor}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
