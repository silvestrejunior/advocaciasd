import { Link } from "wouter";
import { CheckCircle2, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  Perguntas,
  TituloSecao,
} from "@/components/site/Sections";
import {
  ChamadaFinal,
  SeoServico,
} from "@/components/site/Servico";
import { faqJsonLd } from "@/components/site/Seo";
import {
  ALERTAS,
  BENEFICIOS_ALEM,
  BENEFICIOS_INSS,
  BENEFICIOS_SERVIDOR,
  ETAPAS,
  FAQ_HOME,
  type BeneficioRegime,
} from "@/data/regimes";
import { AVISO_DOCUMENTOS } from "@/data/servicos";
import { WHATSAPP_MENSAGENS, SITE, whatsapp } from "@/config/site";

const ATALHOS_WHATSAPP = [
  { titulo: "Quero me aposentar", mensagem: WHATSAPP_MENSAGENS.inss },
  { titulo: "Meu benefício foi negado", mensagem: WHATSAPP_MENSAGENS.negado },
  { titulo: "Sou servidor público", mensagem: WHATSAPP_MENSAGENS.servidor },
  {
    titulo: "Meu benefício foi cessado",
    mensagem:
      "Olá, vim pelo site e meu benefício foi cessado ou suspenso. Gostaria de orientação.",
  },
  { titulo: "Quero revisar o meu benefício", mensagem: WHATSAPP_MENSAGENS.revisao },
] as const;

function CartaoBeneficio({ item }: { item: BeneficioRegime }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-7">
      <h3 className="font-['Playfair_Display'] text-[19px] font-bold leading-snug text-brand-800">
        {item.titulo}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-slate-700">
        {item.oQueE}
      </p>
      <div className="mt-5 border-l-4 border-l-cyan-500 bg-slate-50 px-4 py-3.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">
          Cuidado
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
          {item.cuidado}
        </p>
      </div>
      {item.href && (
        <Link
          href={item.href}
          className="mt-5 inline-flex w-fit items-center text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
        >
          Conhecer o serviço →
        </Link>
      )}
    </article>
  );
}

