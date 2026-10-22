import { Link } from "wouter";
import { Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp } from "@/components/site/Sections";
import {
  AvisoDocumentos,
  ChamadaFinal,
  ComoComecaAtendimento,
  ConhecaEscritorio,
  DuvidasAntesDeContratar,
  GradeServicos,
  SeoServico,
} from "@/components/site/Servico";
import { faqJsonLd } from "@/components/site/Seo";
import {
  FAQ_ATENDIMENTO,
  servicosDoBloco,
} from "@/data/servicos";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Advocacia para a sua aposentadoria e para os seus benefícios"
        descricao={`Aposentadorias do INSS e de servidores públicos, benefícios por incapacidade, negativas e revisões. ${SITE.experiencia} de atuação em Direito Previdenciário, com atendimento a distância.`}
        caminho="/"
        jsonLd={faqJsonLd(FAQ_ATENDIMENTO)}
      />
      <SiteHeader sobreHeroEscuro />

      {/* ---------------------------------------------------------- Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 pb-20 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_330px]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                Direito Previdenciário há {SITE.experiencia}
              </p>

              <h1 className="mt-5 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-[1.12] md:text-[52px]">
                Advocacia para a sua aposentadoria e para os seus benefícios
              </h1>

              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-blue-50/90">
                Quer dar entrada, recebeu uma negativa ou precisa de orientação
                sobre um benefício? Conheça os serviços do escritório.
              </p>
              <div className="mt-5">
                <AvisoDocumentos />
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-blue-950 hover:bg-cyan-300"
                >
                  <Phone size={17} />
                  Falar com o escritório
                </a>
                <Link
                  href="/servicos"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
                >
                  Conhecer os serviços
                </Link>
              </div>

              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7">
                <div>
                  <dt className="text-[15px] font-bold text-white">
                    {SITE.experiencia} de experiência
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-blue-100/80">
                    em Direito Previdenciário
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] font-bold text-white">
                    Do pedido ao recurso
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-blue-100/80">
                    atuação administrativa e judicial
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] font-bold text-white">
                    Maringá/PR e todo o Brasil
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-blue-100/80">
                    atendimento a distância
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm">
              <h2 className="font-['Playfair_Display'] text-[17px] font-bold text-white">
                Por onde começar
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-blue-100/80">
                Não é preciso saber o nome do benefício nem qual documento
                enviar.
              </p>
              <ul className="mt-4 space-y-0.5">
                {[
                  { t: "Quero dar entrada na aposentadoria", m: WHATSAPP_MENSAGENS.geral },
                  { t: "O meu benefício foi negado", m: WHATSAPP_MENSAGENS.negado },
                  { t: "Trabalhei exposto a agentes nocivos", m: WHATSAPP_MENSAGENS.geral },
                  { t: "Sou servidor público", m: WHATSAPP_MENSAGENS.servidor },
                ].map((item) => (
                  <li key={item.t}>
                    <a
                      href={whatsapp(item.m)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-b border-white/10 py-3 text-[13.5px] text-blue-50/90 hover:text-cyan-300"
                    >
                      {item.t}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-lg bg-green-500 px-4 py-3 text-center text-[14px] font-bold text-white hover:bg-green-600"
              >
                Falar no WhatsApp
              </a>
              <p className="mt-4 text-[11.5px] leading-relaxed text-blue-100/70">
                {SITE.responsavel} — {SITE.oab}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Como podemos ajudar */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <GradeServicos
            titulo="Como podemos ajudar?"
            texto="Cada serviço começa pela análise dos documentos e do histórico. Antes de qualquer pedido, comparamos as regras aplicáveis ao seu caso e mostramos o que cada caminho exige."
            servicos={servicosDoBloco("principais")}
          />
          <div className="mt-10">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-900 px-6 py-3.5 text-[14px] font-bold text-blue-900 hover:bg-blue-900 hover:text-white"
            >
              Ver todos os serviços
            </Link>
          </div>
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
      <DuvidasAntesDeContratar />
      <ChamadaFinal />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}