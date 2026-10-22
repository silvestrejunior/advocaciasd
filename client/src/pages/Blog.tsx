/**
 * Página: Conteúdo (blog).
 *
 * Reúne os artigos por tema, e cada tema aponta para a página de serviço
 * correspondente — o conteúdo alimenta o serviço, e o serviço dá sequência ao
 * conteúdo. É também a página que distribui a autoridade interna do site.
 */

import { Link } from "wouter";
import { ArrowRight, Clock, FileText } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp, TituloSecao } from "@/components/site/Sections";
import { ChamadaFinal } from "@/components/site/Servico";
import { Seo } from "@/components/site/Seo";
import { ARTIGOS, TEMAS } from "@/data/blog";
import { SERVICOS } from "@/data/servicos";
import { SITE, WHATSAPP_MENSAGENS } from "@/config/site";

function nomeDoServico(href: string) {
  return SERVICOS.find((servico) => servico.href === href);
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Conteúdo sobre aposentadorias e benefícios"
        descricao="Artigos sobre o que analisar em cada tipo de aposentadoria e benefício: documentos, prazos, perícia, tempo rural e tempo especial."
        caminho="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `Conteúdo — ${SITE.nomeCompleto}`,
          url: `${SITE.dominio}/blog`,
          inLanguage: "pt-BR",
          blogPost: ARTIGOS.slice(0, 10).map((artigo) => ({
            "@type": "BlogPosting",
            headline: artigo.titulo,
            url: `${SITE.dominio}/blog/${artigo.slug}`,
            datePublished: artigo.publicado,
          })),
        }}
      />
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-brand-950 pb-16 pt-28 text-white md:pb-20 md:pt-36">
          <div className="container mx-auto px-4">
            <nav aria-label="Você está aqui" className="text-[13px] text-slate-300/80">
              <Link href="/" className="hover:text-cyan-300">
                Início
              </Link>
              <span className="mx-2">›</span>
              <span className="text-cyan-200">Conteúdo</span>
            </nav>
            <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
              O que analisar antes de pedir, em cada tema
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-slate-200/90">
              Escrevemos sobre os pontos que costumam decidir um caso — os
              documentos que pesam, os prazos que não voltam e as decisões que
              não podem ser desfeitas. Sem explicação de regras: o foco é o que
              você precisa olhar no seu próprio histórico.
            </p>
            <p className="mt-6 text-[13.5px] text-slate-300/80">
              {ARTIGOS.length} artigos publicados · conteúdo conferido em
              outubro de 2026
            </p>
          </div>
        </section>

        {TEMAS.map((tema) => {
          const artigosDoTema = ARTIGOS.filter((artigo) => artigo.tema === tema.id);
          if (artigosDoTema.length === 0) return null;
          const servico = nomeDoServico(tema.servico);
          return (
            <section
              key={tema.id}
              className="border-b border-slate-100 py-14 even:bg-slate-50 md:py-16"
            >
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                      Tema
                    </p>
                    <h2 className="mt-2 font-['Playfair_Display'] text-2xl font-bold text-brand-800 md:text-3xl">
                      {tema.nome}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-slate-600">
                      {tema.descricao}
                    </p>
                  </div>
                  {servico?.href && (
                    <Link
                      href={servico.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-800 px-5 py-3 text-[13.5px] font-bold text-brand-800 transition-colors hover:bg-brand-800 hover:text-white"
                    >
                      Ver o serviço
                      <ArrowRight size={15} />
                    </Link>
                  )}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {artigosDoTema.map((artigo) => (
                    <Link
                      key={artigo.slug}
                      href={`/blog/${artigo.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_24px_45px_-24px_rgba(10,42,74,0.5)]"
                    >
                      <h3 className="font-['Playfair_Display'] text-[19px] font-bold leading-snug text-brand-800 transition-colors group-hover:text-cyan-700">
                        {artigo.titulo}
                      </h3>
                      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-700">
                        {artigo.resumo}
                      </p>
                      <span className="mt-5 flex items-center gap-4 text-[12.5px] text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {Math.max(3, Math.round(artigo.palavras / 200))} min de leitura
                        </span>
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
              </div>
            </section>
          );
        })}

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Como usar este conteúdo"
              titulo="Ler primeiro, decidir depois"
              texto="Os artigos apontam o que conferir. Quando o seu caso exigir decisão sobre prazo, cálculo ou destino de tempo, o próximo passo é a análise do seu histórico."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  titulo: "Confira o seu histórico",
                  texto:
                    "Antes de qualquer pedido, o extrato do CNIS mostra o que já está reconhecido e o que depende de prova.",
                },
                {
                  titulo: "Verifique os prazos",
                  texto:
                    "Negativa e cessação têm prazo curto. O artigo do tema indica o que olhar primeiro.",
                },
                {
                  titulo: "Decida com o caso analisado",
                  texto:
                    "Nas situações que envolvem escolha de regra, cálculo ou destino de tempo, a análise vem antes do pedido.",
                },
              ].map((item) => (
                <article key={item.titulo} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <FileText size={20} className="text-cyan-600" />
                  <h3 className="mt-4 font-['Playfair_Display'] text-lg font-bold text-brand-800">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                    {item.texto}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ChamadaFinal
          titulo="Quer conversar sobre o seu caso?"
          texto="Conte o que aconteceu. Explicamos qual atendimento se aplica e quais informações são necessárias para continuar."
          mensagem={WHATSAPP_MENSAGENS.geral}
        />
      </main>

      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}