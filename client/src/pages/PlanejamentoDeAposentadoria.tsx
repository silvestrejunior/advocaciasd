import {
  Building2,
  CalendarClock,
  FileSearch,
  FileWarning,
  Scale,
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
  { label: "Planejamento de aposentadoria" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "O histórico completo de contribuições",
    texto:
      "O extrato costuma ter períodos sem baixa, vínculos duplicados e datas divergentes. A leitura começa pela conferência de todo o histórico.",
  },
  {
    titulo: "Os vínculos com data errada e os períodos não recolhidos",
    texto:
      "Empregadores que não recolheram podem ser cobrados, e o período pode ser reconhecido. Datas erradas também precisam ser conferidas.",
  },
  {
    titulo: "O tempo especial que pode ser reconhecido",
    texto:
      "Períodos com exposição a agentes nocivos podem antecipar a aposentadoria, se comprovados por documentos do trabalho e da exposição.",
  },
  {
    titulo: "A comparação entre os caminhos possíveis",
    texto:
      "Cada regra tem requisitos e datas próprias. O planejamento mostra qual delas é possível primeiro, conforme o histórico conferido.",
  },
  {
    titulo: "O que compensa fazer agora",
    texto:
      "Corrigir vínculo, complementar contribuição ou aguardar: cada escolha tem efeito diferente no resultado. A decisão depende da comparação.",
  },
  {
    titulo: "Os documentos que ainda podem ser obtidos",
    texto:
      "Empresas fechadas, documentos antigos e provas precisam ser buscados antes de serem necessários no pedido.",
  },
];

const PONTOS = [
  {
    icone: FileSearch,
    titulo: "Dar entrada sem conferir o extrato de contribuições",
    problema:
      "Períodos faltantes só aparecem depois da negativa, quando a correção pode exigir mais trabalho.",
    fazemos:
      "Lemos o extrato antes e apontamos cada inconsistência, inclusive vínculos sem baixa e datas divergentes.",
  },
  {
    icone: Scale,
    titulo: "Aposentar pela regra menos vantajosa por falta de comparação",
    problema:
      "A primeira regra cumprida nem sempre é a melhor para a data ou para o valor do benefício.",
    fazemos:
      "Comparamos os caminhos e mostramos o efeito de cada um na data e no valor, sem indicar uma escolha antes de analisar o caso.",
  },
  {
    icone: FileWarning,
    titulo: "Deixar de comprovar tempo especial a que já tinha direito",
    problema:
      "O tempo especial, período com exposição a agentes nocivos, pode estar no histórico e nunca ter sido levado ao INSS.",
    fazemos:
      "Identificamos os períodos com indício de exposição e o que precisa ser produzido para a análise.",
  },
  {
    icone: CalendarClock,
    titulo: "Contribuir sem saber se aquilo melhora a data ou o valor",
    problema:
      "Contribuições feitas sem planejamento podem não alterar o resultado.",
    fazemos:
      "Mostramos o efeito de cada contribuição antes de você decidir.",
  },
  {
    icone: Building2,
    titulo: "Perder documentos de empresas que fecharam",
    problema:
      "A prova do vínculo fica mais difícil com o tempo, especialmente quando a empresa já não funciona.",
    fazemos:
      "Orientamos a busca dos documentos enquanto ainda são localizáveis.",
  },
];

const DOCUMENTOS = [
  "Extrato de contribuições (CNIS, registro dos vínculos e recolhimentos no INSS).",
  "Carteiras de trabalho.",
  "PPP e documentos de exposição, que descrevem o trabalho e os agentes nocivos.",
  "Contracheques.",
  "Carnês e comprovantes de contribuição.",
  "Registros de vínculos antigos.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Preciso esperar a idade mínima?",
    resposta:
      "Nem sempre. A possibilidade depende do seu histórico, do regime e dos períodos registrados. O planejamento compara as regras aplicáveis e as datas que podem ser analisadas.",
  },
  {
    pergunta: "O escritório faz o cálculo?",
    resposta:
      "O planejamento pode incluir a conferência do histórico, a simulação dos caminhos possíveis e a comparação de datas e valores. O que será feito depende dos documentos e do serviço contratado.",
  },
  {
    pergunta: "Vale a pena complementar contribuição?",
    resposta:
      "Depende. A complementação só deve ser considerada depois de verificar se ela altera a data, o valor ou algum requisito do seu caso. A análise deve ser feita antes do recolhimento.",
  },
  {
    pergunta: "Posso me aposentar por mais de uma regra?",
    resposta:
      "Pode haver mais de um caminho possível para o mesmo histórico. A comparação mostra qual caminho aparece primeiro e quais efeitos cada alternativa pode ter. A conclusão depende dos dados conferidos.",
  },
  {
    pergunta: "O planejamento é um serviço à parte?",
    resposta:
      "Sim. Planejamento, consulta e acompanhamento de pedido são serviços diferentes. A proposta explica o trabalho que será realizado e as condições antes da contratação.",
  },
];

export default function PlanejamentoDeAposentadoria() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Planejamento de aposentadoria: quando você pode se aposentar"
        descricao="Compare as regras aplicáveis ao seu histórico, confira o extrato de contribuições e organize os próximos passos antes de pedir a aposentadoria."
        caminho="/planejamento-de-aposentadoria"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/planejamento-de-aposentadoria" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Planejamento de aposentadoria: quando você pode se aposentar"
        pergunta="Quer entender quando pode se aposentar e como organizar as contribuições?"
        linhas={[
          "O planejamento compara as regras aplicáveis ao seu histórico e mostra as datas em que cada caminho se torna possível.",
          "Antes de dar entrada, é o momento de corrigir o que estiver errado no extrato de contribuições.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.inss}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="Seis pontos mostram o que precisa ser conferido antes de escolher um caminho e fazer o pedido."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A análise começa pelo extrato de contribuições (CNIS), o registro dos
            vínculos e recolhimentos no INSS. Depois, conferimos documentos de
            trabalho, exposição e contribuições que ainda podem ser obtidos.
            Referência conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="Estes são os pontos que mais costumam alterar a data, o valor ou a prova necessária antes de um pedido de aposentadoria."
      />

      <DocumentosQueAjudam itens={DOCUMENTOS} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre o planejamento"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos organizar o seu histórico?"
        texto="Envie o extrato de contribuições ou conte o que já sabe sobre os seus vínculos. Indicamos o que pode ser conferido antes de escolher o próximo passo."
        mensagem={WHATSAPP_MENSAGENS.inss}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
