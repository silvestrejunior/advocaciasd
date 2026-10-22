import { Link } from "wouter";
import { CheckCircle2, Phone, ArrowRight, Clock, Youtube } from "lucide-react";
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
import { ARTIGOS, temaPorId } from "@/data/blog";
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

/** Situações de entrada: cada uma leva à página que trata do assunto. */
const SITUACOES = [
  {
    href: "/pericia-negada",
    antes: "Minha ",
    destaque: "Perícia",
    depois: " foi negada",
    texto:
      "O motivo escrito da negativa define o próximo passo. Veja o que conferir antes de recorrer ou de pedir de novo.",
  },
  {
    href: "/tempo-rural",
    antes: "Preciso de ajuda com meu ",
    destaque: "Tempo Rural",
    depois: "",
    texto:
      "O período rural depende de prova material da época. Veja o que costuma ser aceito e o que enfraquece o pedido.",
  },
  {
    href: "/aposentadoria-especial",
    antes: "Estou com dificuldades no meu ",
    destaque: "Tempo Especial",
    depois: "",
    texto:
      "O tempo especial depende das atividades, do agente e das provas de cada vínculo. Veja o que é analisado.",
  },
] as const;

function CartaoBeneficio({ item }: { item: BeneficioRegime }) {
  return (
    <Link
      href={item.href ?? "/cuidados#alem"}
      className="group relative flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_10px_30px_-20px_rgba(10,42,74,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400 hover:shadow-[0_28px_55px_-24px_rgba(10,42,74,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 md:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <h3 className="font-['Playfair_Display'] text-[20px] font-bold leading-snug text-brand-800 transition-colors duration-300 group-hover:text-cyan-700">
        {item.titulo}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-slate-700">
        {item.oQueE}
      </p>
      <p className="mt-5 flex-1 border-l-4 border-l-cyan-500 bg-slate-50 px-4 py-3.5 text-[14px] leading-relaxed text-slate-700">
        {item.cuidado}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-bold text-cyan-700">
        Conhecer melhor
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        >
          →
        </span>
      </span>
    </Link>
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
        titulo="Aposentadoria: INSS e servidores públicos"
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
                <div className="mt-8">
                  <Link
                    href="/seu-caso"
                    className="pulsar-cta group inline-flex items-center gap-2.5 rounded-xl bg-cyan-400 px-9 py-4.5 text-[16px] font-bold text-brand-950 ring-2 ring-cyan-200/60 transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
                  >
                    Descobrir o meu caso
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
                <p className="mt-4 max-w-md text-[13.5px] font-medium text-cyan-200/90">
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

        <section className="border-y border-slate-100 bg-slate-50 py-14 md:py-16">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Comece por aqui"
              titulo="Como está o seu caso agora?"
              texto="Escolha a situação que mais se parece com a sua. Cada caminho mostra o que precisa ser analisado antes de qualquer pedido."
            />
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {SITUACOES.map((situacao) => (
                <Link
                  key={situacao.href}
                  href={situacao.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_24px_45px_-24px_rgba(10,42,74,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
                >
                  <p className="font-['Playfair_Display'] text-[21px] font-bold leading-snug text-brand-800">
                    {situacao.antes}
                    <span className="text-cyan-600 underline decoration-cyan-300 decoration-2 underline-offset-4 transition-colors duration-300 group-hover:text-cyan-700">
                      {situacao.destaque}
                    </span>
                    {situacao.depois}
                  </p>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-700">
                    {situacao.texto}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-cyan-700">
                    Ver o que analisamos
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
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
                href="/cuidados#inss"
                acao="Ver os cuidados de cada benefício"
              />
              <CartaoRegime
                titulo="Aposentadoria de servidores públicos"
                itens={BENEFICIOS_SERVIDOR}
                href="/cuidados#servidores"
                acao="Ver os cuidados de cada benefício"
              />
            </div>
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

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="O escritório"
              titulo="Quem atende e onde o seu caso é analisado"
              texto="O atendimento é feito pelo advogado responsável, com reuniões presenciais em Maringá ou a distância, conforme a sua preferência."
            />
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
              <figure className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
                <img
                  src="/images/escritorio-retrato.jpg"
                  alt={`${SITE.responsavel}, advogado responsável pelo escritório`}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-2xl object-cover object-top shadow-lg"
                />
                <figcaption className="mt-4 text-[13.5px] leading-relaxed text-slate-600">
                  <strong className="font-semibold text-brand-800">
                    {SITE.responsavel}
                  </strong>{" "}
                  — {SITE.oab}
                </figcaption>
              </figure>

              <div>
                <p className="max-w-2xl text-[15px] leading-relaxed text-slate-700">
                  Quase 15 anos de atuação em Direito Previdenciário, com leitura
                  do histórico, comparação dos caminhos possíveis e
                  acompanhamento do pedido até a decisão. O primeiro contato pode
                  ser por WhatsApp, telefone ou e-mail, sem envio de documentos.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <figure>
                    <img
                      src="/images/escritorio-sala-reuniao.jpg"
                      alt="Sala de reuniões do escritório, com vista para a cidade de Maringá"
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                    />
                    <figcaption className="mt-3 text-[13px] text-slate-600">
                      Sala de reuniões — atendimento presencial, com hora marcada
                    </figcaption>
                  </figure>
                  <figure>
                    <img
                      src="/images/escritorio-mesa.jpg"
                      alt="Mesa de trabalho usada na análise dos documentos do caso"
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                    />
                    <figcaption className="mt-3 text-[13px] text-slate-600">
                      Análise do histórico e dos documentos de cada caso
                    </figcaption>
                  </figure>
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-brand-800">
                    Onde fica
                  </h3>
                  <dl className="mt-4 space-y-2 text-[14px] leading-relaxed text-slate-700">
                    <div className="flex flex-wrap gap-1.5">
                      <dt className="font-semibold text-slate-900">Endereço:</dt>
                      <dd>{SITE.endereco.completo}</dd>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <dt className="font-semibold text-slate-900">Horário:</dt>
                      <dd>{SITE.horario}</dd>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <dt className="font-semibold text-slate-900">
                        Atendimento a distância:
                      </dt>
                      <dd>
                        para todo o Brasil, por WhatsApp, telefone ou e-mail
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <iframe
                      title="Localização do escritório no mapa"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.8!2d-51.9390426!3d-23.4175294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd77c609e3a41%3A0x72d87afb95517515!2sSantana+Daufenbach+Advocacia!5e0!3m2!1spt-BR!2sbr!4v1748000000000!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="260"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand-900 py-16 text-white md:py-20">
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

<section className="relative overflow-hidden bg-brand-950 py-16 text-white md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  <Youtube size={16} />
                  Canal do escritório
                </p>
                <h2 className="mt-4 font-['Playfair_Display'] text-3xl font-bold leading-tight md:text-4xl">
                  Também explicamos em vídeo
                </h2>
                <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-slate-200/90">
                  No canal tratamos das mesmas dúvidas que aparecem no
                  atendimento: o que a perícia observa, o que pesa na análise do
                  tempo especial e como se lê uma negativa. É a forma mais direta
                  de conhecer o escritório antes de falar com a gente.
                </p>
                <a
                  href={SITE.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 transition-colors hover:bg-cyan-300"
                >
                  <Youtube size={18} />
                  Acessar o canal
                </a>
                <p className="mt-4 text-[13px] text-slate-300/80">
                  {SITE.youtubeNome}
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Por que acompanhar
                </p>
                <ul className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-slate-200/90">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span>Casos explicados sem juridiquês.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span>Alertas sobre prazos e decisões que não voltam.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span>Conteúdo para quem já fez o pedido e para quem está começando.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Conteúdo"
              titulo="O que analisar antes de decidir"
              texto="Escrevemos sobre os pontos que costumam decidir um caso, tema por tema."
            />
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {ARTIGOS.slice(0, 3).map((artigo) => (
                <Link
                  key={artigo.slug}
                  href={`/blog/${artigo.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_24px_45px_-24px_rgba(10,42,74,0.5)]"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                    {temaPorId(artigo.tema)?.nome ?? "Conteúdo"}
                  </span>
                  <h3 className="mt-3 font-['Playfair_Display'] text-[19px] font-bold leading-snug text-brand-800 transition-colors group-hover:text-cyan-700">
                    {artigo.titulo}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-700">
                    {artigo.resumo}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-slate-500">
                    <Clock size={14} />
                    {Math.max(3, Math.round(artigo.palavras / 200))} min de leitura
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-bold text-cyan-700">
                    Ler o artigo
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-9 inline-flex items-center gap-2 text-[14.5px] font-bold text-brand-800 hover:text-cyan-700"
            >
              Ver todo o conteúdo
              <ArrowRight size={16} />
            </Link>
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
