import {
  ArrowRight,
  Factory,
  Landmark,
  Scale,
  Stethoscope,
  Wheat,
} from "lucide-react";
import { Link } from "wouter";
import { BENEFICIOS_ALEM } from "@/data/regimes";

const CASOS_AGORA = [
  {
    href: "/pericia-negada",
    Icone: Stethoscope,
    antes: "Minha ",
    destaque: "Perícia",
    depois: " foi negada",
    situacao:
      "Você ainda convive com a limitação, mas o pedido voltou com uma negativa. O motivo registrado e o que a perícia considerou precisam ser lidos com cuidado.",
    cta: "Entender a perícia negada",
    estilo: "border-[#14507f] bg-white",
    icone: "bg-[#0e3a63] text-[#22d3ee]",
  },
  {
    href: "/tempo-rural",
    Icone: Wheat,
    antes: "Preciso de ajuda com meu ",
    destaque: "Tempo Rural",
    depois: "",
    situacao:
      "Anos de trabalho no campo podem não aparecer no histórico do INSS. A análise começa pelos documentos que ajudam a reconstruir esse período.",
    cta: "Comprovar o tempo rural",
    estilo: "border-[#22d3ee] bg-[#f2fbfd]",
    icone: "bg-[#14507f] text-[#22d3ee]",
  },
  {
    href: "/aposentadoria-especial",
    Icone: Factory,
    antes: "Estou com dificuldades no meu ",
    destaque: "Tempo Especial",
    depois: "",
    situacao:
      "O PPP pode não reconhecer a exposição que existia no trabalho. É preciso comparar as atividades reais e os documentos de cada vínculo.",
    cta: "Analisar o tempo especial",
    estilo: "border-[#0e3a63] bg-white",
    icone: "bg-[#071e36] text-[#22d3ee]",
  },
] as const;

/**
 * Porta de entrada da home para quem chega com uma situação concreta.
 * Cada cartão inteiro é um link para a página que aprofunda o assunto.
 */
