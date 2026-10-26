/**
 * Página: artigo do blog (/blog/:slug).
 *
 * Cada artigo existe para responder a uma dúvida prática e levar a dois
 * lugares: a página de serviço do tema e o contato. Traz dados estruturados de
 * artigo e de perguntas frequentes, que é o que permite aparecer com rich
 * results na busca.
 */

import { Link, useRoute } from "wouter";
import { ArrowRight, Clock, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp, Perguntas } from "@/components/site/Sections";
import { ChamadaFinal } from "@/components/site/Servico";
import { Seo, faqJsonLd } from "@/components/site/Seo";
import NotFound from "@/pages/NotFound";
import { ARTIGOS, artigoPorSlug } from "@/data/blog";
import { SERVICOS } from "@/data/servicos";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const dataPorExtenso = (iso: string) => {
  const [ano, mes, dia] = iso.split("-");
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return `${Number(dia)} de ${meses[Number(mes) - 1]} de ${ano}`;
};

export default function Artigo() {
  const [, parametros] = useRoute<{ slug: string }>("/blog/:slug");
  const artigo = parametros?.slug ? artigoPorSlug(parametros.slug) : undefined;

  if (!artigo) return <NotFound />;

  const servico = SERVICOS.find(item => item.href === artigo.servico);
  const relacionados = ARTIGOS.filter(
    item => item.slug !== artigo.slug && item.tema === artigo.tema
  ).slice(0, 2);
  const outros = ARTIGOS.filter(
    item => item.slug !== artigo.slug && item.tema !== artigo.tema
  ).slice(0, 3 - relacionados.length);
  const continuar = [...relacionados, ...outros];

  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo={artigo.titulo}
        descricao={artigo.resumo}
        caminho={`/blog/${artigo.slug}`}
        tipo="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: artigo.titulo,
            description: artigo.resumo,
            datePublished: artigo.publicado,
            dateModified: artigo.publicado,
            inLanguage: "pt-BR",
            author: {
              "@type": "Person",
              name: SITE.responsavel,
              jobTitle: "Advogado",
            },
            publisher: {
              "@type": "Organization",
              name: SITE.nomeCompleto,
            },
            mainEntityOfPage: `${SITE.dominio}/blog/${artigo.slug}`,
            keywords: artigo.palavrasChave.join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: `${SITE.dominio}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Conteúdo",
                item: `${SITE.dominio}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: artigo.titulo,
                item: `${SITE.dominio}/blog/${artigo.slug}`,
              },
            ],
          },
          faqJsonLd(artigo.perguntas),
        ]}
      />
      <SiteHeader />

      <main>
        <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-28 md:pb-16 md:pt-36">
          <div className="container mx-auto px-4">
            <nav
              aria-label="Você está aqui"
              className="text-[13px] text-slate-500"
            >
              <Link href="/" className="hover:text-cyan-700">
                Início
              </Link>
              <span className="mx-2">›</span>
              <Link href="/blog" className="hover:text-cyan-700">
                Conteúdo
              </Link>
              <span className="mx-2">›</span>
              <span className="text-slate-700">{artigo.titulo}</span>
            </nav>
            <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-3xl font-bold leading-tight text-brand-800 md:text-[42px]">
              {artigo.titulo}
            </h1>
            <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-slate-700">
              {artigo.resumo}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {Math.max(3, Math.round(artigo.palavras / 200))} min de leitura
              </span>
              <span>Conferido em {dataPorExtenso(artigo.publicado)}</span>
              <span>
                {SITE.responsavel} — {SITE.oab}
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {artigo.secoes.map(secao => (
                <div key={secao.titulo} className="mt-10 first:mt-0">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold leading-snug text-brand-800">
                    {secao.titulo}
                  </h2>
                  {secao.paragrafos?.map(paragrafo => (
                    <p
                      key={paragrafo.slice(0, 40)}
                      className="mt-4 text-[16px] leading-relaxed text-slate-700"
                    >
                      {paragrafo}
                    </p>
                  ))}
                  {secao.lista && (
                    <ul className="mt-5 space-y-3">
                      {secao.lista.map(item => (
                        <li
                          key={item.slice(0, 40)}
                          className="flex items-start gap-3 text-[15.5px] leading-relaxed text-slate-700"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                  Próximo passo
                </p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slate-700">
                  O que decide o seu caso está no seu histórico, não no texto.
                  Se quiser entender o que se aplica à sua situação, fale com o
                  escritório — você não precisa enviar documentos neste primeiro
                  contato.
                </p>
                <a
                  href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3.5 text-[14.5px] font-bold text-white transition-colors hover:bg-green-600"
                >
                  <Phone size={16} />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {artigo.perguntas.length > 0 && (
          <section className="border-y border-slate-100 bg-slate-50 py-14 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-brand-800 md:text-3xl">
                Perguntas frequentes
              </h2>
              <div className="mt-7">
                <Perguntas itens={artigo.perguntas} />
              </div>
            </div>
          </section>
        )}

        {servico?.href && (
          <section className="py-14 md:py-16">
            <div className="container mx-auto px-4">
              <div className="rounded-2xl border border-brand-800/15 border-t-4 border-t-cyan-500 bg-white p-7 shadow-sm md:p-9">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                  Serviço relacionado
                </p>
                <h2 className="mt-3 font-['Playfair_Display'] text-2xl font-bold text-brand-800">
                  {servico.nome}
                </h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-700">
                  {servico.resumo}
                </p>
                <Link
                  href={servico.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-800 px-6 py-3.5 text-[14.5px] font-bold text-white transition-colors hover:bg-brand-700"
                >
                  {servico.acao === "analise"
                    ? "Entender a análise"
                    : "Conhecer o serviço"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {continuar.length > 0 && (
          <section className="border-t border-slate-100 py-14 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-brand-800 md:text-3xl">
                Continue lendo
              </h2>
              <div className="mt-7 grid gap-6 md:grid-cols-3">
                {continuar.map(item => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg"
                  >
                    <h3 className="font-['Playfair_Display'] text-[18px] font-bold leading-snug text-brand-800 group-hover:text-cyan-700">
                      {item.titulo}
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-700">
                      {item.resumo}
                    </p>
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
                className="mt-8 inline-flex items-center gap-2 py-1.5 text-[14px] font-bold text-brand-800 hover:text-cyan-700"
              >
                Ver todo o conteúdo
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        )}

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
