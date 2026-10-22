import {
  CalendarClock,
  FileSearch,
  FileWarning,
  Landmark,
  Stethoscope,
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
  { label: "Benefícios por incapacidade" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "A data em que a incapacidade começou",
    texto:
      "Define desde quando o benefício pode ser devido e o que já foi pago pelo empregador nos primeiros dias.",
  },
  {
    titulo: "Se a incapacidade é temporária ou permanente",
    texto:
      "Essa distinção muda o benefício e o que a perícia precisa reconhecer no laudo.",
  },
  {
    titulo: "O que o conjunto dos exames mostra",
    texto:
      "A perícia lê laudos, receitas, relatórios e o histórico de afastamentos, não só o diagnóstico.",
  },
  {
    titulo: "A atividade que você exercia",
    texto:
      "A mesma doença pode impedir ou não o trabalho, conforme a função e a exigência física.",
  },
  {
    titulo: "As contribuições e a qualidade de segurado",
    texto:
      "A qualidade de segurado é a manutenção da proteção previdenciária. Períodos sem contribuição podem interromper o direito no momento do pedido.",
  },
  {
    titulo: "O que já foi decidido antes",
    texto:
      "Afastamentos, perícias e pedidos negados anteriores fazem parte da análise.",
  },
];

const PONTOS = [
  {
    icone: FileWarning,
    titulo: "Pedido negado na perícia sem discussão do laudo",
    problema:
      "O laudo administrativo nem sempre reflete o conjunto dos exames. Ele pode não considerar todos os documentos médicos apresentados.",
    fazemos:
      "Confrontamos o laudo com exames, receitas e relatórios e indicamos se há espaço para contestar administrativamente ou na Justiça.",
  },
  {
    icone: CalendarClock,
    titulo: "Afastamento longo sem pedido no tempo certo",
    problema:
      "Períodos sem requerimento podem reduzir os valores devidos e dificultar a definição do início da incapacidade.",
    fazemos:
      "Verificamos as datas de afastamento e de requerimento para preservar o marco mais favorável.",
  },
  {
    icone: FileSearch,
    titulo: "Documentação médica apresentada de forma incompleta",
    problema:
      "Exames antigos, sem CID ou sem indicação de incapacidade enfraquecem o pedido.",
    fazemos:
      "Orientamos quais documentos o caso exige antes da perícia.",
  },
  {
    icone: Landmark,
    titulo: "Perda da qualidade de segurado por período sem contribuição",
    problema:
      "A interrupção das contribuições pode encerrar o direito no momento do pedido.",
    fazemos:
      "Conferimos o histórico e apontamos o que pode ser regularizado.",
  },
  {
    icone: Stethoscope,
    titulo: "Confundir a doença com a incapacidade",
    problema:
      "Ter diagnóstico não significa, por si, estar incapaz para o trabalho.",
    fazemos:
      "Explicamos o que precisa ser comprovado no caso concreto, sem prometer resultado.",
  },
];

const DOCUMENTOS = [
  "Laudos e exames recentes.",
  "Receitas em uso.",
  "Atestados e relatórios com CID (identificação da doença) e período de afastamento.",
  "Carteira de trabalho e extrato de contribuições (CNIS).",
  "Registros de afastamentos anteriores.",
  "Protocolo e número do pedido, se já houver.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Preciso já ter o laudo em mãos?",
    resposta:
      "Não. Você pode começar o atendimento contando o que aconteceu e levando os documentos médicos que já tiver. Se o laudo da perícia já existir, ele ajuda a entender o que foi analisado e quais pontos precisam ser conferidos.",
  },
  {
    pergunta: "A perícia é presencial?",
    resposta:
      "Depende do tipo de pedido e da orientação recebida. Algumas avaliações são presenciais, enquanto outras podem seguir procedimento diferente. Conferimos a convocação e o que o caso exige.",
  },
  {
    pergunta: "A doença precisa estar na lista do INSS?",
    resposta:
      "Não necessariamente. A análise deve considerar a incapacidade para o trabalho, os exames, a atividade exercida e o histórico do segurado. A existência de uma doença, sozinha, não resolve o pedido.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta:
      "Depende da documentação, da necessidade de perícia e do caminho escolhido. Antes de contratar, explicamos o que pode ser feito e a expectativa possível para o seu caso, sem prometer uma data.",
  },
  {
    pergunta: "Se eu já recebo auxílio-doença, preciso fazer algo?",
    resposta:
      "Depende da data indicada, da duração do afastamento, de eventual convocação e da evolução da incapacidade. Pode ser necessário acompanhar uma convocação, apresentar documentos ou avaliar se a incapacidade continua. Esses pontos são conferidos no atendimento.",
  },
];

export default function BeneficiosPorIncapacidade() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Benefícios por incapacidade: o que a perícia analisa"
        descricao="Entenda o que a perícia analisa nos benefícios por incapacidade, quais documentos ajudam e como o caso depende dos exames, do trabalho e do histórico de contribuições."
        caminho="/beneficios-por-incapacidade"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/beneficios-por-incapacidade" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Benefícios por incapacidade: o que a perícia analisa"
        pergunta="Uma doença ou lesão impede você de trabalhar?"
        linhas={[
          "São os benefícios conhecidos como auxílio-doença e aposentadoria por invalidez. O que muda entre eles é se a incapacidade é temporária ou permanente.",
          "O ponto de partida é o que os exames e o histórico de afastamentos mostram, e não apenas o diagnóstico.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.beneficio}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos ajudam a entender o que a perícia precisa reconhecer e quais documentos podem fazer diferença no seu caso."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise considera os documentos médicos, o histórico de trabalho e os
            registros de contribuição. Se ainda faltarem exames ou o laudo da
            perícia, isso pode ser levantado no atendimento. Referência conferida
            em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="A perícia não analisa apenas o nome da doença. Estes são pontos que podem mudar a leitura do pedido e que devem ser conferidos antes de agir."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre os benefícios por incapacidade"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos analisar o seu caso?"
        texto="Conte o que aconteceu e envie os documentos que já tiver. Explicamos o que precisa ser conferido e quais caminhos dependem da sua situação."
        mensagem={WHATSAPP_MENSAGENS.beneficio}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
