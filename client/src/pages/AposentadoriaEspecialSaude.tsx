/**
 * Página: aposentadoria especial para profissionais da saúde
 * (/aposentadoria-especial-saude).
 *
 * Mesma estrutura e mesmos componentes de /aposentadoria-especial, com o
 * conteúdo voltado a quem trabalha em hospital, clínica, laboratório ou
 * consultório. O topo usa a mesma foto com sobreposição azul da página de
 * aposentadoria especial, cada profissão tem a sua foto e todos os botões de
 * WhatsApp usam a mensagem própria desta página.
 */

import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  Perguntas,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd, faqJsonLd } from "@/components/site/Seo";
import type { PerguntaFrequente } from "@/data/previdenciario";
import { SITE, whatsapp } from "@/config/site";

/** Mensagem única de WhatsApp desta página. */
const MENSAGEM_SAUDE =
  "Olá, vim pela página de aposentadoria especial na saúde e gostaria de falar sobre o meu caso.";
const WHATSAPP_SAUDE = whatsapp(MENSAGEM_SAUDE);

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Aposentadoria especial", href: "/aposentadoria-especial" },
  { label: "Profissionais da saúde" },
];

/** Data da última conferência das referências citadas nesta página. */
const REVISAO = "3 de novembro de 2026";

/* ------------------------------------------------------- Bloco 2: profissões */

type Profissao = {
  nome: string;
  linha: string;
  imagem: string;
  imagemAlt: string;
};

const PROFISSOES: Profissao[] = [
  {
    nome: "Enfermeiro(a)",
    imagem: "/images/saude-enfermeiro.webp",
    imagemAlt:
      "Enfermeira de 50 anos ajustando o soro de um paciente em enfermaria de hospital",
    linha:
      "Assistência direta ao paciente, curativos, medicação e procedimentos.",
  },
  {
    nome: "Técnico(a) e auxiliar de enfermagem",
    imagem: "/images/saude-tecnico-enfermagem.webp",
    imagemAlt:
      "Técnico de enfermagem de 55 anos organizando bandeja esterilizada e medicamentos na enfermaria",
    linha:
      "Contato diário com pacientes, secreções e material perfurocortante.",
  },
  {
    nome: "Médico(a)",
    imagem: "/images/saude-medico.webp",
    imagemAlt:
      "Médico de 55 anos de jaleco com estetoscópio e prontuário em corredor de hospital",
    linha:
      "Plantões, atendimento de urgência, cirurgias e procedimentos invasivos.",
  },
  {
    nome: "Dentista",
    imagem: "/images/saude-dentista.webp",
    imagemAlt:
      "Dentista de 50 anos de máscara e luvas atendendo paciente na cadeira odontológica",
    linha:
      "Procedimentos com sangue, saliva e aerossol, no consultório ou no serviço público.",
  },
  {
    nome: "Fisioterapeuta",
    imagem: "/images/saude-fisioterapeuta.webp",
    imagemAlt:
      "Fisioterapeuta de 50 anos atendendo paciente com fisioterapia respiratória em UTI",
    linha:
      "Atendimento em UTI, aspiração de vias aéreas e reabilitação hospitalar.",
  },
  {
    nome: "Farmacêutico(a) e bioquímico(a)",
    imagem: "/images/saude-farmaceutico.webp",
    imagemAlt:
      "Farmacêutica bioquímica de 50 anos manipulando amostras biológicas em laboratório de análises",
    linha:
      "Manipulação de amostras biológicas e medicamentos em hospital ou laboratório.",
  },
  {
    nome: "Radiologia",
    imagem: "/images/saude-radiologia.webp",
    imagemAlt:
      "Tecnólogo em radiologia de 50 anos no painel de comando de uma sala de exames de imagem",
    linha: "Exposição a radiação ionizante em exames de imagem.",
  },
  {
    nome: "Agente de saúde e de endemias",
    imagem: "/images/saude-agente-saude.webp",
    imagemAlt:
      "Agente de saúde de 55 anos com colete e prancheta em visita domiciliar",
    linha: "Visitas, coleta e contato com doenças infectocontagiosas.",
  },
];

/* ---------------------------------------------------------- Bloco 3: setores */

const SETORES = [
  "Hospital e enfermaria",
  "UTI, pronto-socorro e centro cirúrgico",
  "Clínica e consultório",
  "Laboratório de análises",
  "UBS, UPA e serviço público de saúde",
  "Radiologia e diagnóstico por imagem",
];

/* --------------------------------------------------- Bloco 4: últimas mudanças */

