import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp, Perguntas, TituloSecao, Trilha } from "@/components/site/Sections";
import { ChamadaFinal, SeoServico } from "@/components/site/Servico";
import { breadcrumbJsonLd } from "@/components/site/Seo";
import {
  ALERTAS,
  BENEFICIOS_ALEM,
  BENEFICIOS_INSS,
  BENEFICIOS_SERVIDOR,
  ETAPAS,
  type BeneficioRegime,
} from "@/data/regimes";
import { AVISO_DOCUMENTOS, FAQ_ATENDIMENTO } from "@/data/servicos";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Cuidados antes de pedir", href: "/cuidados" },
];

const NAVEGACAO = [
  { id: "inss", label: "Aposentadorias do INSS" },
  { id: "servidores", label: "Servidores públicos" },
  { id: "alem", label: "Além da aposentadoria" },
  { id: "alertas", label: "Alertas que valem para todos" },
];

function CartaoCuidado({ item }: { item: BeneficioRegime }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-7">
      <h3 className="font-['Playfair_Display'] text-[19px] font-bold leading-snug text-brand-800">
        {item.titulo}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-slate-700">
        {item.oQueE}
      </p>
      <div className="mt-5 flex-1 border-l-4 border-l-cyan-500 bg-slate-50 px-4 py-3.5">
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

function GradeCuidados({ itens }: { itens: BeneficioRegime[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {itens.map((item) => (
        <CartaoCuidado key={item.id} item={item} />
      ))}
    </div>
  );
}

function Encaminhamento({
  titulo,
  texto,
  mensagem,
}: {
  titulo: string;
  texto: string;
  mensagem: string;
}) {
  return (
    <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 border-t-4 border-t-cyan-500 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
      <div>
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
          {titulo}
        </h3>
        <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-slate-600">
          {texto}
        </p>
      </div>
      <a
        href={whatsapp(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-green-500 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-green-600"
      >
        <Phone size={16} />
        Falar no WhatsApp
      </a>
    </div>
  );
}

export default function Cuidados() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Cuidados antes de pedir a aposentadoria"
        descricao="Os cuidados práticos de cada benefício do INSS e de servidores públicos: o que costuma decidir o resultado antes de dar entrada no pedido."
        caminho="/cuidados"
        jsonLd={breadcrumbJsonLd([
          { label: "Início", href: "/" },
          { label: "Cuidados antes de pedir", href: "/cuidados" },
        ])}
      />
      <SiteHeader sobreHeroEscuro />

      <main>
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-14 pt-32 text-white md:pb-16 md:pt-40">
          <div className="container mx-auto px-4">
            <Trilha itens={TRILHA} />
            <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
              Os cuidados de cada benefício, antes de dar entrada
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
              As regras são conhecimento básico. O que muda o resultado é o
              detalhe: o período que não aparece no extrato, o documento genérico
              que a perícia recusa, o mês em que o pedido é feito. Cada benefício
              abaixo traz o cuidado que costuma decidir o caso.
            </p>
            <p className="mt-5 text-[14px] leading-relaxed text-slate-300/85">
              {AVISO_DOCUMENTOS}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/seu-caso"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 transition-colors hover:bg-cyan-300"
              >
                Descobrir o meu caso
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-[14px] font-bold text-white transition-colors hover:bg-white/20"
              >
                <Phone size={16} />
                Falar com o escritório
              </a>
            </div>
          </div>
        </section>

        {/* Navegação curta entre os blocos da própria página */}
        <nav
          aria-label="Ir para um bloco"
          className="border-b border-slate-200 bg-slate-50"
        >
          <div className="container mx-auto flex flex-wrap gap-x-6 gap-y-2 px-4 py-4 text-[13.5px] font-semibold text-brand-800">
            {NAVEGACAO.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="transition-colors hover:text-cyan-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section id="inss" className="scroll-mt-24 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Regime geral"
              titulo="Aposentadorias do INSS"
              texto="Os benefícios do regime geral e o cuidado que precisa ser observado em cada um deles."
            />
            <GradeCuidados itens={BENEFICIOS_INSS} />
            <Encaminhamento
              titulo="Quer saber quais desses cuidados se aplicam ao seu caso?"
              texto="Responda duas perguntas e veja os benefícios e os cuidados da sua situação, ou fale direto com o escritório."
              mensagem={WHATSAPP_MENSAGENS.inss}
            />
          </div>
        </section>

        <section
          id="servidores"
          className="scroll-mt-24 bg-slate-50 py-16 md:py-20"
        >
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Regimes próprios"
              titulo="Aposentadorias de servidores públicos"
              texto="Cada ente tem regras e caminhos próprios. Estes são os pontos que costumam passar em branco no serviço público."
            />
            <GradeCuidados itens={BENEFICIOS_SERVIDOR} />
            <Encaminhamento
              titulo="Servidor público com dúvida sobre o seu regime?"
              texto="Informe o seu ente e a sua situação no primeiro contato. Explicamos o que a análise envolve antes de qualquer contratação."
              mensagem={WHATSAPP_MENSAGENS.servidor}
            />
          </div>
        </section>

        <section id="alem" className="scroll-mt-24 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Além da aposentadoria"
              titulo="Outros benefícios e seus cuidados"
              texto="Benefícios que não são aposentadoria, mas que também dependem de detalhes que passam em branco."
            />
            <GradeCuidados itens={BENEFICIOS_ALEM} />
          </div>
        </section>

        <section
          id="alertas"
          className="relative scroll-mt-24 overflow-hidden bg-brand-900 py-16 text-white md:py-20"
        >
          <img
            src="/images/escritorio-sala.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/85 to-brand-800/80"
          />
          <div className="relative container mx-auto px-4">
            <TituloSecao
              claro
              titulo="Alertas que valem para qualquer caso"
              texto="Antes de discutir regras, estes quatro pontos decidem mais do que qualquer outro detalhe."
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
            <TituloSecao
              sobretitulo="Como isso entra na análise"
              titulo="Do cuidado identificado até o pedido"
              texto="Cada alerta acima vira uma providência concreta nas quatro etapas do atendimento."
            />
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
            <p className="mt-8 text-[14px] leading-relaxed text-slate-600">
              O atendimento é feito em {SITE.endereco.linha3}, com possibilidade
              de acompanhamento a distância para todo o Brasil. Veja também{" "}
              <Link
                href="/servicos"
                className="font-semibold text-cyan-700 hover:text-cyan-800"
              >
                todos os serviços
              </Link>{" "}
              ou{" "}
              <Link
                href="/como-funciona"
                className="font-semibold text-cyan-700 hover:text-cyan-800"
              >
                como funciona o atendimento
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao titulo="Perguntas frequentes" />
            <Perguntas itens={FAQ_ATENDIMENTO} />
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