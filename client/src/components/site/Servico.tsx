import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Perguntas, TituloSecao, Trilha } from "./Sections";
import { Seo } from "./Seo";
import {
  AVISO_DOCUMENTOS,
  FAQ_ATENDIMENTO,
  PASSOS_ATENDIMENTO,
  ROTULO_ACAO,
  type Servico,
} from "@/data/servicos";
import { SITE, whatsapp } from "@/config/site";

/** Mensagem de WhatsApp dirigida a um serviço específico. */
function mensagemDoServico(servico: Servico): string {
  return `Olá, vim pelo site. Gostaria de falar sobre ${servico.nome.toLowerCase()}.`;
}

/* ------------------------------------------------------------------ */
/* Aviso de documentos                                                 */
/* ------------------------------------------------------------------ */

export function AvisoDocumentos({ centro = false }: { centro?: boolean }) {
  return (
    <p
      className={`text-[14px] leading-relaxed text-slate-300/85 ${centro ? "text-center" : ""}`}
    >
      {AVISO_DOCUMENTOS}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Cartão de serviço                                                   */
/* ------------------------------------------------------------------ */

export function CartaoServico({ servico }: { servico: Servico }) {
  const destino = servico.href;
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-['Playfair_Display'] text-[19px] font-bold leading-snug text-brand-800">
        {servico.nome}
      </h3>
      <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-800">
        {servico.pergunta}
      </p>
      <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-slate-600">
        {servico.resumo}
      </p>
      {destino ? (
        <Link
          href={destino}
          className="mt-6 inline-flex w-fit items-center gap-2 text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
        >
          {ROTULO_ACAO[servico.acao]}
          <ArrowRight size={15} />
        </Link>
      ) : (
        <a
          href={whatsapp(mensagemDoServico(servico))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 text-[13.5px] font-bold text-cyan-700 hover:text-cyan-800"
        >
          {ROTULO_ACAO[servico.acao]}
          <ArrowRight size={15} />
        </a>
      )}
    </div>
  );
}

export function GradeServicos({
  titulo,
  texto,
  servicos,
  colunas = 3,
}: {
  titulo: string;
  texto?: string;
  servicos: Servico[];
  colunas?: 2 | 3;
}) {
  return (
    <div>
      <TituloSecao titulo={titulo} texto={texto} />
      <div
        className={`mt-10 grid gap-6 ${
          colunas === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {servicos.map((s) => (
          <CartaoServico key={s.id} servico={s} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Como começa o atendimento                                           */
/* ------------------------------------------------------------------ */

export function ComoComecaAtendimento({ claro = false }: { claro?: boolean }) {
  return (
    <section
      className={`py-16 md:py-20 ${claro ? "bg-white" : "bg-slate-50"}`}
    >
      <div className="container mx-auto px-4">
        <TituloSecao
          sobretitulo="Passo a passo"
          titulo="Como começa o atendimento"
          texto="Você conhece o serviço e as condições antes de contratar."
        />
        <ol className="mt-11 grid gap-8 md:grid-cols-3">
          {PASSOS_ATENDIMENTO.map((passo, i) => (
            <li key={passo.titulo}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-800 font-['Playfair_Display'] text-[16px] font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-['Playfair_Display'] text-lg font-bold text-brand-800">
                {passo.titulo}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                {passo.texto}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-10 rounded-xl border-l-4 border-l-cyan-500 bg-white px-5 py-4 text-[14px] leading-relaxed text-slate-700">
          {AVISO_DOCUMENTOS} O serviço e os honorários são apresentados antes da
          contratação.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Conheça o escritório                                                */
/* ------------------------------------------------------------------ */

export function ConhecaEscritorio({ claro = false }: { claro?: boolean }) {
  return (
    <section className={`py-16 md:py-20 ${claro ? "bg-white" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <TituloSecao
              sobretitulo={`O escritório · ${SITE.experiencia}`}
              titulo="Conheça antes de decidir"
              texto={`${SITE.nomeCompleto} atua em Direito Previdenciário há ${SITE.experiencia}, com atendimento presencial em Maringá e a distância para todo o Brasil. Conheça o responsável, o endereço e os canais oficiais antes de prosseguir.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sobre"
                className="rounded-lg bg-brand-800 px-6 py-3.5 text-[14px] font-bold text-white hover:bg-brand-700"
              >
                Conhecer o responsável
              </Link>
              <Link
                href="/como-funciona"
                className="rounded-lg border border-brand-800 px-6 py-3.5 text-[14px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
              >
                Como funciona o atendimento
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-brand-800">
              {SITE.responsavel}
            </h3>
            <p className="mt-1 text-[13.5px] font-semibold text-cyan-700">
              {SITE.oab}
            </p>
            <ul className="mt-6 space-y-3.5 border-t border-slate-200 pt-6 text-[14px] text-slate-700">
              <li className="flex gap-2.5">
                <MapPin size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                <span>
                  {SITE.endereco.linha1}
                  <br />
                  {SITE.endereco.linha2}
                  <br />
                  {SITE.endereco.linha3}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Clock size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                <span>{SITE.horario}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                <span>{SITE.whatsappExibicao}</span>
              </li>
              <li className="flex gap-2.5">
                <Mail size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                <a href={`mailto:${SITE.email}`} className="hover:text-cyan-700">
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 flex gap-2.5 border-t border-slate-200 pt-5 text-[13px] leading-relaxed text-slate-500">
              <ShieldCheck size={17} className="mt-0.5 flex-shrink-0 text-slate-400" />
              <span>
                Documentos e informações de saúde devem ser enviados apenas pelos
                canais indicados pela equipe. Não inclua esses dados em
                comentários públicos ou avaliações.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dúvidas antes de entrar em contato                                  */
/* ------------------------------------------------------------------ */

export function DuvidasAntesDeContratar({ claro = false }: { claro?: boolean }) {
  return (
    <section className={`py-16 md:py-20 ${claro ? "bg-white" : "bg-slate-50"}`}>
      <div className="container mx-auto px-4">
        <TituloSecao
          sobretitulo="Antes de decidir"
          titulo="Dúvidas antes de entrar em contato"
          texto="Informações para você conhecer o atendimento e dar o próximo passo com clareza."
        />
        <Perguntas itens={FAQ_ATENDIMENTO} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Chamada final                                                       */
/* ------------------------------------------------------------------ */

export function ChamadaFinal({
  titulo = "Vamos conversar sobre a sua situação?",
  texto = "Conte o motivo da sua procura. Explicamos qual atendimento se aplica e quais informações são necessárias para continuar.",
  mensagem,
}: {
  titulo?: string;
  texto?: string;
  mensagem?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 py-16 text-white md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold leading-tight md:text-4xl">
            {titulo}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slate-100/90">
            {texto}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsapp(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
            >
              <Phone size={17} />
              Falar com o escritório
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
            >
              Ver os canais de contato
            </Link>
          </div>
          <p className="mt-6 text-[13.5px] leading-relaxed text-slate-300/80">
            {AVISO_DOCUMENTOS} O serviço e os honorários são apresentados antes da
            contratação.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cabeçalho de página de serviço                                      */
/* ------------------------------------------------------------------ */

export function HeroServico({
  trilha,
  titulo,
  pergunta,
  linhas,
  mensagem,
}: {
  trilha: { label: string; href?: string }[];
  titulo: string;
  pergunta: string;
  linhas: string[];
  mensagem: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-16 pt-36 text-white md:pt-44">
      <div className="container mx-auto px-4">
        <Trilha itens={trilha} />
        <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
          {titulo}
        </h1>
        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-cyan-100">
          {pergunta}
        </p>
        {linhas.map((linha) => (
          <p
            key={linha}
            className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-100/90"
          >
            {linha}
          </p>
        ))}
        <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-slate-300/80">
          {AVISO_DOCUMENTOS}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={whatsapp(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
          >
            <Phone size={17} />
            Falar com o escritório
          </a>
          <a
            href="#analise"
            className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
          >
            Ver o que precisa ser analisado
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Blocos genéricos de página de serviço                               */
/* ------------------------------------------------------------------ */

/** "O que precisa ser analisado" — o núcleo de toda página de serviço. */
export function OQueAnalisar({
  itens,
  sobretitulo = "Antes de qualquer pedido",
  titulo = "O que precisa ser analisado",
  texto,
}: {
  itens: { titulo: string; texto: string }[];
  sobretitulo?: string;
  titulo?: string;
  texto?: string;
}) {
  return (
    <section id="analise" className="scroll-mt-24 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <TituloSecao sobretitulo={sobretitulo} titulo={titulo} texto={texto} />
        <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itens.map((item, i) => (
            <div
              key={item.titulo}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 font-['Playfair_Display'] text-[15px] font-bold text-cyan-700">
                {i + 1}
              </span>
              <h3 className="mt-4 font-['Playfair_Display'] text-[17px] font-bold leading-snug text-brand-800">
                {item.titulo}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Bloco de atenção: o problema e o que fazemos a respeito. */
export function PontosDeAtencao({
  pontos,
  titulo = "Os pontos que costumam decidir o caso",
  texto,
  sobretitulo = "Onde os pedidos se perdem",
}: {
  pontos: { icone: any; titulo: string; problema: string; fazemos: string }[];
  titulo?: string;
  texto?: string;
  sobretitulo?: string;
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <TituloSecao sobretitulo={sobretitulo} titulo={titulo} texto={texto} />
        <div className="mt-11 space-y-7">
          {pontos.map((ponto) => (
            <div
              key={ponto.titulo}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <ponto.icone size={22} />
                </span>
                <h3 className="mt-1 font-['Playfair_Display'] text-[21px] font-bold leading-snug text-brand-800">
                  {ponto.titulo}
                </h3>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Por que acontece
                  </h4>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-700">
                    {ponto.problema}
                  </p>
                </div>
                <div className="rounded-xl border-l-4 border-l-cyan-500 bg-slate-50 px-5 py-4">
                  <h4 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                    O que fazemos
                  </h4>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-700">
                    {ponto.fazemos}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Lista de documentos que ajudam, sempre com o redutor de atrito. */
export function DocumentosQueAjudam({
  itens,
  texto = "Você pode iniciar o contato sem reunir esses documentos. Indicamos o que será necessário para o serviço.",
}: {
  itens: string[];
  texto?: string;
}) {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <TituloSecao
          sobretitulo="Documentos"
          titulo="Documentos que ajudam na análise"
          texto={texto}
        />
        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {itens.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 rounded-xl border border-slate-200 bg-white p-5 text-[14.5px] leading-relaxed text-slate-700"
            >
              <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-cyan-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Faixa institucional curta, para fechar páginas de serviço. */
export function FaixaEscritorio() {
  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-slate-200 bg-white p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Building2 size={22} />
            </span>
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
                Quem analisa o seu caso
              </h2>
              <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-slate-600">
                {SITE.responsavel} ({SITE.oab}) — Direito Previdenciário há{" "}
                {SITE.experiencia}, em Maringá/PR e a distância para todo o Brasil.
              </p>
            </div>
          </div>
          <Link
            href="/sobre"
            className="flex-shrink-0 rounded-lg border border-brand-800 px-6 py-3.5 text-[14px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
          >
            Conhecer o escritório
          </Link>
        </div>
      </div>
    </section>
  );
}

/** SEO padrão de uma página de serviço. */
export function SeoServico({
  titulo,
  descricao,
  caminho,
  palavrasChave,
  imagem,
  jsonLd,
}: {
  titulo: string;
  descricao: string;
  caminho: string;
  palavrasChave?: string;
  imagem?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <Seo
      titulo={titulo}
      descricao={descricao}
      caminho={caminho}
      palavrasChave={palavrasChave}
      imagem={imagem}
      jsonLd={jsonLd}
    />
  );
}
