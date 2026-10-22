import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  Trilha,
} from "@/components/site/Sections";
import {
  AvisoDocumentos,
  ChamadaFinal,
  ComoComecaAtendimento,
  ConhecaEscritorio,
  GradeServicos,
  SeoServico,
} from "@/components/site/Servico";
import { breadcrumbJsonLd } from "@/components/site/Seo";
import { REVISAO_CONTEUDO } from "@/data/previdenciario";
import { servicosDoBloco } from "@/data/servicos";

const TRILHA = [{ label: "Início", href: "/" }, { label: "Serviços" }];

export default function Servicos() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Serviços"
        descricao="Encontre o atendimento para o seu assunto: aposentadorias, benefícios por incapacidade, aposentadoria negada, revisão, pensão por morte e BPC/LOAS."
        caminho="/servicos"
        jsonLd={breadcrumbJsonLd([
          { label: "Início", href: "/" },
          { label: "Serviços", href: "/servicos" },
        ])}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Encontre o atendimento para o seu assunto
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
            Do planejamento à análise de um benefício negado, o primeiro passo é
            entender a sua situação e o trabalho necessário.
          </p>
          <div className="mt-5">
            <AvisoDocumentos />
          </div>
          <p className="mt-4 text-[12.5px] text-slate-300/70">
            Conteúdo conferido em {REVISAO_CONTEUDO}.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <GradeServicos
            titulo="Principais serviços"
            texto="O trabalho começa pela análise dos documentos e do histórico. Antes de qualquer pedido, comparamos as regras aplicáveis e o que cada caminho exige."
            servicos={servicosDoBloco("principais")}
          />
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <GradeServicos
            titulo="Já fez um pedido ou recebe um benefício?"
            texto="Aqui o ponto de partida é o que já foi decidido: o motivo da negativa, a razão da cessação ou o cálculo que está sendo pago."
            servicos={servicosDoBloco("pedido")}
            colunas={2}
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <GradeServicos
            titulo="Outras formas de atuação"
            texto="Assuntos que atendemos pelo contato direto, com a mesma análise caso a caso."
            servicos={servicosDoBloco("outras")}
          />
        </div>
      </section>

      <ComoComecaAtendimento />
      <ConhecaEscritorio claro />
      <ChamadaFinal
        titulo="Não encontrou exatamente a sua situação?"
        texto="Conte o motivo da sua procura. Explicamos qual atendimento se aplica e quais informações são necessárias para continuar."
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}