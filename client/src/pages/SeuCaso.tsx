import { useRef, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  Trilha,
} from "@/components/site/Sections";
import {
  ChamadaFinal,
  DuvidasAntesDeContratar,
  SeoServico,
} from "@/components/site/Servico";
import { breadcrumbJsonLd } from "@/components/site/Seo";
import {
  beneficioPorId,
  perfilPorSelecao,
  type Regime,
  type Situacao,
} from "@/data/regimes";
import { AVISO_DOCUMENTOS } from "@/data/servicos";
import { WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Descubra o seu caso" },
];

function regimeDaUrl(): Regime | null {
  if (typeof window === "undefined") return null;

  const regime = new URLSearchParams(window.location.search).get("regime");
  return regime === "inss" || regime === "servidor" ? regime : null;
}

function rolarPara(ref: { current: HTMLElement | null }) {
  window.requestAnimationFrame(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function Opcao({
  titulo,
  apoio,
  selecionada,
  onClick,
  disabled = false,
}: {
  titulo: string;
  apoio: string;
  selecionada: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selecionada}
      disabled={disabled}
      onClick={onClick}
      className={`group rounded-2xl border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
        selecionada
          ? "border-brand-800 bg-brand-900 text-white shadow-lg"
          : "border-slate-200 bg-white text-brand-800 shadow-sm hover:-translate-y-0.5 hover:border-cyan-500 hover:shadow-md"
      }`}
    >
      <span className="flex items-start justify-between gap-4">
        <span>
          <span
            className={`block font-['Playfair_Display'] text-[19px] font-bold leading-snug ${
              selecionada ? "text-white" : "text-brand-800"
            }`}
          >
            {titulo}
          </span>
          <span
            className={`mt-2 block text-[14px] leading-relaxed ${
              selecionada ? "text-slate-200" : "text-slate-600"
            }`}
          >
            {apoio}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`mt-1 h-4 w-4 flex-shrink-0 rounded-full border-2 ${
            selecionada
              ? "border-cyan-300 bg-cyan-400"
              : "border-slate-300 group-hover:border-cyan-500"
          }`}
        />
      </span>
    </button>
  );
}

function ResumoResposta({
  resposta,
  onAlterar,
}: {
  resposta: string;
  onAlterar: () => void;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Resposta escolhida
        </p>
        <p className="mt-1 font-['Playfair_Display'] text-[18px] font-bold text-brand-800">
          {resposta}
        </p>
      </div>
      <button
        type="button"
        onClick={onAlterar}
        className="text-[13px] font-bold text-cyan-700 underline decoration-cyan-300 underline-offset-4 hover:text-cyan-800"
      >
        alterar
      </button>
    </div>
  );
}

