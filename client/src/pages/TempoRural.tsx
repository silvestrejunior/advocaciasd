import {
  Archive,
  CalendarClock,
  FileCheck2,
  FileSearch,
  FileWarning,
  MapPin,
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
  { label: "Tempo rural" },
];

const O_QUE_ANALISAR = [
  {
    titulo: "Qual foi a atividade e em que período",
    texto:
      "Segurado especial, boia-fria, diarista rural, empregado, parceiro e arrendatário deixam rastros documentais diferentes. O primeiro passo é separar cada intervalo e a forma de trabalho.",
  },
  {
    titulo: "Se existe prova material da época",
    texto:
      "A prova material contemporânea é o documento produzido próximo ao período alegado. Documento atual, sozinho, normalmente não demonstra que o trabalho aconteceu décadas atrás.",
  },
  {
    titulo: "O que a autodeclaração consegue demonstrar",
    texto:
      "A autodeclaração rural, inclusive a versão ampliada quando o período exige mais informações, organiza o relato da atividade. Ela precisa ser conferida e ratificada; não substitui toda a prova documental.",
  },
  {
    titulo: "Se as testemunhas conhecem o trabalho de verdade",
    texto:
      "Testemunha útil explica onde, quando e com quem a pessoa trabalhava, além das tarefas realizadas. Depoimento genérico, baseado apenas em parentesco ou no que ouviu dizer, tem pouca força.",
  },
  {
    titulo: "Como os intervalos e as mudanças aparecem",
    texto:
      "A família pode ter mudado de município, alternado campo e cidade ou parado de trabalhar por algum tempo. Cada intervalo precisa ser narrado e relacionado aos documentos correspondentes.",
  },
  {
    titulo: "Qual será o destino do tempo reconhecido",
    texto:
      "O período pode ser usado no INSS ou, conforme o caso, levado a regime próprio por averbação e Certidão de Tempo de Contribuição. O órgão de destino pode exigir conferências específicas.",
  },
];

const PONTOS = [
  {
    icone: FileWarning,
    titulo: "Confiar somente na autodeclaração",
    problema:
      "O relato do segurado é importante, mas a declaração isolada não prova todos os anos informados. O INSS pode confrontá-la com bases públicas e pedir documentos contemporâneos.",
    fazemos:
      "Organizamos a autodeclaração por períodos, locais e atividades, e conferimos quais documentos podem ratificar cada parte do relato.",
  },
  {
    icone: FileSearch,
    titulo: "Juntar documentos sem separar os períodos",
    problema:
      "Um documento de um ano não comprova automaticamente todo o intervalo. Misturar períodos de municípios, patrões ou formas de trabalho dificulta a análise.",
    fazemos:
      "Montamos uma linha do tempo e relacionamos cada documento ao período que ele realmente alcança.",
  },
  {
    icone: CalendarClock,
    titulo: "Ignorar a data de 31 de outubro de 1991",
    problema:
      "A exigência de início de prova material contemporânea tem tratamento relevante para o tempo rural a partir de 31/10/1991. Aplicar a mesma leitura a todo o passado pode gerar uma conclusão errada.",
    fazemos:
      "Separarmos os períodos anteriores e posteriores, verificando o documento e o critério aplicável a cada faixa de tempo.",
  },
  {
    icone: MapPin,
    titulo: "Deixar a mudança de município sem explicação",
    problema:
      "Registros escolares, certidões ou documentos de produção podem apontar locais diferentes. Sem explicar a mudança, o conjunto parece contraditório.",
    fazemos:
      "Conferimos endereços, propriedades, escolas e datas para explicar a trajetória da família sem apagar os intervalos reais.",
  },
  {
    icone: Archive,
    titulo: "Esperar para procurar documentos antigos",
    problema:
      "O produtor pode ter falecido, a empresa pode ter fechado e arquivos de sindicato, escola ou cooperativa podem não estar mais disponíveis.",
    fazemos:
      "Indicamos onde procurar cópias, certidões e registros enquanto as fontes ainda podem ser localizadas.",
  },
  {
    icone: FileCheck2,
    titulo: "Usar o tempo rural no regime errado",
    problema:
      "Reconhecer um período no INSS não significa que ele já esteja averbado no regime próprio. CTC, datas e finalidade precisam ser conferidas antes do protocolo.",
    fazemos:
      "Analisamos se o tempo pode ser aproveitado e quais documentos são necessários para a averbação no regime de destino.",
  },
];

