import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Clock, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  FaixaCta,
  Perguntas,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd, faqJsonLd } from "@/components/site/Seo";
import { artigosDoTema, temaPorId } from "@/data/blog";
import type { PerguntaFrequente } from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Aposentadoria especial" },
];

/** Data da última conferência das referências citadas nesta página. */
const REVISAO = "24 de outubro de 2026";

/** Artigos do tema, do mais recente para o mais antigo. */
const ARTIGOS_ESPECIAL = artigosDoTema("aposentadoria-especial");

/** Temas que costumam acompanhar o tempo especial. */
const TEMAS_RELACIONADOS = [
  { nome: "Perícia negada", href: "/pericia-negada" },
  { nome: "Aposentadoria negada", href: "/aposentadoria-negada" },
  { nome: "Tempo rural", href: "/tempo-rural" },
  { nome: "Servidores públicos", href: "/servidores-publicos" },
  { nome: "Benefícios por incapacidade", href: "/beneficios-por-incapacidade" },
  { nome: "Cuidados antes de pedir", href: "/cuidados" },
];

/** Passos mostrados na chamada para ação. */
const ETAPAS_CTA = [
  {
    titulo: "Você conta o que aconteceu",
    texto:
      "As empresas, as funções e o que você fazia no dia a dia. Nesta etapa, nenhum documento é necessário.",
  },
  {
    titulo: "Lemos o seu histórico",
    texto:
      "CNIS, carteira de trabalho, PPP e o que já foi pedido no INSS ou no órgão do servidor.",
  },
  {
    titulo: "Dizemos o que é possível",
    texto:
      "O que sustenta o seu tempo de exposição, o que falta reunir e qual caminho seguir a partir daí.",
  },
];

type Mudanca = {
  orgao: string;
  data: string;
  titulo: string;
  resumo: string;
  pratica: string[];
  link: string;
  href?: string;
  whatsappTexto?: string;
};

/** Decisões recentes que alteraram a análise do tempo especial. */
const MUDANCAS: Mudanca[] = [
  {
    orgao: "STF",
    data: "junho de 2026",
    titulo: "A idade mínima deixou de ser exigida",
    resumo:
      "O Supremo declarou inconstitucional a exigência de idade mínima para a aposentadoria especial, afastando as idades de 55, 58 e 60 anos criadas pela reforma. Quem já tinha o tempo de exposição completo e foi barrado apenas pela idade tem motivo para reavaliar a sua situação agora.",
    pratica: [
      "O tempo de exposição continua sendo exigido: 15, 20 ou 25 anos, conforme a atividade e o agente.",
      "A comprovação da exposição segue obrigatória, com o PPP e os documentos técnicos de cada vínculo.",
      "A forma de cálculo da reforma foi mantida — o benefício não corresponde necessariamente a 100% da média.",
    ],
    whatsappTexto:
      "Olá, vim pelo site e quero saber se a decisão do STF sobre a idade mínima muda o meu caso na aposentadoria especial.",
    link: "Tirar uma dúvida sobre a minha situação",
  },
  {
    orgao: "TNU",
    data: "setembro de 2026",
    titulo: "EPI eficaz no PPP deixou de barrar quem atua em setores críticos",
    resumo:
      "No Tema 383, a Turma Nacional de Uniformização distinguiu as atividades de maior risco. Para quem realiza ou auxilia procedimentos que geram aerossol, atende urgência e emergência em setores críticos ou trabalha em alas de pacientes infectocontagiosos, a anotação de EPI eficaz no PPP não impede o reconhecimento do tempo especial.",
    pratica: [
      "Alcança médicos, enfermeiros, técnicos e auxiliares de enfermagem, fisioterapeutas e farmacêuticos, entre outros profissionais.",
      "Exemplos citados na decisão: intubação, aspiração de vias aéreas e broncoscopia; UTI, pronto-socorro e centro cirúrgico.",
      "Fora dessas hipóteses, a anotação de EPI eficaz só é afastada com impugnação específica e fundamentada (Temas 213 da TNU e 1.090 do STJ).",
    ],
    href: "/blog/epi-eficaz-quando-afasta-o-tempo-especial",
    link: "Ler o artigo sobre EPI eficaz",
  },
];

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

