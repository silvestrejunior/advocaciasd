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
  ConhecaEscritorio,
  DocumentosQueAjudam,
  DuvidasAntesDeContratar,
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
  { label: "Perícia negada" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "O motivo escrito da negativa",
    texto:
      "A decisão indica se faltou documento, se a perícia não reconheceu a incapacidade, se houve discussão de carência ou se o INSS apontou perda da qualidade de segurado.",
  },
  {
    titulo: "A data em que você tomou ciência",
    texto:
      "A data da ciência da decisão é o ponto de partida para conferir o prazo do recurso administrativo e evitar que uma medida seja escolhida tarde demais.",
  },
  {
    titulo: "O que o laudo realmente registrou",
    texto:
      "É preciso confrontar o resultado com os exames e com a atividade habitual. Diagnóstico e incapacidade não são a mesma coisa para a análise do pedido.",
  },
  {
    titulo: "A qualidade da prova médica",
    texto:
      "Relatórios atuais devem explicar limitações funcionais, histórico do tratamento e data de início da incapacidade, em vez de apenas repetir um diagnóstico.",
  },
  {
    titulo: "Se o caminho é recurso ou novo pedido",
    texto:
      "O recurso contesta a decisão daquele processo. Um novo pedido começa outra análise e pode ter consequências diferentes para datas, documentos e valores.",
  },
  {
    titulo: "Se há espaço para medida judicial",
    texto:
      "A ação judicial também depende dos documentos, do laudo administrativo, das datas e do que foi efetivamente discutido. Ela não deve ser escolhida sem essa conferência.",
  },
];

const PONTOS = [
  {
    icone: FileWarning,
    titulo: "Negativa baseada apenas na conclusão da perícia",
    problema:
      "O resultado pode dizer que não foi constatada incapacidade, mas não explicar por que os exames e as limitações descritas não foram considerados. Sem ler o motivo escrito, fica difícil saber o que contestar.",
    fazemos:
      "Confrontamos a decisão, o laudo e os documentos médicos para identificar se o problema está na prova, na avaliação da incapacidade ou em outro requisito indicado pelo INSS.",
  },
  {
    icone: Stethoscope,
    titulo: "Laudo genérico, antigo ou sem histórico",
    problema:
      "Atestado sem exame atualizado, sem evolução clínica ou sem explicar o efeito da doença no trabalho costuma deixar a incapacidade sem demonstração suficiente.",
    fazemos:
      "Indicamos quais informações precisam aparecer no relatório do médico assistente: CID, tratamento, data provável de início e limitações para as tarefas habituais.",
  },
  {
    icone: CalendarClock,
    titulo: "Prazo de recurso correndo",
    problema:
      "Em regra, o recurso administrativo ao CRPS deve ser apresentado em até 30 dias depois da ciência da decisão. Esperar um novo pedido pode fazer o prazo passar.",
    fazemos:
      "Conferimos a data da ciência, o motivo da negativa e se há elementos para recurso. O prazo e a estratégia dependem do documento concreto do processo.",
  },
  {
    icone: FileSearch,
    titulo: "Novo pedido sem corrigir o problema anterior",
    problema:
      "Repetir o pedido com a mesma documentação e sem explicar a negativa pode levar a outro indeferimento. O novo pedido não substitui automaticamente o recurso.",
    fazemos:
      "Comparamos os caminhos e apontamos o que precisa ser corrigido, atualizado ou produzido antes de protocolar novamente.",
  },
  {
    icone: Landmark,
    titulo: "Perícia de prorrogação que terminou em cessação",
    problema:
      "Quando o benefício é encerrado na avaliação de prorrogação, o caso não é igual ao primeiro pedido. A data da cessação e a continuidade da incapacidade precisam ser preservadas.",
    fazemos:
      "Verificamos se ainda cabia solicitar prorrogação e, se não for mais possível, se há recurso ou outra medida para discutir a cessação.",
  },
  {
    icone: CalendarClock,
    titulo: "Perícia não realizada ou falta na convocação",
    problema:
      "Uma ausência, um problema de agendamento ou uma impossibilidade médica pode gerar indeferimento sem que a incapacidade tenha sido examinada. O motivo e as datas fazem diferença.",
    fazemos:
      "Conferimos a convocação e os registros do Meu INSS. Em situações previstas, a remarcação pode ser solicitada uma única vez em até 7 dias após a data agendada.",
  },
];

