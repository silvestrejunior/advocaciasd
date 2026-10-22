/**
 * Rolagem por seção.
 *
 * Em vez da rolagem contínua, cada gesto leva ao início da seção seguinte — o
 * conteúdo fica enquadrado, como em uma apresentação. As regras abaixo existem
 * para que isso não prenda quem está lendo:
 *
 *   - seção que não cabe na tela: a rolagem dentro dela é livre e só o fim da
 *     seção adianta para a próxima, para não pular conteúdo;
 *   - rolar para cima volta uma seção, sem travar no meio do caminho;
 *   - em telas de toque nada é interceptado (lá quem cuida do encaixe é o CSS)
 *     e, para quem pediu menos movimento, o salto é instantâneo.
 */

import { useEffect } from "react";

/** Altura reservada para o cabeçalho fixo ao alinhar a seção no topo. */
const ALTURA_CABECALHO = 88;
/** Tempo em que um salto fica em curso, para não encadear dois de uma vez. */
const TRAVA_MS = 700;

export function RolagemPorSecao() {
  useEffect(() => {
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ponteiroFino = window.matchMedia("(hover: hover) and (pointer: fine)");
    // Marca no HTML que o encaixe está ativo (também serve para inspeção).
    document.documentElement.dataset.rolagem = ponteiroFino.matches
      ? "secoes"
      : "sem-ponteiro-fino";

    if (!ponteiroFino.matches) return;

    let travado = false;

    const medirSecoes = () =>
      Array.from(document.querySelectorAll<HTMLElement>("section"))
        .map((el) => {
          const topo = el.getBoundingClientRect().top + window.scrollY;
          return {
            topo,
            altura: el.offsetHeight,
            cabe: el.offsetHeight <= window.innerHeight - ALTURA_CABECALHO,
          };
        })
        .filter((secao) => secao.altura > 0)
        .sort((a, b) => a.topo - b.topo);

    const irPara = (topo: number) => {
      travado = true;
      window.scrollTo({
        top: Math.max(0, topo - ALTURA_CABECALHO),
        behavior: movimentoReduzido.matches ? "auto" : "smooth",
      });
      window.setTimeout(
        () => {
          travado = false;
        },
        movimentoReduzido.matches ? 120 : TRAVA_MS,
      );
    };

    const aoRolar = (evento: WheelEvent) => {
      if (travado || evento.ctrlKey || evento.metaKey) return;

      const secoes = medirSecoes();
      const atual = secoes
        .filter((secao) => secao.topo - ALTURA_CABECALHO <= window.scrollY + 4)
        .pop();

      // Descendo: vai para a seção seguinte.
      if (evento.deltaY > 0) {
        const proxima = secoes.find(
          (secao) => secao.topo - ALTURA_CABECALHO > window.scrollY + 4,
        );
        if (!proxima) return;

        // Seção que passa da tela: primeiro a pessoa lê até o fim dela.
        if (atual && !atual.cabe) {
          const fimDaSecao = atual.topo + atual.altura;
          if (window.scrollY + window.innerHeight < fimDaSecao - 16) return;
        }

        evento.preventDefault();
        irPara(proxima.topo);
        return;
      }

      // Subindo: volta para a seção anterior, apenas quando já está no início
      // da seção atual — assim ninguém é arrancado do meio de um texto.
      if (evento.deltaY < 0 && atual) {
        const inicioDaAtual = atual.topo - ALTURA_CABECALHO;
        if (Math.abs(window.scrollY - inicioDaAtual) <= 6) {
          const anterior = secoes
            .filter((secao) => secao.topo - ALTURA_CABECALHO < window.scrollY - 6)
            .pop();
          if (!anterior) return;
          evento.preventDefault();
          irPara(anterior.topo);
        }
      }
    };

    window.addEventListener("wheel", aoRolar, { passive: false });
    return () => {
      window.removeEventListener("wheel", aoRolar);
      delete document.documentElement.dataset.rolagem;
    };
  }, []);

  return null;
}
