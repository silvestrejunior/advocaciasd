import { Link } from "wouter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp, TituloSecao, Trilha } from "@/components/site/Sections";
import {
  AvisoDocumentos,
  ChamadaFinal,
  ComoComecaAtendimento,
  DuvidasAntesDeContratar,
  SeoServico,
} from "@/components/site/Servico";
import { breadcrumbJsonLd, faqJsonLd } from "@/components/site/Seo";
import { FAQ_ATENDIMENTO } from "@/data/servicos";

const TRILHA = [{ label: "Início", href: "/" }, { label: "Como funciona" }];

const SERVICOS_DIFERENTES = [
  {
    titulo: "Consulta",
    texto:
      "Você esclarece dúvidas sobre o assunto combinado, sem que o escritório examine todo o histórico.",
  },
  {
    titulo: "Planejamento",
    texto:
      "Examinamos as contribuições e os documentos e comparamos os cenários de aposentadoria, com datas e valores estimados.",
  },
  {
    titulo: "Acompanhamento de pedido ou processo",
    texto:
      "O escritório atua no requerimento, no recurso ou na ação, conforme o serviço contratado.",
  },
];

export default function ComoFunciona() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Como funciona o atendimento"
        descricao="Como começa o atendimento, o que está incluído em cada serviço, como funcionam os honorários e quais são os canais oficiais do escritório."
        caminho="/como-funciona"
        jsonLd={[
          faqJsonLd(FAQ_ATENDIMENTO),
          breadcrumbJsonLd([
            { label: "Início", href: "/" },
            { label: "Como funciona", href: "/como-funciona" },
          ]),
        ]}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Como funciona o atendimento
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
            Você pode conhecer o escritório, explicar a sua procura e esclarecer o
            funcionamento do serviço antes de decidir.
          </p>
          <div className="mt-5">
            <AvisoDocumentos />
          </div>
        </div>
      </section>

      <ComoComecaAtendimento claro />

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Serviços diferentes"
            titulo="O serviço deve corresponder ao que você procura"
            texto="Consulta, planejamento e acompanhamento são serviços distintos, com trabalhos e valores diferentes. A proposta identifica qual deles está sendo oferecido."
          />
          <div className="mt-11 grid gap-6 md:grid-cols-3">
            {SERVICOS_DIFERENTES.map((item) => (
              <div
                key={item.titulo}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-brand-800">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-l-4 border-l-cyan-500 bg-white p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-brand-800">
                Antes de contratar, confira
              </h3>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-slate-700">
                <li>A proposta descreve o trabalho e as etapas incluídas.</li>
                <li>Confira honorários, condições de pagamento e despesas.</li>
                <li>Leia o contrato e esclareça dúvidas antes de assinar.</li>
                <li>Combine os canais de comunicação durante o atendimento.</li>
              </ul>
            </div>
            <div className="rounded-2xl border-l-4 border-l-slate-300 bg-white p-6">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-brand-800">
                Precisa de ajuda com as etapas digitais?
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
                Informe se tem dificuldade para usar o WhatsApp, acessar um
                documento ou concluir uma etapa pelo celular. Você também pode
                explicar que está ajudando um familiar. Indicamos como prosseguir
                conforme o atendimento.
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
                Documentos e informações de saúde devem ser encaminhados apenas
                pelos canais indicados pela equipe. Não inclua esses dados em
                comentários públicos ou avaliações.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-800 px-6 py-3.5 text-[14px] font-bold text-white hover:bg-brand-700"
            >
              Ver os canais de contato
            </Link>
          </div>
        </div>
      </section>

      <DuvidasAntesDeContratar claro />
      <ChamadaFinal />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}