const DOCUMENTOS = [
  "Decisão de indeferimento, carta de comunicação e laudo ou resultado da perícia.",
  "Número do benefício ou protocolo, processo administrativo e data em que você tomou ciência.",
  "Relatórios do médico assistente com CID, tratamento, data de início da incapacidade e limitações para o trabalho habitual.",
  "Exames de imagem, exames laboratoriais, prontuários, receitas e documentos de internação ou atendimento.",
  "Atestados atualizados, com período de afastamento, assinatura e identificação do profissional.",
  "Carteira de trabalho, CNIS, comprovantes de contribuição e registros de afastamentos anteriores.",
  "Convocação e comprovante de comparecimento, remarcação ou justificativa de falta, quando houver.",
  "Para BPC/LOAS: documentos de renda, composição familiar e avaliações relacionadas ao impedimento.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "O que faço primeiro depois da perícia negada?",
    resposta:
      "Leia o motivo escrito da decisão e confira a data da ciência. Depois, compare o laudo com os exames e avalie se o caminho é recurso, novo pedido ou ação judicial.",
  },
  {
    pergunta: "Qual é o prazo para recorrer?",
    resposta:
      "Em regra, o prazo do recurso administrativo é de 30 dias contados da ciência da decisão. A data e o tipo de decisão precisam ser conferidos no processo concreto.",
  },
  {
    pergunta: "Recurso e novo pedido são a mesma coisa?",
    resposta:
      "Não. O recurso contesta a decisão já tomada no processo. O novo pedido inicia outra análise, e pode não preservar a mesma discussão ou as mesmas datas.",
  },
  {
    pergunta: "Um relatório médico simples resolve a negativa?",
    resposta:
      "Nem sempre. O documento precisa ser atual e explicar o tratamento, a evolução, a data de início e as limitações para as tarefas do trabalho. Um diagnóstico isolado costuma ser insuficiente.",
  },
  {
    pergunta: "Meu benefício foi cessado na perícia de prorrogação. O que posso fazer?",
    resposta:
      "Primeiro, confira a data da cessação e se ainda era possível pedir prorrogação. Se não for mais possível, pode haver recurso em até 30 dias da ciência, além de outras medidas conforme os documentos.",
  },
  {
    pergunta: "Faltei à perícia. Ainda posso corrigir?",
    resposta:
      "Depende da data e do motivo. O INSS informa que a remarcação pode ser solicitada uma única vez, em até 7 dias após a data agendada. É preciso conferir o registro da convocação.",
  },
];

export default function PericiaNegada() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Perícia negada: o que fazer"
        descricao="Perícia do INSS negada? Veja o que analisar no laudo, no prazo de recurso e nos documentos antes de escolher o próximo caminho."
        caminho="/pericia-negada"
        palavrasChave="perícia negada INSS, benefício por incapacidade negado, laudo médico, recurso administrativo, nova perícia"
        imagem="/images/og-pericia.jpg"
        jsonLd={[
          faqJsonLd(PERGUNTAS),
          breadcrumbJsonLd(
            TRILHA.map((t) => ({
              label: t.label,
              href: t.href ?? "/pericia-negada",
            })),
          ),
        ]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Perícia negada: o que analisar antes de agir"
        pergunta="Saiu da perícia do INSS com uma negativa e não sabe qual é o próximo passo?"
        linhas={[
          "A primeira leitura deve ser do motivo escrito da decisão. Ele mostra se a negativa veio da avaliação da incapacidade, da documentação médica, da carência, da qualidade de segurado ou de outro ponto do processo.",
          "Antes de fazer um novo pedido, é preciso conferir prazo, laudo, documentos e o efeito de cada caminho: recurso administrativo, novo requerimento ou ação judicial.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.negado}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        sobretitulo="Depois da negativa"
        titulo="O que precisa ser analisado"
        texto="A negativa não deve ser respondida com um procedimento automático. O documento que decidiu o pedido e o conjunto da prova indicam o que precisa ser feito em seguida."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            O INSS informa que o recurso administrativo contra indeferimento ou cessação deve ser apresentado, em regra, em até 30 dias contados da ciência da decisão. A solicitação de prorrogação, quando cabível, tem momento próprio; depois disso, o recurso pode ser o caminho disponível. A referência oficial foi conferida em {REVISAO_CONTEUDO}, nas páginas do INSS sobre recurso, prorrogação e benefícios por incapacidade, e na Lei nº 8.213/1991.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        sobretitulo="Cuidados e alertas"
        titulo="Os pontos que costumam decidir o caso"
        texto="A perícia negada pode esconder problemas diferentes. Identificar a causa evita recorrer sem prova, repetir o pedido sem corrigir a falha ou deixar passar um prazo."
      />

      <DocumentosQueAjudam
        itens={DOCUMENTOS}
        texto="Você pode iniciar o contato com o que já tiver. A lista ajuda a localizar os documentos que permitem conferir o motivo da negativa e a qualidade da prova."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre perícia negada"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <ConhecaEscritorio claro />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos conferir o que aconteceu?"
        texto="Conte quando foi a perícia, qual motivo apareceu na decisão e quais documentos médicos você tem. Explicamos o que precisa ser analisado e quais caminhos dependem do seu caso, sem promessa de resultado."
        mensagem={WHATSAPP_MENSAGENS.negado}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