function GradeBeneficios({ itens }: { itens: BeneficioRegime[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {itens.map((item) => (
        <CartaoBeneficio key={item.id} item={item} />
      ))}
    </div>
  );
}

function CartaoRegime({
  titulo,
  itens,
  href,
  acao,
}: {
  titulo: string;
  itens: BeneficioRegime[];
  href: string;
  acao: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 border-t-4 border-t-cyan-500 bg-white p-7 shadow-sm md:p-8">
      <h3 className="font-['Playfair_Display'] text-2xl font-bold text-brand-800">
        {titulo}
      </h3>
      <ul className="mt-5 flex-1 space-y-3">
        {itens.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-700"
          >
            <CheckCircle2
              size={17}
              className="mt-0.5 flex-shrink-0 text-cyan-600"
            />
            <span>{item.titulo}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-7 inline-flex w-fit items-center text-[14px] font-bold text-cyan-700 hover:text-cyan-800"
      >
        {acao} →
      </Link>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Aposentadoria no INSS e para servidores públicos"
        descricao="Análise de aposentadorias e benefícios do INSS e de regimes próprios, com cuidado prático desde o histórico até o pedido."
        caminho="/"
        jsonLd={faqJsonLd(FAQ_HOME)}
      />
      <SiteHeader sobreHeroEscuro />

      <main>
        <section className="relative overflow-hidden bg-brand-950 pb-16 pt-28 text-white md:pb-20 md:pt-36">
          {/* Fundo: a fachada do escritório, sob o azul da identidade */}
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/images/hero-fachada-mobile.jpg"
            />
            <img
              src="/images/hero-fachada.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/90 to-brand-800/85"
          />
          <div className="relative container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  DIREITO PREVIDENCIÁRIO HÁ QUASE 15 ANOS
                </p>
                <h1 className="mt-5 max-w-2xl font-['Playfair_Display'] text-4xl font-bold leading-[1.08] md:text-6xl">
                  Aposentadoria no{" "}
                  <span className="relative inline-block whitespace-nowrap text-cyan-300">
                    INSS
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-cyan-400/70"
                    />
                  </span>{" "}
                  e para{" "}
                  <span className="relative inline-block text-cyan-300">
                    servidores&nbsp;públicos
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-cyan-400/70"
                    />
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-100/90 md:text-[18px]">
                  Analisamos o seu histórico, identificamos o caminho aplicável
                  ao seu caso e conduzimos o pedido com acompanhamento em cada
                  etapa.
                </p>
                <div className="mt-5 max-w-xl">
                  <p className="text-[14px] leading-relaxed text-slate-300/85">
                    {AVISO_DOCUMENTOS}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/seu-caso"
                    className="group inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-[15px] font-bold text-brand-950 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-300/50 transition-all hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-2xl"
                  >
                    Descobrir o meu caso
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                  <a
                    href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <Phone size={16} />
                    Falar com o escritório
                  </a>
                  <Link
                    href="/servicos"
                    className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-white/20"
                  >
                    Conhecer os serviços
                  </Link>
                </div>
                <p className="mt-4 text-[13.5px] font-medium text-cyan-200/90">
                  Duas perguntas para chegar ao seu caso — leva menos de um
                  minuto e não pede documento.
                </p>
                <div className="mt-10 grid gap-5 border-t border-white/15 pt-6 text-[13px] text-slate-200/90 sm:grid-cols-3 sm:gap-6">
                  <p>Quase 15 anos de experiência</p>
                  <p>Atendimento em todo o Brasil</p>
                  <p>João Luiz Santana Daufenbach — OAB/PR 66.208</p>
                </div>
              </div>

              <aside className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm md:p-8">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                  Converse por WhatsApp
                </h2>
                <ul className="mt-5 divide-y divide-white/10">
                  {ATALHOS_WHATSAPP.map((item) => (
                    <li key={item.titulo}>
                      <a
                        href={whatsapp(item.mensagem)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-3 text-[14px] text-slate-100/90 transition-colors hover:text-cyan-300"
                      >
                        {item.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-green-600"
                >
                  <Phone size={16} />
                  Falar no WhatsApp
                </a>
                <p className="mt-5 text-[11.5px] leading-relaxed text-slate-300/75">
                  {SITE.responsavel} — {SITE.oab}
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Por onde começar"
              titulo="Você se aposenta pelo INSS ou é servidor público?"
              texto="Os benefícios são diferentes, os documentos são diferentes e o caminho também. Comece por aqui."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <CartaoRegime
                titulo="Aposentadoria do INSS"
                itens={BENEFICIOS_INSS}
                href="/seu-caso?regime=inss"
                acao="Ver os benefícios do INSS"
              />
              <CartaoRegime
                titulo="Aposentadoria de servidores públicos"
                itens={BENEFICIOS_SERVIDOR}
                href="/seu-caso?regime=servidor"
                acao="Ver os benefícios do servidor"
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              titulo="Aposentadorias do INSS"
              texto="Os benefícios do regime geral e o que precisa ser observado em cada um."
            />
            <GradeBeneficios itens={BENEFICIOS_INSS} />
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              titulo="Aposentadorias de servidores públicos"
              texto="O regime próprio de cada ente e os pontos que costumam passar em branco."
            />
            <GradeBeneficios itens={BENEFICIOS_SERVIDOR} />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              titulo="Além da aposentadoria"
              texto="Outros benefícios que analisamos, com o mesmo cuidado de sempre."
            />
            <GradeBeneficios itens={BENEFICIOS_ALEM} />
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao titulo="Quatro etapas, do histórico à concessão" />
            <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {ETAPAS.map((etapa, i) => (
                <li key={etapa.titulo}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-800 font-['Playfair_Display'] text-[16px] font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-['Playfair_Display'] text-lg font-bold leading-snug text-brand-800">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                    {etapa.texto}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-brand-900 py-16 text-white md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              claro
              titulo="Entenda antes de pedir"
              texto="O que mais custa caro não é a regra: é o detalhe que passa em branco na hora de pedir."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ALERTAS.map((alerta) => (
                <article
                  key={alerta.id}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <h3 className="font-['Playfair_Display'] text-[19px] font-bold leading-snug text-white">
                    {alerta.titulo}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-200/90">
                    {alerta.texto}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao titulo="Perguntas frequentes" />
            <Perguntas itens={FAQ_HOME} />
          </div>
        </section>

        <ChamadaFinal
          titulo="Vamos analisar o seu caso"
          texto="Conte o que aconteceu. Explicamos qual atendimento se aplica e quais informações são necessárias para continuar."
          mensagem={WHATSAPP_MENSAGENS.geral}
        />
      </main>

      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