type Mudanca = {
  orgao: string;
  data: string;
  titulo: string;
  resumo: string;
  pratica: string[];
  link: string;
  href?: string;
};

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
    link: "Tirar uma dúvida sobre a minha situação",
  },
  {
    orgao: "TNU",
    data: "setembro de 2026",
    titulo: "EPI eficaz no PPP não afasta automaticamente o tempo especial",
    resumo:
      "Para quem atua em UTI, pronto-socorro, centro cirúrgico ou com pacientes infectocontagiosos, a anotação de EPI eficaz no PPP não impede o reconhecimento do tempo especial.",
    pratica: [
      "Alcança médicos, enfermeiros, técnicos e auxiliares de enfermagem, fisioterapeutas e farmacêuticos, entre outros profissionais.",
      "Exemplos citados na decisão: intubação, aspiração de vias aéreas e broncoscopia; UTI, pronto-socorro e centro cirúrgico.",
      "Fora dessas hipóteses, a anotação de EPI eficaz só é afastada com impugnação específica e fundamentada (Temas 213 da TNU e 1.090 do STJ).",
    ],
    href: "/blog/epi-eficaz-quando-afasta-o-tempo-especial",
    link: "Ler o artigo sobre EPI eficaz",
  },
];

/* -------------------------------------------------------- Bloco 5: situações */

const SITUACOES = [
  {
    titulo: "CLT em hospital ou clínica",
    texto:
      "conferimos se o PPP descreve o setor, as tarefas e o agente biológico de forma correta.",
  },
  {
    titulo: "Autônomo, consultório próprio ou contribuinte individual",
    texto:
      "também pode ter tempo especial, desde que a exposição seja comprovada.",
  },
  {
    titulo: "Servidor público (prefeitura, estado, hospital universitário)",
    texto: "o tempo especial também vale no regime próprio.",
  },
  {
    titulo: "PPP sem agente biológico ou com informação errada",
    texto: "avaliamos o pedido de correção à empresa e outras provas.",
    href: "/blog/ppp-campos-que-decidem-o-tempo-especial",
  },
  {
    titulo: "Dois empregos ao mesmo tempo",
    texto: "cada vínculo é analisado separadamente.",
  },
  {
    titulo: "Trabalho antes de 1995",
    texto:
      "algumas profissões da saúde eram enquadradas pela própria categoria.",
  },
];

/* ------------------------------------------------------ Bloco 6: como funciona */

const ETAPAS_CTA = [
  {
    titulo: "Você conta o que aconteceu",
    texto:
      "Os hospitais, clínicas e setores onde você trabalhou e o que fazia no dia a dia. Nesta etapa, nenhum documento é necessário.",
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

/* -------------------------------------------------- Bloco 7: perguntas */

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "Trabalho em hospital. Isso já garante a aposentadoria especial?",
    resposta:
      "Não. É preciso demonstrar a exposição a agentes biológicos no seu setor e nas suas tarefas, período a período. Um setor administrativo dentro do hospital, por exemplo, costuma ter outra análise.",
  },
  {
    pergunta: "Recebo adicional de insalubridade. Isso conta?",
    resposta:
      "O adicional é um indício, mas não substitui o PPP. São regras diferentes: uma trabalhista e outra previdenciária.",
  },
  {
    pergunta:
      "Tenho consultório próprio ou trabalho como autônomo. Tenho direito?",
    resposta:
      "Pode ter. O contribuinte individual também pode ter tempo especial reconhecido, desde que comprove a exposição. A prova costuma exigir mais cuidado.",
  },
  {
    pergunta: "Sou servidor público. Isso vale para mim?",
    resposta:
      "Vale. Atendemos servidores de regimes próprios, como prefeituras e estados.",
  },
  {
    pergunta: "Meu PPP diz que o EPI era eficaz. Perdi o direito?",
    resposta:
      "Não necessariamente. Em setores críticos, como UTI e pronto-socorro, a anotação de EPI eficaz não impede o reconhecimento (TNU, Tema 383). Nos demais casos, a anotação pode ser contestada com provas.",
  },
  {
    pergunta: "Posso continuar trabalhando depois de aposentar?",
    resposta:
      "Quem se aposenta pela especial não pode continuar na mesma atividade exposta. Isso entra no planejamento antes do pedido.",
  },
];

/** Temas que costumam acompanhar o tempo especial. */
const TEMAS_RELACIONADOS = [
  { nome: "Perícia negada", href: "/pericia-negada" },
  { nome: "Aposentadoria negada", href: "/aposentadoria-negada" },
  { nome: "Tempo rural", href: "/tempo-rural" },
  { nome: "Servidores públicos", href: "/servidores-publicos" },
  { nome: "Benefícios por incapacidade", href: "/beneficios-por-incapacidade" },
  { nome: "Cuidados antes de pedir", href: "/cuidados" },
];