const DOCUMENTOS = [
  "Notas do produtor rural, bloco de notas e comprovantes de venda da produção.",
  "Contratos de parceria, arrendamento, meação ou comodato rural, com as datas e formalidades correspondentes.",
  "ITR, documentos de propriedade, escritura, cadastro rural ou registros do INCRA.",
  "Declaração de Aptidão ao Pronaf (DAP) ou documento que a substitua, como o CAF.",
  "Fichas de inscrição, associação ou contribuição em sindicato de trabalhadores rurais, produtores ou cooperativa.",
  "Registros escolares, fichas de matrícula e boletins do trabalhador ou dos filhos.",
  "Certidões de casamento, nascimento, batismo, óbito ou outros registros que indiquem profissão e localidade.",
  "Recibos de compra de insumos e implementos, empréstimos bancários ou assistência técnica rural.",
  "Carteira de trabalho, comprovantes de vínculo, recibos e documentos do empregador rural ou do produtor falecido.",
  "CNIS, autodeclaração rural, autodeclaração ampliada, decisões do INSS e documentos de eventual processo anterior.",
  "Certidão de Tempo de Contribuição e documentos do regime próprio, quando o tempo será averbado.",
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "A autodeclaração rural sozinha comprova o tempo?",
    resposta:
      "Não necessariamente. Ela registra a versão do segurado e deve ser conferida com bases públicas e, quando necessário, com documentos contemporâneos. A análise depende do período e da categoria de trabalho.",
  },
  {
    pergunta: "Testemunhas podem substituir os documentos?",
    resposta:
      "Em regra, não. A prova exclusivamente testemunhal não basta. As testemunhas ajudam a esclarecer e complementar um início de prova material, explicando as tarefas, os locais e os períodos que conheceram diretamente.",
  },
  {
    pergunta: "O que muda para o tempo anterior a 31/10/1991?",
    resposta:
      "O período anterior recebe tratamento próprio na análise. Documentos antigos e registros do vínculo podem ser relevantes, enquanto a exigência de prova material contemporânea deve ser examinada conforme a faixa de tempo e a categoria.",
  },
  {
    pergunta: "Trabalhei no campo e também na cidade. Perdi o tempo rural?",
    resposta:
      "Não é possível concluir apenas pela existência de um vínculo urbano. É preciso conferir datas, intervalos, a forma do trabalho rural e se houve simultaneidade incompatível com o relato apresentado.",
  },
  {
    pergunta: "Posso levar o tempo rural para a aposentadoria do servidor?",
    resposta:
      "Pode haver essa possibilidade, mas o aproveitamento exige análise da finalidade, da forma de reconhecimento e da CTC ou averbação no regime próprio. O documento do INSS precisa estar correto antes de ser apresentado ao órgão.",
  },
  {
    pergunta: "O INSS já negou meu tempo rural. O que posso fazer?",
    resposta:
      "Leia o motivo da negativa e os documentos que foram considerados. É possível avaliar recurso, novo requerimento ou medida judicial, mas o caminho depende do que faltou provar e dos prazos do caso.",
  },
];

export default function TempoRural() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Tempo rural: como comprovar"
        descricao="Entenda como organizar documentos, autodeclaração e testemunhas para comprovar o tempo de trabalho rural no seu histórico previdenciário."
        caminho="/tempo-rural"
        palavrasChave="tempo rural, comprovar trabalho rural, segurado especial, CNIS sem tempo rural, aposentadoria rural"
        imagem="/images/og-tempo-rural.jpg"
        jsonLd={[faqJsonLd(PERGUNTAS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/tempo-rural" })))]}
      />
      <SiteHeader sobreHeroEscuro />

      <HeroServico
        trilha={TRILHA}
        titulo="Tempo rural: como comprovar o trabalho no campo"
        pergunta="Você trabalhou no campo, mas não sabe como provar esse período?"
        linhas={[
          "O tempo rural costuma depender de uma combinação de documentos da época, autodeclaração e testemunhos coerentes.",
          "A análise precisa separar os intervalos, os municípios e a forma de trabalho antes de qualquer pedido ao INSS ou de averbação em regime próprio.",
        ]}
        mensagem={WHATSAPP_MENSAGENS.inss}
      />

      <OQueAnalisar
        itens={O_QUE_ANALISAR}
        texto="O trabalho rural não é provado por uma única folha. O que costuma decidir é a coerência entre o relato, os registros da época e o depoimento de quem acompanhou a atividade."
      />

      <section className="bg-slate-50 py-14">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl text-[14px] leading-relaxed text-slate-600">
            A Lei 8.213/91 exige início de prova material contemporânea dos fatos e
            não admite, em regra, prova exclusivamente testemunhal. Para a atividade
            do segurado especial, a autodeclaração e as bases cadastrais também
            entram na conferência, sem dispensar a análise dos documentos quando há
            ausência ou divergência. A referência foi conferida em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <PontosDeAtencao
        pontos={PONTOS}
        texto="A dificuldade normalmente não está em lembrar que houve trabalho no campo. Está em demonstrar, com precisão, quando, onde e em qual condição esse trabalho ocorreu."
      />

      <DocumentosQueAjudam
        itens={DOCUMENTOS}
        texto="Não é preciso ter todos estes documentos para iniciar o contato. Eles são pistas para localizar a história do trabalho e indicar onde a prova ainda pode ser buscada."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Perguntas frequentes"
            titulo="Dúvidas sobre tempo rural"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      <ComoComecaAtendimento claro />
      <FaixaEscritorio />
      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos organizar a prova do seu trabalho rural?"
        texto="Conte em quais lugares e períodos você trabalhou no campo e quais documentos ainda possui. Explicamos o que pode ser conferido, sem prometer resultado antes de analisar o caso."
        mensagem={WHATSAPP_MENSAGENS.inss}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