const DECIDIU_STF = {
  mudou: [
    "A idade mínima deixou de ser exigida: a decisão afastou as idades de 55, 58 e 60 anos criadas pela reforma para a aposentadoria especial.",
    "Quem já tinha o tempo de exposição completo e foi barrado apenas pela idade precisa reavaliar a sua situação.",
  ],
  permaneceu: [
    "A comprovação da efetiva exposição continua obrigatória: 15, 20 ou 25 anos, conforme a atividade e o agente.",
    "A forma de cálculo da reforma foi mantida — o benefício não corresponde necessariamente a 100% da média.",
    "A conversão de tempo especial em tempo comum continua vedada para períodos trabalhados depois da reforma.",
  ],
  ressalva:
    "A decisão não resolveu expressamente a regra de transição por pontos, e admite esclarecimentos posteriores. Por isso a análise precisa considerar o período de cada vínculo e a data em que os requisitos foram preenchidos.",
};

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "O nome do meu cargo já garante a aposentadoria especial?",
    resposta:
      "Não. A profissão é o ponto de partida, mas o enquadramento depende do período trabalhado, do agente a que houve exposição e das provas de cada vínculo. O nome do cargo, isoladamente, não substitui essa análise.",
  },
  {
    pergunta: "Recebo adicional de insalubridade. Isso resolve?",
    resposta:
      "Não. O adicional é uma questão trabalhista e não substitui a análise previdenciária da exposição e dos documentos. É possível ter adicional na folha e não conseguir o tempo especial — e o contrário também acontece.",
  },
  {
    pergunta: "Trabalhei exposto, mas não tenho o PPP. Perdi o direito?",
    resposta:
      "Não necessariamente. O PPP é o documento principal, mas existem outras formas de comprovar o período, que dependem de quais documentos sobreviveram e de quanto tempo passou. Informe a empresa e o período: avaliamos as possibilidades.",
  },
  {
    pergunta: "Preciso levar documentos no primeiro contato?",
    resposta:
      "Não. O primeiro contato serve para entender a sua situação e explicar o atendimento. Depois, indicamos exatamente quais documentos serão necessários para o serviço contratado.",
  },
  {
    pergunta: "Vale pedir agora ou esperar a definição sobre a idade mínima?",
    resposta:
      "Depende do seu histórico. Quem já completou o tempo de exposição e foi barrado apenas pela idade tem motivos para verificar a sua situação agora. Além disso, esperar pode fazer você perder uma regra que ainda está disponível.",
  },
  {
    pergunta: "Como funcionam os honorários?",
    resposta:
      "Dependem do trabalho necessário em cada caso. Antes da contratação, apresentamos uma proposta com o que está incluído, os valores e as condições de pagamento.",
  },
];

