import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  Perguntas,
  TituloSecao,
} from "@/components/site/Sections";
import { ChamadaFinal, SeoServico } from "@/components/site/Servico";
import { BannerPrincipal } from "@/components/site/BannerPrincipal";
import {
  CasosAgora,
  AtuacaoEscritorio,
  BeneficiosCompactos,
} from "@/components/site/HomeAreas";
import { YoutubeDestaque } from "@/components/site/YoutubeDestaque";
import { faqJsonLd } from "@/components/site/Seo";
import { ALERTAS, FAQ_HOME } from "@/data/regimes";
import { ARTIGOS, temaPorId } from "@/data/blog";
import { WHATSAPP_MENSAGENS, SITE } from "@/config/site";

/** Home editorial azul: apresentação, situação, atuação, benefícios e vídeo. */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Advogado previdenciário em Maringá"
        descricao="Análise de aposentadorias e benefícios do INSS e de regimes próprios, com cuidado prático desde o histórico até o pedido."
        caminho="/"
        palavrasChave="advogado previdenciário Maringá, aposentadoria INSS, aposentadoria servidor público, benefício negado, tempo rural, tempo especial"
        jsonLd={faqJsonLd(FAQ_HOME)}
      />
      <SiteHeader sobreHeroEscuro />
      <main>
        <BannerPrincipal />
        <CasosAgora />
        <AtuacaoEscritorio />
        <BeneficiosCompactos />
        <YoutubeDestaque />
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
                  src="/images/escritorio-retrato.webp"
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
                  Quase 15 anos de atuação em Direito Previdenciário, com
                  leitura do histórico, comparação dos caminhos possíveis e
                  acompanhamento do pedido até a decisão. O primeiro contato
                  pode ser por WhatsApp, telefone ou e-mail, sem envio de
                  documentos.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <figure>
                    <img
                      src="/images/escritorio-sala-reuniao.webp"
                      alt="Sala de reuniões do escritório, com vista para a cidade de Maringá"
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                    />
                    <figcaption className="mt-3 text-[13px] text-slate-600">
                      Sala de reuniões — atendimento presencial, com hora
                      marcada
                    </figcaption>
                  </figure>
                  <figure>
                    <img
                      src="/images/escritorio-mesa.webp"
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
                      <dt className="font-semibold text-slate-900">
                        Endereço:
                      </dt>
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
            src="/images/escritorio-sala.webp"
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
              {ALERTAS.map(alerta => (
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

        <section className="border-y border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Conteúdo"
              titulo="O que analisar antes de decidir"
              texto="Escrevemos sobre os pontos que costumam decidir um caso, tema por tema."
            />
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {ARTIGOS.slice(0, 3).map(artigo => (
                <Link
                  key={artigo.slug}
                  href={`/blog/${artigo.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_24px_45px_-24px_rgba(10,42,74,0.5)] overflow-hidden"
                >
                  {artigo.imagem && (
                    <img
                      src={artigo.imagem}
                      alt={artigo.titulo}
                      loading="lazy"
                      className="-mx-6 -mt-6 mb-5 h-44 w-[calc(100%+3rem)] rounded-t-2xl object-cover"
                    />
                  )}

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
                    {Math.max(3, Math.round(artigo.palavras / 200))} min de
                    leitura
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
      <BotaoWhatsApp respeitarBanner />
    </div>
  );
}
