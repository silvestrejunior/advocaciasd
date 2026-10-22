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
  { label: "Aposentadoria negada" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "O motivo da negativa, escrito",
    texto:
      "A carta de indeferimento costuma indicar o que faltou. Ler esse motivo antes de recorrer evita repetir exatamente o mesmo erro na instância seguinte.",
  },
  {
    titulo: "O que já existe no processo",
    texto:
      "Vínculos, contribuições, perícias e documentos que o INSS já reuniu. Parte do trabalho é conferir o que o próprio processo já comprova.",
  },
  {
    titulo: "A data em que o direito nasceu",
    texto:
      "É possível que o pedido tenha sido negado por falta de documento, mas o direito existisse desde uma data anterior. Isso muda os valores atrasados.",
  },
  {
    titulo: "O histórico de contribuições",
    texto:
      "Períodos sem baixa, vínculos com data de saída errada e contribuições não recolhidas pelo empregador aparecem com frequência no extrato.",
  },
  {
    titulo: "O prazo do recurso",
    texto:
      "O recurso administrativo tem prazo próprio, contado da ciência da decisão. O prazo é o primeiro item a conferir, antes de qualquer outra providência.",
  },
  {
    titulo: "O que o pedido não discutiu",
    texto:
      "Às vezes o caminho mais rápido não é o recurso, e sim um novo requerimento corretamente instruído. Comparamos as duas alternativas.",
  },
];

const PONTOS = [
  {
    icone: FileWarning,
    titulo: "Recorrer sem ler o motivo da negativa",
    problema:
      "O recurso que apenas repete o pedido original costuma ser indeferido pela mesma razão. A negativa é um documento técnico: ela diz qual requisito o INSS considerou não cumprido.",
    fazemos:
      "Lemos a decisão e identificamos exatamente o requisito apontado, para direcionar o recurso ao ponto que decidiu o caso — ou para concluir que o recurso não é o caminho.",
  },
  {
    icone: CalendarClock,
    titulo: "Deixar passar o prazo",
    problema:
      "O prazo do recurso administrativo corre a partir da ciência da decisão e não espera a reunião de documentos. Perdido o prazo, a discussão passa a depender de outra via.",
    fazemos:
      "Conferimos a data da decisão e o prazo no primeiro contato, e indicamos com clareza o que precisa ser feito antes que ele se esgote.",
  },
  {
    icone: FileSearch,
    titulo: "Repetir o pedido com os mesmos documentos",
    problema:
      "Um novo requerimento instruído com o mesmo conjunto de provas tende a receber a mesma resposta. O que muda o resultado é a prova que faltava — ou a forma de apresentá-la.",
    fazemos:
      "Identificamos qual documento ou qual lacuna decidiu a negativa e trabalhamos especificamente sobre ele, inclusive com retificação de PPP, perícia ou prova complementar.",
  },
  {
    icone: Landmark,
    titulo: "Perder a data de início do benefício",
    problema:
      "A data de início tem efeito financeiro direto: ela define quais parcelas atrasadas são devidas. Um pedido mal conduzido pode custar meses de diferença.",
    fazemos:
      "Verificamos a data em que os requisitos estavam cumpridos e a data do requerimento, para preservar o marco mais favorável possível.",
  },
  {
    icone: Stethoscope,
    titulo: "Aceitar a negativa da perícia sem discutir o laudo",
    problema:
      "O laudo administrativo nem sempre reflete o conjunto dos exames e do histórico do segurado. Quando a prova médica sustenta a incapacidade, a negativa é discutível.",
    fazemos:
      "Confrontamos o laudo com os exames, receitas e relatórios, e indicamos se há espaço para contestar administrativamente ou na Justiça.",
  },
];

const DOCUMENTOS = [
  "A carta de indeferimento ou a decisão que negou o benefício, se você tiver em mãos.",
  "Extrato de contribuições (CNIS), carteira de trabalho e contratos.",
  "Exames, laudos e receitas, quando a negativa envolver incapacidade.",
  "PPP e documentos técnicos do trabalho, quando o assunto envolver exposição a agentes nocivos.",
  "Protocolo, número do pedido e registros de atendimentos anteriores no INSS.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Preciso recorrer dentro do prazo?",
    resposta:
      "O recurso administrativo tem prazo próprio, contado da ciência da decisão, e é o primeiro ponto a conferir. Se o prazo já passou, ainda existem caminhos, mas eles dependem de nova análise.",
  },
  {
    pergunta: "Recorrer ou fazer um novo pedido?",
    resposta:
      "Depende do motivo da negativa. Quando falta um documento que pode ser obtido, o novo requerimento costuma ser mais rápido. Quando o INSS aplicou um critério indevido, o recurso é o caminho. Comparamos as duas opções antes de agir.",
  },
  {
    pergunta: "O escritório garante o resultado do recurso?",
    resposta:
      "Não. Nenhum advogado pode garantir resultado. O que fazemos é examinar o motivo da negativa, verificar o que pode ser comprovado e conduzir a medida cabível — explicando os limites de cada caminho.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta:
      "Depende da via escolhida e do órgão que decidirá. O recurso administrativo e a ação judicial têm prazos distintos, que variam conforme o caso e a região. Informamos a expectativa realista antes de você decidir.",
  },
  {
    pergunta: "Já consigo me aposentar e o pedido foi negado. Perdi o direito?",
    resposta:
      "Não necessariamente. A negativa pode decorrer de um documento faltante enquanto o direito já existia. Nesse caso, o trabalho é comprovar o que faltou e preservar a data mais favorável.",
  },
];

export default function AposentadoriaNegada() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Aposentadoria negada: o que fazer"
        descricao="Recebeu uma negativa do INSS? Antes de recorrer, é preciso ler o motivo da negativa, verificar prazos e avaliar o que faltou no pedido. Veja o que analisamos."
        caminho="/aposentadoria-negada"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/aposentadoria-negada" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Aposentadoria negada: o que fazer antes de recorrer"
        pergunta="Recebeu uma negativa do INSS e não sabe o que fazer?"
        linhas={[
          "Na maior parte dos casos, a negativa não encerra o pedido: ela indica exatamente o que o INSS considerou não comprovado.",
          "O caminho depende do motivo — corrigir a prova que faltou, recorrer ou discutir na Justiça.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.negado}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos definem se vale recorrer, repetir o pedido ou ir à Justiça — e qual deles preserva a sua data de início."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise é feita a partir da decisão que você recebeu e dos
            documentos do pedido. Se você não tiver a carta de indeferimento, é
            possível consultá-la nos sistemas do INSS durante o atendimento.
            Referência conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="Estes são os erros que aparecem com mais frequência depois de uma negativa — e que costumam ser mais caros do que a própria negativa."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre a negativa"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos ler a sua negativa juntos?"
        texto="Envie o motivo da negativa ou o número do pedido. Explicamos o que ela aponta e quais caminhos existem."
        mensagem={WHATSAPP_MENSAGENS.negado}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}