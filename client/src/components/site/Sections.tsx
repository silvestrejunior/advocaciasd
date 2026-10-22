import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Minus,
  Phone,
  Plus,
  Scale,
} from "lucide-react";
import type { LinhaRegra, Modalidade, PerguntaFrequente } from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

/* ------------------------------------------------------------------ */
/* Títulos                                                             */
/* ------------------------------------------------------------------ */

export function TituloSecao({
  sobretitulo,
  titulo,
  texto,
  centro = false,
  claro = false,
}: {
  sobretitulo?: string;
  titulo: string;
  texto?: string;
  centro?: boolean;
  claro?: boolean;
}) {
  return (
    <div className={centro ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {sobretitulo && (
        <p
          className={`text-xs font-bold uppercase tracking-[0.2em] ${
            claro ? "text-cyan-300" : "text-cyan-600"
          }`}
        >
          {sobretitulo}
        </p>
      )}
      <h2
        className={`mt-3 font-['Playfair_Display'] text-3xl font-bold leading-tight md:text-4xl ${
          claro ? "text-white" : "text-brand-800"
        }`}
      >
        {titulo}
      </h2>
      {texto && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-[17px] ${
            claro ? "text-slate-300/85" : "text-slate-600"
          }`}
        >
          {texto}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cartão de modalidade (usado nas grades das páginas)                 */
/* ------------------------------------------------------------------ */

export function CartaoModalidade({
  item,
  href,
}: {
  item: { id: string; nome: string; resumo: string };
  href: string;
}) {
  return (
    <Link
      href={`${href}#${item.id}`}
      className="group flex flex-col rounded-xl border border-slate-200 border-l-4 border-l-cyan-500 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-l-blue-700 hover:shadow-lg"
    >
      <h3 className="font-['Playfair_Display'] text-[17px] font-bold leading-snug text-brand-800">
        {item.nome}
      </h3>
      <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-600">
        {item.resumo}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-cyan-700">
        Entender
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Bloco completo de uma modalidade (usado nas páginas-hub)            */
/* ------------------------------------------------------------------ */

export function BlocoModalidade({ item }: { item: Modalidade }) {
  return (
    <section
      id={item.id}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9"
    >
      <h2 className="font-['Playfair_Display'] text-2xl font-bold text-brand-800 md:text-[28px]">
        {item.nome}
      </h2>
      <p className="mt-3.5 text-[15.5px] leading-relaxed text-slate-700">
        {item.resumo}
      </p>

      {item.paraQuem && (
        <p className="mt-4 rounded-lg border-l-4 border-l-amber-400 bg-amber-50/70 px-4 py-3 text-[14.5px] leading-relaxed text-amber-900">
          {item.paraQuem}
        </p>
      )}

      <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        Requisitos
      </h3>
      <ul className="mt-3 space-y-2.5">
        {item.requisitos.map((r) => (
          <li key={r} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-700">
            <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-400">
        Base legal: {item.base}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={whatsapp(`Olá, vim pelo site e gostaria de orientação sobre ${item.nome.toLowerCase()}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-800 px-5 py-3 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-700"
        >
          <Phone size={15} />
          Falar sobre este caso
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tabela comparativa de regras                                        */
/* ------------------------------------------------------------------ */

export function TabelaRegras({
  titulo,
  linhas,
  ano,
}: {
  titulo: string;
  linhas: LinhaRegra[];
  ano: number;
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
        <h3 className="font-['Playfair_Display'] text-lg font-bold text-brand-800">
          {titulo}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Valores vigentes em {ano}. As regras de transição sobem a cada 1º de janeiro.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-[13.5px]">
          <thead>
            <tr className="bg-white text-[11.5px] uppercase tracking-wider text-slate-500">
              <th className="px-6 py-3 font-bold">Regra</th>
              <th className="px-6 py-3 font-bold">Mulheres</th>
              <th className="px-6 py-3 font-bold">Homens</th>
              <th className="px-6 py-3 font-bold">Base legal</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.regra} className="border-t border-slate-100 align-top">
                <td className="px-6 py-4 font-semibold text-brand-800">{l.regra}</td>
                <td className="px-6 py-4 text-slate-700">{l.mulheres}</td>
                <td className="px-6 py-4 text-slate-700">{l.homens}</td>
                <td className="px-6 py-4 text-slate-400">{l.base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Perguntas frequentes                                                */
/* ------------------------------------------------------------------ */

export function Perguntas({ itens }: { itens: PerguntaFrequente[] }) {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
      {itens.map((item, i) => {
        const ativa = aberta === i;
        return (
          <div key={item.pergunta}>
            <button
              type="button"
              onClick={() => setAberta(ativa ? null : i)}
              aria-expanded={ativa}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
            >
              <span className="font-['Playfair_Display'] text-[17px] font-bold leading-snug text-brand-800">
                {item.pergunta}
              </span>
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
                {ativa ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            {ativa && (
              <p className="max-w-3xl pb-6 text-[14.5px] leading-relaxed text-slate-600">
                {item.resposta}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Faixa de chamada final                                              */
/* ------------------------------------------------------------------ */

export function FaixaCta({
  titulo = "Vamos analisar o seu caso",
  texto = "Conte a sua situação e receba uma avaliação inicial. Se preferir, fale direto pelo WhatsApp.",
  mensagem = WHATSAPP_MENSAGENS.geral,
}: {
  titulo?: string;
  texto?: string;
  mensagem?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600">
      <div className="container mx-auto px-4 py-16 text-center md:py-20">
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white md:text-4xl">
          {titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-slate-300/90">
          {texto}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={whatsapp(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-7 py-4 text-[15px] font-bold text-white transition-colors hover:bg-green-600"
          >
            <Phone size={17} />
            Falar no WhatsApp
          </a>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/20"
          >
            Enviar uma mensagem
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-300/70">
          {SITE.endereco.completo} · {SITE.horario}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Botão flutuante do WhatsApp                                         */
/* ------------------------------------------------------------------ */

export function BotaoWhatsApp() {
  return (
    <a
      href={whatsapp(WHATSAPP_MENSAGENS.geral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-transform hover:scale-105 md:h-16 md:w-16"
    >
      <Phone size={26} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Trilha de navegação                                                 */
/* ------------------------------------------------------------------ */

export function Trilha({ itens }: { itens: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-[13px] text-slate-300/80">
      <ol className="flex flex-wrap items-center gap-1.5">
        {itens.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={13} className="opacity-60" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-cyan-300">
                {item.label}
              </Link>
            ) : (
              <span className="text-cyan-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Pequeno selo com ícone de balança, usado nos blocos de credibilidade. */
export function Selo({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="flex gap-3">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
        <Scale size={20} />
      </span>
      <span>
        <span className="block text-[14.5px] font-bold text-brand-800">{titulo}</span>
        <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-600">
          {texto}
        </span>
      </span>
    </div>
  );
}