import { useRef, useState } from "react";
import { SITE, whatsapp } from "@/config/site";
import {
  montarMensagemAposentadoria,
  type RespostaInsalubridade,
  type RespostaRural,
} from "@/lib/aposentadoriaContato";
import { trackWhatsApp } from "@/lib/tracking";

const IDADES = Array.from({ length: 63 }, (_, indice) => String(indice + 18));

const botaoOpcaoBase =
  "min-h-12 rounded-lg border-2 px-6 py-3 text-[20px] font-bold leading-6 transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]";

export default function SelecaoAposentadoria() {
  const [idade, setIdade] = useState("");
  const [rural, setRural] = useState<RespostaRural>(null);
  const [insalubridade, setInsalubridade] =
    useState<RespostaInsalubridade>(null);
  const [erroIdade, setErroIdade] = useState(false);
  const idadeRef = useRef<HTMLSelectElement>(null);

  const enviarPeloWhatsApp = () => {
    const mensagem = montarMensagemAposentadoria({
      idade,
      rural,
      insalubridade,
    });

    if (!mensagem) {
      setErroIdade(true);
      idadeRef.current?.focus();
      return;
    }

    const urlWhatsApp = whatsapp(mensagem);
    trackWhatsApp("formulario");
    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="comece"
      aria-labelledby="cp-selecao-titulo"
      className="bg-white px-5 py-16 text-[17px] leading-7 text-[#32414E] sm:px-8 md:py-24"
      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
    >
      <div className="mx-auto max-w-3xl">
        <p className="border-l-4 border-[#00AEEF] pl-4 text-[17px] font-bold uppercase tracking-[0.16em] text-[#32414E]">
          COMECE POR AQUI
        </p>
        <h2
          id="cp-selecao-titulo"
          className="mt-5 text-3xl font-bold leading-tight sm:text-4xl"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Conte um pouco sobre você
        </h2>
        <p className="mt-5 text-[17px] leading-7">
          Responda três perguntas e envie pelo WhatsApp. A conversa já começa
          com essas informações.
        </p>

        <div className="mt-10 space-y-9">
          <div>
            <label
              htmlFor="cp-idade"
              className="block text-[17px] font-bold leading-7"
            >
              Sua idade:
            </label>
            <select
              ref={idadeRef}
              id="cp-idade"
              value={idade}
              onChange={event => {
                setIdade(event.target.value);
                if (event.target.value) setErroIdade(false);
              }}
              aria-invalid={erroIdade || undefined}
              aria-describedby={erroIdade ? "cp-idade-erro" : undefined}
              className={`mt-3 min-h-12 w-full rounded-lg border-2 bg-white px-4 py-2 text-[17px] leading-7 text-[#32414E] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF] sm:max-w-sm ${erroIdade ? "border-[#0066AD]" : "border-[#32414E]/40"}`}
            >
              <option value="">Selecione</option>
              {IDADES.map(opcao => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
            {erroIdade && (
              <p
                id="cp-idade-erro"
                role="alert"
                className="mt-3 text-[17px] font-bold leading-7 text-[#32414E]"
              >
                Selecione sua idade
              </p>
            )}
          </div>

          <fieldset className="m-0 border-0 p-0">
            <legend className="text-[17px] font-bold leading-7">
              Você já trabalhou no meio rural?
            </legend>
            <p className="mt-2 text-[17px] leading-7">
              Vale ter trabalhado na roça com a família, como boia-fria ou como
              empregado rural, mesmo sem registro.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(
                [
                  ["sim", "Sim"],
                  ["nao", "Não"],
                ] as const
              ).map(([valor, rotulo]) => {
                const selecionado = rural === valor;
                return (
                  <button
                    key={valor}
                    type="button"
                    aria-pressed={selecionado}
                    onClick={() => setRural(valor)}
                    className={`${botaoOpcaoBase} ${selecionado ? "border-[#0066AD] bg-[#0066AD]/10 text-[#0066AD]" : "border-[#00AEEF] bg-white text-[#32414E] hover:bg-[#00AEEF]/10"}`}
                  >
                    {rotulo}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="m-0 border-0 p-0">
            <legend className="text-[17px] font-bold leading-7">
              Você já trabalhou exposto a insalubridade?
            </legend>
            <p className="mt-2 text-[17px] leading-7">
              Por exemplo: ruído, calor, produtos químicos, poeira, eletricidade
              ou contato com doenças em hospitais e postos de saúde.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(
                [
                  ["sim", "Sim"],
                  ["nao", "Não"],
                  ["nao-sei", "Não sei"],
                ] as const
              ).map(([valor, rotulo]) => {
                const selecionado = insalubridade === valor;
                return (
                  <button
                    key={valor}
                    type="button"
                    aria-pressed={selecionado}
                    onClick={() => setInsalubridade(valor)}
                    className={`${botaoOpcaoBase} ${selecionado ? "border-[#0066AD] bg-[#0066AD]/10 text-[#0066AD]" : "border-[#00AEEF] bg-white text-[#32414E] hover:bg-[#00AEEF]/10"}`}
                  >
                    {rotulo}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-10">
          <button
            type="button"
            data-cp-whatsapp-send="true"
            onClick={enviarPeloWhatsApp}
            className="min-h-12 w-full rounded-lg bg-[#1F8F4E] px-6 py-3 text-[20px] font-bold leading-7 text-white transition-colors hover:bg-[#1F8F4E] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
          >
            Enviar pelo WhatsApp
          </button>
          <p className="mt-5 text-[17px] leading-7">
            Suas respostas não são gravadas nesta página. Ao tocar no botão,
            você abre o WhatsApp com a mensagem preparada. Você confere e envia
            a mensagem no próprio WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