export default function AposentadoriaEspecialSaude() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Aposentadoria especial na saúde: enfermagem, médicos e mais"
        descricao="Enfermeiro, técnico de enfermagem, médico ou dentista? Veja o que conta como tempo especial na saúde e o que conferir no seu PPP."
        caminho="/aposentadoria-especial-saude"
        palavrasChave="aposentadoria especial na saúde, tempo especial enfermagem, agentes biológicos, aposentadoria especial enfermeiro, PPP hospital"
        imagem="/images/saude-hero.webp"
        imagemAlt="Profissional de enfermagem em ambiente hospitalar"
        imagemLargura={1920}
        imagemAltura={1080}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Aposentadoria especial na saúde: o que conta no seu tempo de trabalho",
            description:
              "Enfermeiro, técnico de enfermagem, médico ou dentista? Veja o que conta como tempo especial na saúde e o que conferir no seu PPP.",
            url: `${SITE.dominio}/aposentadoria-especial-saude`,
            inLanguage: "pt-BR",
            dateModified: "2026-11-03",
            isPartOf: {
              "@type": "WebSite",
              name: SITE.nomeCompleto,
              url: SITE.dominio,
            },
            about: [
              { "@type": "Thing", name: "Aposentadoria especial" },
              { "@type": "Thing", name: "Agentes biológicos" },
              { "@type": "Thing", name: "Profissionais da saúde" },
            ],
            provider: { "@id": `${SITE.dominio}/#escritorio` },
          },
          faqJsonLd(PERGUNTAS),
          breadcrumbJsonLd([
            { label: "Início", href: "/" },
            { label: "Serviços", href: "/servicos" },
            {
              label: "Aposentadoria especial",
              href: "/aposentadoria-especial",
            },
            {
              label: "Profissionais da saúde",
              href: "/aposentadoria-especial-saude",
            },
          ]),
        ]}
      />
      <SiteHeader sobreHeroEscuro mensagem={MENSAGEM_SAUDE} />

      <main id="conteudo-principal">
        {/* --------------------------------------------------------- Bloco 1 */}
        <section className="relative isolate overflow-hidden bg-brand-950 pb-16 pt-36 text-white md:pb-20 md:pt-44">
          <img
            src="/images/saude-hero.webp"
            alt="Profissional de enfermagem de 55 anos em ambiente hospitalar"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_center] opacity-60 md:object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/92 to-brand-900/55" />
          <div className="container mx-auto px-4">
            <Trilha itens={TRILHA} />
            <p className="mt-7 text-[11.5px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              Profissionais da saúde
            </p>
            <h1 className="mt-4 max-w-4xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
              <span className="text-cyan-300">
                Aposentadoria especial na saúde
              </span>
              : o que conta no seu tempo de trabalho.
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-cyan-100">
              Quem trabalha em hospital, clínica, laboratório ou consultório, em
              contato com pacientes ou material contaminado, pode ter direito à{" "}
              <Link
                href="/aposentadoria-especial"
                className="underline decoration-cyan-400/60 underline-offset-4 hover:text-white"
              >
                aposentadoria especial
              </Link>{" "}
              com 25 anos de exposição a agentes biológicos. Desde a decisão do
              Supremo em 2026, não se exige idade mínima.
            </p>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-200/90">
              O que decide o pedido não é o nome do cargo nem o adicional de
              insalubridade no holerite. É o que o PPP e os documentos mostram
              sobre cada vínculo: o setor, as tarefas e a exposição no dia a
              dia.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_SAUDE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
              >
                <Phone size={17} />
                Quero saber se o meu caso é analisável
              </a>
              <Link
                href="/seu-caso"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
              >
                Descubra o seu caso
              </Link>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-slate-300/80">
              Você não precisa enviar documentos neste primeiro contato.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- Bloco 2 */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Quem pode ter direito"
              titulo="Profissões da saúde que analisamos"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROFISSOES.map(profissao => (
                <article
                  key={profissao.nome}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-cyan-500 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg"
                >
                  <div className="relative h-36 overflow-hidden md:h-40">
                    <img
                      src={profissao.imagem}
                      alt={profissao.imagemAlt}
                      width={880}
                      height={660}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-900/20 to-transparent" />
                    <div className="absolute inset-0 bg-brand-950/12" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-['Playfair_Display'] text-[18px] font-bold leading-snug text-brand-800">
                      {profissao.nome}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-700">
                      {profissao.linha}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              A profissão é o ponto de partida. O direito depende do que você
              fazia em cada período e de como isso está registrado.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- Bloco 3 */}
        <section className="border-y border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao titulo="O setor pesa tanto quanto a profissão" />
            <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-slate-700">
              O mesmo cargo pode ter exposições bem diferentes conforme o lugar.
              Por isso pedimos que você conte onde trabalhou e o que fazia na
              prática.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {SETORES.map(setor => (
                <span
                  key={setor}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[13.5px] font-semibold text-slate-700"
                >
                  {setor}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Bloco 4 */}
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
                            className="mt-0.5 flex-shrink-0 text-cyan-700"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {mudanca.href ? (
                    <Link
                      href={mudanca.href}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
                    >
                      {mudanca.link}
                      <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <a
                      href={WHATSAPP_SAUDE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
                    >
                      {mudanca.link}
                      <ArrowRight size={15} />
                    </a>
                  )}
                </article>
              ))}
            </div>
            <p className="mt-6 text-[12.5px] leading-relaxed text-slate-500">
              Referências conferidas em {REVISAO}. A aplicação ao seu caso
              depende dos períodos trabalhados e da documentação de cada
              vínculo.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- Bloco 5 */}
        <section className="border-y border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao titulo="Cada vínculo tem a sua análise" />
            <ul className="mt-9 grid gap-5 lg:grid-cols-2">
              {SITUACOES.map(situacao => (
                <li
                  key={situacao.titulo}
                  className="rounded-2xl border border-slate-200 border-l-4 border-l-cyan-500 bg-white p-6"
                >
                  {situacao.href ? (
                    <Link
                      href={situacao.href}
                      className="inline-flex min-h-11 items-center rounded-sm font-['Playfair_Display'] text-[18px] font-bold leading-snug text-brand-800 underline decoration-cyan-400 underline-offset-4 hover:text-cyan-700"
                    >
                      {situacao.titulo}
                    </Link>
                  ) : (
                    <h3 className="font-['Playfair_Display'] text-[18px] font-bold leading-snug text-brand-800">
                      {situacao.titulo}
                    </h3>
                  )}
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-700">
                    {situacao.texto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- Bloco 6 */}
        <section
          id="analise"
          className="relative isolate scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white md:py-24"
        >
          <img
            src="/images/especial-apoio.webp"
            alt=""
            width={1500}
            height={1125}
            loading="lazy"
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
                  Conte em quais empresas você trabalhou e o que fazia na
                  prática: lemos o seu histórico, apontamos o que sustenta o seu
                  tempo de exposição e o que ainda precisa ser buscado — antes
                  de qualquer pedido.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={WHATSAPP_SAUDE}
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

        {/* --------------------------------------------------------- Bloco 7 */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <TituloSecao
              sobretitulo="Antes de decidir"
              titulo="Perguntas frequentes de quem trabalha na saúde"
            />
            <Perguntas itens={PERGUNTAS} />
          </div>
        </section>

        {/* --------------------------------------------------------- Bloco 8 */}
        <section className="relative isolate overflow-hidden bg-brand-950 py-16 text-white md:py-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
          <div className="container mx-auto px-4">
            <h2 className="max-w-3xl font-['Playfair_Display'] text-3xl font-bold leading-tight md:text-[40px]">
              Cuidar dos outros não pode custar o seu tempo especial.
            </h2>
            <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-slate-200/90">
              Conte onde você trabalhou e o que fazia. Lemos o seu histórico e
              dizemos o que sustenta o seu tempo especial e o que ainda falta,
              antes de qualquer pedido.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_SAUDE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
              >
                <Phone size={17} />
                Quero falar sobre o meu caso
              </a>
              <Link
                href="/blog/agentes-biologicos-na-saude-tempo-especial"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
              >
                Ler o artigo sobre agentes biológicos
              </Link>
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-slate-300/80">
              Você não precisa enviar documentos neste primeiro contato.
              Atendimento em Maringá e em todo o Brasil, sem sair de casa.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ Veja também */}
        <section className="py-14 md:py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                Veja também
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {TEMAS_RELACIONADOS.map(tema => (
                  <Link
                    key={tema.href}
                    href={tema.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:bg-cyan-50 hover:text-brand-800"
                  >
                    {tema.nome}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter mensagem={MENSAGEM_SAUDE} />
      <BotaoWhatsApp mensagem={MENSAGEM_SAUDE} />
    </div>
  );
}