export default function SeuCaso() {
  const [regime, setRegime] = useState<Regime | null>(() => regimeDaUrl());
  const [situacao, setSituacao] = useState<Situacao | null>(null);

  const passo1Ref = useRef<HTMLElement | null>(null);
  const passo2Ref = useRef<HTMLElement | null>(null);
  const resultadoRef = useRef<HTMLElement | null>(null);

  const perfil = regime && situacao ? perfilPorSelecao(regime, situacao) : null;
  const beneficios =
    perfil?.beneficios
      .map(beneficioPorId)
      .filter((beneficio): beneficio is NonNullable<typeof beneficio> => Boolean(beneficio)) ??
    [];
  const mensagemWhatsApp =
    situacao === "ja-aposentado"
      ? WHATSAPP_MENSAGENS.negado
      : WHATSAPP_MENSAGENS.geral;

  function escolherRegime(novoRegime: Regime) {
    setRegime(novoRegime);
    setSituacao(null);
    rolarPara(passo2Ref);
  }

  function escolherSituacao(novaSituacao: Situacao) {
    setSituacao(novaSituacao);
    rolarPara(resultadoRef);
  }

  function alterarRegime() {
    setRegime(null);
    setSituacao(null);
    rolarPara(passo1Ref);
  }

  function alterarSituacao() {
    setSituacao(null);
    rolarPara(passo2Ref);
  }

  return (
    <div className="min-h-screen bg-white">
      <SeoServico
        titulo="Descubra o seu caso"
        descricao="Duas perguntas para chegar aos benefícios e aos cuidados que se aplicam ao seu caso, com base no seu regime e na sua situação."
        caminho="/seu-caso"
        jsonLd={breadcrumbJsonLd([
          { label: "Início", href: "/" },
          { label: "Descubra o seu caso", href: "/seu-caso" },
        ])}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-14 pt-32 text-white md:pb-16 md:pt-40">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Duas perguntas para chegar ao seu caso
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
            Escolha uma opção e a página avança para a próxima pergunta. Ao final,
            mostramos os benefícios e os cuidados que se aplicam à sua situação.
          </p>
          <p className="mt-5 text-[14px] leading-relaxed text-slate-300/85">
            {AVISO_DOCUMENTOS}
          </p>
        </div>
      </section>

      <main>
        <section
          ref={passo1Ref}
          className="scroll-mt-24 bg-white py-16 md:py-20"
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-7 md:grid-cols-[96px_minmax(0,1fr)] md:gap-10">
              <div aria-hidden="true" className="font-['Playfair_Display'] text-7xl font-bold leading-none text-brand-800/15 md:text-8xl">
                1
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold leading-tight text-brand-800 md:text-4xl">
                  Você é servidor público ou contribui para o INSS?
                </h2>
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-7">
                  {regime && (
                    <ResumoResposta
                      resposta={
                        regime === "servidor"
                          ? "Servidor público"
                          : "Contribuo para o INSS"
                      }
                      onAlterar={alterarRegime}
                    />
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Opcao
                      titulo="Sou servidor público"
                      apoio="Servidor efetivo, com regime próprio de previdência."
                      selecionada={regime === "servidor"}
                      onClick={() => escolherRegime("servidor")}
                    />
                    <Opcao
                      titulo="Contribuo para o INSS"
                      apoio="Trabalhador, autônomo, rural ou servidor sem regime próprio."
                      selecionada={regime === "inss"}
                      onClick={() => escolherRegime("inss")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={passo2Ref}
          aria-disabled={!regime}
          className={`scroll-mt-24 bg-slate-50 py-16 transition-opacity md:py-20 ${
            regime ? "opacity-100" : "pointer-events-none opacity-50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-7 md:grid-cols-[96px_minmax(0,1fr)] md:gap-10">
              <div aria-hidden="true" className="font-['Playfair_Display'] text-7xl font-bold leading-none text-brand-800/15 md:text-8xl">
                2
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold leading-tight text-brand-800 md:text-4xl">
                  Você já se aposentou ou ainda vai se aposentar?
                </h2>
                {!regime && (
                  <p className="mt-5 rounded-xl border-l-4 border-l-cyan-500 bg-white px-5 py-4 text-[14px] leading-relaxed text-slate-600">
                    Responda a pergunta anterior para continuar.
                  </p>
                )}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                  {situacao && (
                    <ResumoResposta
                      resposta={
                        situacao === "vai-aposentar"
                          ? "Ainda vou me aposentar"
                          : "Já sou aposentado(a)"
                      }
                      onAlterar={alterarSituacao}
                    />
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Opcao
                      titulo="Ainda vou me aposentar"
                      apoio="Estou reunindo tempo, organizando documentos ou prestes a dar entrada."
                      selecionada={situacao === "vai-aposentar"}
                      disabled={!regime}
                      onClick={() => escolherSituacao("vai-aposentar")}
                    />
                    <Opcao
                      titulo="Já sou aposentado(a)"
                      apoio="Recebo benefício e quero conferir cálculos, revisar ou entender outros direitos."
                      selecionada={situacao === "ja-aposentado"}
                      disabled={!regime}
                      onClick={() => escolherSituacao("ja-aposentado")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={resultadoRef}
          aria-disabled={!situacao}
          className={`scroll-mt-24 bg-brand-900 py-16 transition-opacity md:py-20 ${
            situacao ? "opacity-100" : "pointer-events-none opacity-50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-7 md:grid-cols-[96px_minmax(0,1fr)] md:gap-10">
              <div aria-hidden="true" className="font-['Playfair_Display'] text-7xl font-bold leading-none text-cyan-400/25 md:text-8xl">
                3
              </div>
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold leading-tight text-white md:text-4xl">
                  O seu caso
                </h2>
                {!situacao && (
                  <p className="mt-5 rounded-xl border-l-4 border-l-cyan-400 bg-brand-800 px-5 py-4 text-[14px] leading-relaxed text-slate-200">
                    Responda a pergunta anterior para continuar.
                  </p>
                )}

                {perfil && (
                  <div className="mt-8 rounded-2xl border border-brand-600 bg-brand-800 p-6 shadow-xl md:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                          Resultado da seleção
                        </p>
                        <h3 className="mt-3 font-['Playfair_Display'] text-2xl font-bold leading-tight text-white md:text-3xl">
                          {perfil.titulo}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={alterarSituacao}
                        className="text-[13px] font-bold text-cyan-300 underline decoration-cyan-500 underline-offset-4 hover:text-cyan-200"
                      >
                        alterar
                      </button>
                    </div>

                    <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-slate-200">
                      {perfil.texto}
                    </p>

                    <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                      <div>
                        <h4 className="font-['Playfair_Display'] text-xl font-bold text-white">
                          Cuidados que valem para o seu caso
                        </h4>
                        <ul className="mt-5 space-y-4">
                          {perfil.cuidados.map((cuidado) => (
                            <li
                              key={cuidado}
                              className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-200"
                            >
                              <AlertTriangle
                                size={18}
                                aria-hidden="true"
                                className="mt-0.5 flex-shrink-0 text-cyan-300"
                              />
                              <span>{cuidado}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-['Playfair_Display'] text-xl font-bold text-white">
                          Benefícios para conhecer
                        </h4>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          {beneficios.map((beneficio) => (
                            <article
                              key={beneficio.id}
                              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 text-brand-800 shadow-sm"
                            >
                              <h5 className="font-['Playfair_Display'] text-[17px] font-bold leading-snug">
                                {beneficio.titulo}
                              </h5>
                              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">
                                {beneficio.oQueE}
                              </p>
                              <p className="mt-4 flex-1 border-l-4 border-l-cyan-500 bg-slate-50 px-3.5 py-3 text-[13px] leading-relaxed text-slate-700">
                                <strong className="font-bold text-brand-800">Cuidado:</strong>{" "}
                                {beneficio.cuidado}
                              </p>
                              {beneficio.href && (
                                <Link
                                  href={beneficio.href}
                                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-cyan-700 hover:text-cyan-800"
                                >
                                  Conhecer o serviço <ArrowRight size={15} />
                                </Link>
                              )}
                            </article>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {perfil && (
          <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:p-8">
                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-brand-800">
                    Quer conversar sobre o seu caso?
                  </h2>
                  <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-slate-600">
                    Fale com o escritório para entender o atendimento indicado. O
                    primeiro contato não exige o envio de documentos.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsapp(mensagemWhatsApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3.5 text-[14px] font-bold text-brand-950 transition-colors hover:bg-cyan-400"
                  >
                    <Phone size={16} aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                  <Link
                    href="/servicos"
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-800 px-5 py-3.5 text-[14px] font-bold text-brand-800 transition-colors hover:bg-brand-800 hover:text-white"
                  >
                    Ver todos os serviços
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <DuvidasAntesDeContratar />
      <ChamadaFinal
        titulo="Vamos analisar o seu caso"
        mensagem={mensagemWhatsApp}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