export default function AposentadoriaEspecial() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Aposentadoria especial: o que saber antes de pedir"
        descricao="Tempo especial: 15, 20 ou 25 anos de exposição, sem idade mínima. Veja o que analisamos em cada vínculo e os artigos sobre PPP, ruído e agentes biológicos."
        caminho="/aposentadoria-especial"
        palavrasChave="aposentadoria especial, tempo especial, aposentadoria especial 25 anos, PPP, agentes biológicos, ruído, EPI eficaz"
        imagem="/images/og-tempo-especial.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Aposentadoria especial: o que saber antes de pedir",
            description:
              "Tempo especial: 15, 20 ou 25 anos de exposição, sem idade mínima. O que analisamos em cada vínculo e as decisões recentes do STF e da TNU.",
            url: `${SITE.dominio}/aposentadoria-especial`,
            inLanguage: "pt-BR",
            dateModified: "2026-10-24",
            isPartOf: {
              "@type": "WebSite",
              name: SITE.nomeCompleto,
              url: SITE.dominio,
            },
            about: [
              { "@type": "Thing", name: "Aposentadoria especial" },
              { "@type": "Thing", name: "Tempo especial" },
              { "@type": "Thing", name: "Agentes nocivos" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Análise de aposentadoria especial",
            serviceType: "Advocacia previdenciária",
            provider: {
              "@type": "LegalService",
              name: SITE.nomeCompleto,
              url: SITE.dominio,
            },
            areaServed: { "@type": "Country", name: "Brasil" },
            url: `${SITE.dominio}/aposentadoria-especial`,
          },
          faqJsonLd(PERGUNTAS),
          breadcrumbJsonLd([
            { label: "Início", href: "/" },
            { label: "Aposentadoria no INSS", href: "/aposentadoria-inss" },
            {
              label: "Aposentadoria especial",
              href: "/aposentadoria-especial",
            },
          ]),
        ]}
      />
      <SiteHeader sobreHeroEscuro />

      {/* --------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-brand-950 pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <img
          src="/images/hero-especial.webp"
          alt="Profissional de saúde de 50 anos em ambiente hospitalar, exposta a agentes biológicos"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-65 md:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-900/60" />
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-4xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            <span className="text-cyan-300">Aposentadoria Especial</span>: o que
            você precisa saber antes de pedir.
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-cyan-100">
            Quem trabalhou exposto a ruído, calor, produtos químicos ou agentes
            biológicos pode ter direito à aposentadoria especial: 15, 20 ou 25
            anos de exposição, conforme a atividade e o agente — e, desde a
            decisão do Supremo em 2026, sem exigência de idade mínima.
          </p>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-200/90">
            O que decide o pedido não é o nome do cargo. É o que os documentos
            conseguem demonstrar sobre cada vínculo: o agente, o período e a
            intensidade da exposição.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsapp(
                "Olá, vim pelo site e gostaria de saber se o meu tempo de trabalho com exposição pode ser reconhecido."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
            >
              <Phone size={17} />
              Quero saber se o meu caso é analisável
            </a>
            <a
              href="#conteudo"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
            >
              Ler os artigos sobre o direito
            </a>
          </div>
          <p className="mt-5 text-[14px] leading-relaxed text-slate-300/80">
            Você não precisa enviar documentos neste primeiro contato.
          </p>
        </div>
      </section>

      {/* ------------------------------------------- Últimas mudanças */}
      <section id="mudancas" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Últimas mudanças"
            titulo="O que mudou no direito à aposentadoria especial"
            texto="As decisões recentes que alteram a forma de analisar o tempo especial, com o que cada uma significa na prática — e o que continua igual."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {MUDANCAS.map(mudanca => (
              <article
                key={mudanca.titulo}
                className="flex h-full flex-col rounded-2xl border border-slate-200 border-t-4 border-t-cyan-500 bg-white p-7 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">
                    {mudanca.orgao}
                  </span>
                  <span className="text-[12.5px] text-slate-500">
                    {mudanca.data}
                  </span>
                </div>
                <h3 className="mt-4 font-['Playfair_Display'] text-[21px] font-bold leading-snug text-brand-800">
                  {mudanca.titulo}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-700">
                  {mudanca.resumo}
                </p>
                <div className="mt-5 rounded-xl border-l-4 border-l-cyan-500 bg-slate-50 px-5 py-4">
                  <h4 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                    Na prática
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {mudanca.pratica.map(item => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[14px] leading-relaxed text-slate-700"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-cyan-600"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {mudanca.href ? (
                  <Link
                    href={mudanca.href}
                    className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
                  >
                    {mudanca.link}
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <a
                    href={whatsapp(mudanca.whatsappTexto ?? "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
                  >
                    {mudanca.link}
                    <ArrowRight size={15} />
                  </a>
                )}
              </article>
            ))}
          </div>
          <p className="mt-6 text-[12.5px] leading-relaxed text-slate-500">
            Referências conferidas em {REVISAO}. A aplicação ao seu caso depende
            dos períodos trabalhados e da documentação de cada vínculo.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- Conteúdo (blog) */}
      <section
        id="conteudo"
        className="scroll-mt-24 border-b border-slate-100 bg-slate-50 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Conteúdo"
            titulo="Os principais artigos sobre aposentadoria especial"
            texto="Cada artigo trata de um ponto que costuma decidir o reconhecimento do tempo especial — do PPP ao ruído, dos agentes biológicos à empresa que fechou as portas."
          />
          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTIGOS_ESPECIAL.slice(0, 6).map(artigo => (
              <Link
                key={artigo.slug}
                href={`/blog/${artigo.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_24px_45px_-24px_rgba(10,42,74,0.5)]"
              >
                {artigo.imagem && (
                  <img
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
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
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-800 px-5 py-3 text-[13.5px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
            >
              Ver todos os conteúdos
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-cyan-700">
              Veja também
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {TEMAS_RELACIONADOS.map(tema => (
                <Link
                  key={tema.href}
                  href={tema.href}
                  className="rounded-full border border-slate-300 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:bg-cyan-50 hover:text-brand-800"
                >
                  {tema.nome}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Chamada para ação */}
      <section
        id="analise"
        className="relative isolate scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white md:py-24"
      >
        <img
          src="/images/especial-apoio.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/95 to-brand-900/80" />
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Análise do seu caso
              </p>
              <h2 className="mt-4 font-['Playfair_Display'] text-3xl font-bold leading-tight md:text-[42px]">
                Você não trabalhou a vida inteira pra aposentar de qualquer
                jeito.
              </h2>
              <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-slate-200/90">
                Exposição que não aparece no papel costuma custar o benefício.
                Conte em quais empresas você trabalhou e o que fazia na prática:
                lemos o seu histórico, apontamos o que sustenta o seu tempo de
                exposição e o que ainda precisa ser buscado — antes de qualquer
                pedido.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={whatsapp(
                    "Olá, vim pelo site e gostaria de falar sobre o meu caso de aposentadoria especial."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
                >
                  <Phone size={17} />
                  Quero falar sobre o meu caso
                </a>
                <Link
                  href="/seu-caso"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
                >
                  Descobrir o meu caso
                </Link>
              </div>
              <p className="mt-6 text-[13.5px] leading-relaxed text-slate-300/80">
                Você não precisa enviar documentos neste primeiro contato.
                Atendimento em todo o Brasil, sem sair de casa.
              </p>
            </div>
            <ul className="grid gap-4">
              {ETAPAS_CTA.map((etapa, indice) => (
                <li
                  key={etapa.titulo}
                  className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 p-5"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400 text-[15px] font-bold text-brand-950">
                    {indice + 1}
                  </span>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-[18px] font-bold text-white">
                      {etapa.titulo}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-200/85">
                      {etapa.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FAQ */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Antes de decidir"
            titulo="Perguntas que costumam vir antes do contato"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      {/* ---------------------------------------------- Outros caminhos */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 md:p-9">
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
              Não sabe se o seu caso é de tempo especial?
            </h2>
            <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-slate-600">
              Se você trabalhou em ambiente com ruído, calor, produtos químicos,
              agentes biológicos ou risco elétrico, vale uma conversa. Se você é
              servidor público, as regras de exposição também existem, com
              exigências próprias de tempo de serviço.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/aposentadoria-inss"
                className="rounded-lg border border-brand-800 px-5 py-3 text-[13.5px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
              >
                Ver todas as aposentadorias do INSS
              </Link>
              <Link
                href="/servicos"
                className="rounded-lg border border-brand-800 px-5 py-3 text-[13.5px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
              >
                Sou servidor público
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaixaCta
        titulo="Vamos analisar o seu tempo de exposição"
        texto="Conte em quais empresas você trabalhou e em que função. Indicamos o que é necessário para a análise — e você não precisa enviar documentos agora."
        mensagem={WHATSAPP_MENSAGENS.geral}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