export function CasosAgora() {
  return (
    <section
      id="casos-agora"
      aria-labelledby="casos-agora-titulo"
      className="border-y border-slate-200 bg-[#f5f9fc] py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14507f]">
            Comece por aqui
          </p>
          <h2
            id="casos-agora-titulo"
            className="mt-3 font-['Playfair_Display'] text-3xl font-bold leading-tight text-[#0a2a4a] md:text-4xl"
          >
            Como está o seu caso agora?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-[17px]">
            Uma negativa ou um período de trabalho não reconhecido pode deixar
            você sem saber o próximo passo. Você não precisa entender tudo
            sozinho. Escolha a sua situação e conheça os cuidados que
            analisamos.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {CASOS_AGORA.map(caso => {
            const Icone = caso.Icone;
            return (
              <Link
                key={caso.href}
                href={caso.href}
                className={`group flex h-full min-w-0 flex-col rounded-2xl border-t-4 p-5 shadow-[0_12px_28px_-22px_rgba(4,18,31,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_42px_-24px_rgba(4,18,31,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22d3ee] sm:p-6 ${caso.estilo}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${caso.icone}`}
                >
                  <Icone size={21} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-['Playfair_Display'] text-[20px] font-bold leading-snug text-[#0a2a4a]">
                  {caso.antes}
                  <span className="text-[#14507f] underline decoration-[#22d3ee] decoration-2 underline-offset-4 transition-colors group-hover:text-[#0e3a63]">
                    {caso.destaque}
                  </span>
                  {caso.depois}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-700">
                  {caso.situacao}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-[#14507f]">
                  {caso.cta}
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const ATUACOES = [
  {
    Icone: Scale,
    titulo: "Benefícios do INSS",
    texto:
      "Analisamos o CNIS, os vínculos, os documentos de trabalho e o histórico contributivo para entender o que entrou no pedido e o que precisa ser conferido.",
    href: "/cuidados#inss",
    cta: "Ver cuidados do INSS",
  },
  {
    Icone: Landmark,
    titulo: "Aposentadoria de servidores públicos",
    texto:
      "Examinamos o regime do ente, a vida funcional, as averbações, as certidões e os documentos do cargo para organizar a leitura do caso.",
    href: "/servidores-publicos",
    cta: "Conhecer a atuação para servidores",
  },
] as const;

/**
 * Bloco editorial que apresenta as duas frentes principais sem transformar a
 * home em uma lista de regimes ou de regras.
 */
export function AtuacaoEscritorio() {
  return (
    <section
      id="atuacao-escritorio"
      aria-labelledby="atuacao-escritorio-titulo"
      className="relative overflow-hidden bg-[#04121f] py-16 text-white md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-0 h-80 w-80 rounded-full bg-[#0a2a4a]/45 blur-3xl"
      />
      <div className="relative container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#22d3ee]">
              A atuação do escritório
            </p>
            <h2
              id="atuacao-escritorio-titulo"
              className="mt-5 font-['Playfair_Display'] text-3xl font-bold leading-[1.12] text-white sm:text-4xl md:text-[46px]"
            >
              Você não trabalhou a vida inteira pra aposentar de qualquer jeito
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-slate-200/85">
              Conhecer seu direito é sempre a melhor escolha. A análise começa
              pela sua história, não por uma resposta pronta.
            </p>
          </div>

          <div className="grid gap-4 lg:pt-8">
            {ATUACOES.map(atuacao => {
              const Icone = atuacao.Icone;
              return (
                <article
                  key={atuacao.href}
                  className="rounded-2xl border border-[#0e3a63] bg-[#071e36]/85 p-5 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.8)] sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0e3a63] text-[#22d3ee]">
                      <Icone size={21} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-['Playfair_Display'] text-[20px] font-bold leading-snug text-white">
                        {atuacao.titulo}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-slate-200/80">
                        {atuacao.texto}
                      </p>
                      <Link
                        href={atuacao.href}
                        className="group/link mt-4 inline-flex max-w-full items-center gap-2 text-[13.5px] font-bold text-[#22d3ee] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22d3ee]"
                      >
                        {atuacao.cta}
                        <ArrowRight
                          aria-hidden="true"
                          size={15}
                          className="transition-transform group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
            <Link
              href="/seu-caso"
              className="group mt-1 inline-flex w-fit max-w-full items-center gap-2 text-[14px] font-bold text-slate-200 underline decoration-[#14507f] decoration-2 underline-offset-4 transition-colors hover:text-[#22d3ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22d3ee]"
            >
              Ainda não sabe por onde começar? Descubra o seu caso
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const DESCRICOES_ALEM: Record<string, string> = {
  "alem-incapacidade-temporaria":
    "Afastamento temporário por motivo de saúde, com documentação adequada.",
  "alem-auxilio-acidente":
    "Sequela de acidente que continua reduzindo a capacidade de trabalho.",
  "alem-pensao":
    "Proteção para dependentes após a morte de quem mantinha a família.",
  "alem-bpc":
    "Benefício assistencial para idosos e pessoas com deficiência de baixa renda.",
  "alem-revisao":
    "Conferência do cálculo e dos períodos que entraram no benefício.",
  "alem-isencao":
    "Análise da dispensa de imposto sobre proventos nas hipóteses previstas.",
  "alem-salario-maternidade":
    "Afastamento por nascimento, adoção ou guarda, conforme o seu histórico.",
  "alem-cessado":
    "Leitura do motivo de suspensão ou interrupção de um benefício recebido.",
};

const VARIANTES_BENEFICIO = [
  "border-[#0e3a63] bg-[#071e36] text-white",
  "border-[#b9eaf3] bg-[#e8f8fc] text-[#0a2a4a]",
] as const;

/**
 * Grade enxuta dos oito benefícios que ficam além da aposentadoria. Os textos
 * são específicos da home; os dados originais continuam sendo usados nas suas
 * páginas próprias.
 */
export function BeneficiosCompactos() {
  return (
    <section
      id="beneficios-alem"
      aria-labelledby="beneficios-alem-titulo"
      className="py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14507f]">
            Outros caminhos de cuidado
          </p>
          <h2
            id="beneficios-alem-titulo"
            className="mt-3 font-['Playfair_Display'] text-3xl font-bold leading-tight text-[#0a2a4a] md:text-4xl"
          >
            Além da aposentadoria
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-[17px]">
            Há situações previdenciárias que pedem uma análise própria, antes de
            qualquer decisão.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIOS_ALEM.map((item, index) => {
            const escuro = index % 2 === 0;
            const href = item.href ?? "/cuidados#alem";
            return (
              <Link
                key={item.id}
                href={href}
                className={`group flex min-w-0 min-h-[178px] flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_-24px_rgba(4,18,31,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22d3ee] ${
                  VARIANTES_BENEFICIO[escuro ? 0 : 1]
                }`}
              >
                <h3
                  className={`font-['Playfair_Display'] text-[18px] font-bold leading-snug ${
                    escuro ? "text-white" : "text-[#0a2a4a]"
                  }`}
                >
                  {item.titulo}
                </h3>
                <p
                  className={`mt-2.5 flex-1 text-[13.5px] leading-relaxed ${
                    escuro ? "text-slate-200/85" : "text-slate-700"
                  }`}
                >
                  {DESCRICOES_ALEM[item.id] ?? item.oQueE}
                </p>
                <span
                  className={`mt-4 inline-flex items-center gap-2 text-[13px] font-bold ${
                    escuro ? "text-[#22d3ee]" : "text-[#14507f]"
                  }`}
                >
                  Conhecer
                  <ArrowRight
                    aria-hidden="true"
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
