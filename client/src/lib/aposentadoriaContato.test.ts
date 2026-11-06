import { describe, expect, it } from "vitest";
import {
  montarMensagemAposentadoria,
  type DadosAposentadoria,
} from "./aposentadoriaContato";

describe("montarMensagemAposentadoria", () => {
  const combinacoes: Array<
    Omit<DadosAposentadoria, "idade"> & { mensagem: string }
  > = [
    {
      rural: null,
      insalubridade: null,
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: null,
      insalubridade: "sim",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: null,
      insalubridade: "nao",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, não trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: null,
      insalubridade: "nao-sei",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, não sei se trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "sim",
      insalubridade: null,
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei no meio rural. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "sim",
      insalubridade: "sim",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei no meio rural e já trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "sim",
      insalubridade: "nao",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei no meio rural e não trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "sim",
      insalubridade: "nao-sei",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei no meio rural e não sei se trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "nao",
      insalubridade: null,
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, não trabalhei no meio rural. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "nao",
      insalubridade: "sim",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, não trabalhei no meio rural e já trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "nao",
      insalubridade: "nao",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, não trabalhei no meio rural e não trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
    {
      rural: "nao",
      insalubridade: "nao-sei",
      mensagem:
        "Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, não trabalhei no meio rural e não sei se trabalhei com insalubridade. Gostaria de orientação para o meu pedido.",
    },
  ];

  it.each(combinacoes)(
    "monta a mensagem para rural=$rural e insalubridade=$insalubridade",
    ({ rural, insalubridade, mensagem }) => {
      expect(
        montarMensagemAposentadoria({
          idade: "58",
          rural,
          insalubridade,
        })
      ).toBe(mensagem);
    }
  );

  it.each(["", "17", "81", "18.5", "80.1", "abc", "58 anos"])(
    "retorna null para idade inválida: %s",
    idade => {
      expect(
        montarMensagemAposentadoria({
          idade,
          rural: "sim",
          insalubridade: "nao-sei",
        })
      ).toBeNull();
    }
  );

  it.each(["18", "80"])("aceita o limite de idade: %s", idade => {
    expect(
      montarMensagemAposentadoria({
        idade,
        rural: null,
        insalubridade: null,
      })
    ).toContain(`Tenho ${idade} anos.`);
  });
});
