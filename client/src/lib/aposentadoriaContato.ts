export type RespostaRural = "sim" | "nao" | null;
export type RespostaInsalubridade = "sim" | "nao" | "nao-sei" | null;

export type DadosAposentadoria = {
  idade: string;
  rural: RespostaRural;
  insalubridade: RespostaInsalubridade;
};

const MENSAGEM_INICIAL = "Olá! Vi a página sobre como pedir a aposentadoria.";
const PEDIDO_ORIENTACAO = "Gostaria de orientação para o meu pedido.";

function idadeValida(idade: string) {
  return /^(?:1[89]|[2-7]\d|80)$/.test(idade);
}

function trechoRural(rural: RespostaRural) {
  if (rural === "sim") return "já trabalhei no meio rural";
  if (rural === "nao") return "não trabalhei no meio rural";
  return null;
}

function trechoInsalubridade(insalubridade: RespostaInsalubridade) {
  if (insalubridade === "sim") return "já trabalhei com insalubridade";
  if (insalubridade === "nao") return "não trabalhei com insalubridade";
  if (insalubridade === "nao-sei") {
    return "não sei se trabalhei com insalubridade";
  }
  return null;
}

export function montarMensagemAposentadoria({
  idade,
  rural,
  insalubridade,
}: DadosAposentadoria): string | null {
  if (!idadeValida(idade)) return null;

  const trechos = [
    trechoRural(rural),
    trechoInsalubridade(insalubridade),
  ].filter((trecho): trecho is string => Boolean(trecho));
  const informacoes = trechos.length
    ? `Tenho ${idade} anos, ${trechos.join(" e ")}.`
    : `Tenho ${idade} anos.`;

  return `${MENSAGEM_INICIAL} ${informacoes} ${PEDIDO_ORIENTACAO}`;
}
