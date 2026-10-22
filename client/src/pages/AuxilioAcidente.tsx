import {
  CalendarClock,
  FileSearch,
  FileWarning,
  MapPin,
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
  { label: "Auxílio-acidente" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "Se o acidente deixou sequela",
    texto:
      "É a sequela, e não a doença, que caracteriza o benefício.",
  },
  {
    titulo: "Se a sequela reduz a capacidade para o trabalho habitual",
    texto:
      "Não é preciso impedir totalmente o trabalho. A análise deve considerar a limitação que permaneceu na atividade habitual.",
  },
  {
    titulo: "A comprovação do nexo com o trabalho",
    texto:
      "Nexo é a ligação entre o acidente e o trabalho. Acidentes de trajeto e doenças do trabalho também podem ser considerados.",
  },
  {
    titulo: "A data do acidente e o histórico de afastamento",
    texto:
      "O histórico ajuda a definir desde quando o benefício pode ser devido.",
  },
  {
    titulo: "Se o benefício foi concedido e depois cessado",
    texto:
      "Uma vez concedido, a cessação por melhora precisa ser examinada com cuidado.",
  },
  {
    titulo: "O que a perícia analisou",
    texto:
      "O laudo precisa tratar da sequela, e não apenas da doença ou do diagnóstico.",
  },
];

const PONTOS = [
  {
    icone: FileWarning,
    titulo: "Cessação por suposta recuperação",
    problema:
      "A melhora da doença não significa o fim da sequela. A limitação que permaneceu pode não ter sido examinada com atenção.",
    fazemos:
      "Examinamos o motivo da cessação e as medidas cabíveis.",
  },
  {
    icone: Stethoscope,
    titulo: "Perícia que analisa a doença e não a sequela",
    problema:
      "O laudo pode descrever o diagnóstico e ignorar a limitação que permaneceu.",
    fazemos:
      "Organizamos a prova que mostra a sequela e sua repercussão no trabalho.",
  },
  {
    icone: FileSearch,
    titulo: "Falta de exame ou laudo que documente a sequela",
    problema:
      "Sem documentação, a limitação não fica demonstrada.",
    fazemos:
      "Indicamos o que precisa ser produzido antes do pedido.",
  },
  {
    icone: MapPin,
    titulo: "Acidente de trajeto não registrado",
    problema:
      "Sem registro, a ligação entre o acidente e o trabalho fica mais difícil de comprovar.",
    fazemos:
      "Orientamos como reunir os documentos do deslocamento e do atendimento.",
  },
  {
    icone: CalendarClock,
    titulo: "Pedido feito depois de voltar ao trabalho",
    problema:
      "Muita gente acredita que o retorno ao trabalho encerra o direito.",
    fazemos:
      "Esclarecemos que o retorno não impede o pedido e verificamos a data em que a sequela se consolidou.",
  },
];

const DOCUMENTOS = [
  "Comunicação de Acidente de Trabalho (CAT).",
  "Boletim de ocorrência, no caso de acidente de trajeto.",
  "Laudos e exames de imagem da sequela.",
  "Atestados com período de afastamento.",
  "Carteira de trabalho e extrato de contribuições (CNIS).",
  "Protocolo do pedido, se já houver.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Posso receber auxílio-acidente mesmo trabalhando?",
    resposta:
      "O retorno ao trabalho não exclui automaticamente a possibilidade de análise. O caso depende da sequela, da redução da capacidade para a atividade habitual e dos documentos que comprovam essa limitação.",
  },
  {
    pergunta: "Preciso ter recebido auxílio por incapacidade antes?",
    resposta:
      "Não necessariamente. O histórico de afastamento é um dos pontos analisados, mas o pedido depende principalmente da existência da sequela e da redução da capacidade para o trabalho habitual.",
  },
  {
    pergunta: "O acidente de trajeto também pode ser analisado?",
    resposta:
      "Pode. É preciso demonstrar a ligação entre o acidente e o deslocamento relacionado ao trabalho. Boletim de ocorrência, registros de atendimento e outros documentos podem ajudar nessa análise.",
  },
  {
    pergunta: "Como a perícia verifica a sequela?",
    resposta:
      "A avaliação deve considerar os exames, os relatórios médicos, a limitação funcional e as tarefas da atividade habitual. O diagnóstico sozinho não mostra necessariamente o efeito que permaneceu no trabalho.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta:
      "Depende da documentação, da necessidade de perícia e do caminho escolhido. Informamos o que pode ser feito e a expectativa possível depois de conhecer os detalhes, sem prometer uma data.",
  },
];

export default function AuxilioAcidente() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Auxílio-acidente: quando a sequela permanece depois do acidente"
        descricao="Saiba o que precisa ser analisado no auxílio-acidente quando uma sequela permanece após o acidente, mesmo com o retorno ao trabalho."
        caminho="/auxilio-acidente"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/auxilio-acidente" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Auxílio-acidente: quando a sequela permanece depois do acidente"
        pergunta="Voltou ao trabalho, mas ficou com uma sequela de acidente?"
        linhas={[
          "O auxílio-acidente é devido quando o acidente deixa uma sequela que reduz a capacidade para o trabalho habitual — mesmo que você já tenha voltado a trabalhar.",
          "Ele é indenizatório e, em regra, pode ser recebido junto com o salário.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.beneficio}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos ajudam a diferenciar a doença da sequela e mostram o que precisa ser comprovado no caso concreto."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise considera os documentos do acidente, os exames da sequela e
            as tarefas da atividade habitual. Se a perícia já ocorreu, o laudo e
            os documentos usados na avaliação ajudam a definir os próximos passos.
            Referência conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="O retorno ao trabalho não encerra, por si só, a análise. Estes são os pontos que mais precisam ser conferidos quando a sequela permanece."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre o auxílio-acidente"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos analisar a sequela que ficou?"
        texto="Conte como ocorreu o acidente e quais limitações permaneceram. Explicamos o que precisa ser conferido e quais documentos podem ajudar."
        mensagem={WHATSAPP_MENSAGENS.beneficio}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
