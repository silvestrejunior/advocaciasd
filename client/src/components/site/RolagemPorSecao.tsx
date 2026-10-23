/**
 * Rolagem por seção.
 *
 * A página é percorrida em paradas: cada gesto leva ao início da seção
 * seguinte e, quando uma seção é mais alta que a tela, ela é percorrida em
 * passos de uma tela — sempre alinhados ao topo, sem pular conteúdo.
 *
 * Regras que mantêm a leitura confortável:
 *
 *   - páginas de artigo (com <article>) rolam livremente, sem interceptação;
 *   - rolar para cima volta uma parada, na mesma medida;
 *   - em telas de toque o encaixe é feito pelo CSS (scroll-snap), com apoio
 *     de um ajuste leve quando o gesto termina perto do início de uma seção;
 *   - para quem pediu menos movimento, o salto é instantâneo.
 */

import { useEffect } from "react";

/** Altura reservada para o cabeçalho fixo ao alinhar a seção no topo. */
const ALTURA_CABECALHO = 88;
/** Tempo em que uma parada fica em curso, para não encadear duas de uma vez. */
const TRAVA_MS = 750;
/** Passo mínimo entre duas paradas, para não criar avanços curtos demais. */
const PASSO_MINIMO = 220;
/** Quanto o gesto de toque pode estar fora da parada para o ajuste valer. */
const ATRACAO_TOQUE = 150;

type Parada = number;

/**
 * Páginas de leitura (artigos) rolam livremente. A marcação é lida a cada
 * gesto porque o site troca de página sem recarregar o aplicativo.
 */
function modoLeitura() {
  return !!document.querySelector('[data-pagina="artigo"]');
}

/**
 * Áreas com rolagem própria (listas, painéis) continuam rolando por conta
 * própria: a parada por seção não deve capturar o gesto dentro delas.
 */
function rolagemPropria(elemento: EventTarget | null, sentido: number) {
  let atual = elemento instanceof HTMLElement ? elemento : null;
  while (atual && atual !== document.body) {
    const estilo = window.getComputedStyle(atual);
    if (
      /(auto|scroll)/.test(estilo.overflowY) &&
      atual.scrollHeight > atual.clientHeight + 1
    ) {
      const noTopo = atual.scrollTop <= 0;
      const noFim =
        atual.scrollTop + atual.clientHeight >= atual.scrollHeight - 1;
      if ((sentido > 0 && !noFim) || (sentido < 0 && !noTopo)) return true;
    }
    atual = atual.parentElement;
  }
  return false;
}

function medirParadas(): Parada[] {
  const alturaTela = window.innerHeight;
  const passo = Math.max(320, alturaTela - ALTURA_CABECALHO);
  const limiteFinal = Math.max(
    0,
    document.documentElement.scrollHeight - alturaTela
  );

  const secoes = Array.from(document.querySelectorAll<HTMLElement>("section"))
    .map(el => {
      const topo = el.getBoundingClientRect().top + window.scrollY;
      return { topo, altura: el.offsetHeight };
    })
    .filter(secao => secao.altura > 0)
    .sort((a, b) => a.topo - b.topo);

  type Candidata = { topo: number; inicio: boolean; final?: boolean };
  const candidatas: Candidata[] = [{ topo: 0, inicio: true }];

  for (const secao of secoes) {
    const inicio = Math.max(0, secao.topo - ALTURA_CABECALHO);
    const fim = secao.topo + secao.altura;
    candidatas.push({ topo: Math.min(inicio, limiteFinal), inicio: true });

    // Seção mais alta que a tela: percorre em passos de uma tela e garante
    // uma parada com o fim da seção visível.
    let y = inicio;
    while (y + passo < fim - ALTURA_CABECALHO) {
      y += passo;
      candidatas.push({ topo: Math.min(y, limiteFinal), inicio: false });
    }
    candidatas.push({
      topo: Math.min(Math.max(inicio, fim - alturaTela), limiteFinal),
      inicio: false,
    });
  }
  candidatas.push({ topo: limiteFinal, inicio: false, final: true });

  // Passos curtos são absorvidos: o início de seção tem prioridade sobre uma
  // parada intermediária que ficou perto dele.
  const escolhidas: Candidata[] = [];
  for (const candidata of candidatas.sort((a, b) => a.topo - b.topo)) {
    const ultima = escolhidas[escolhidas.length - 1];
    if (!ultima) {
      escolhidas.push(candidata);
      continue;
    }
    if (candidata.topo - ultima.topo >= PASSO_MINIMO) {
      escolhidas.push(candidata);
      continue;
    }
    if (candidata.final) {
      escolhidas.push(candidata);
      continue;
    }
    if (candidata.inicio && !ultima.inicio)
      escolhidas[escolhidas.length - 1] = candidata;
  }

  return escolhidas.map(candidata => candidata.topo);
}

export function RolagemPorSecao() {
  useEffect(() => {
    const movimentoReduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const ponteiroFino = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const ponteiroGrosso = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    );
    const marcar = () => {
      document.documentElement.dataset.rolagem = modoLeitura()
        ? "leitura"
        : ponteiroFino.matches
          ? "secoes"
          : ponteiroGrosso.matches
            ? "secoes-toque"
            : "sem-ponteiro";
    };
    marcar();

    let travado = false;

    const irPara = (topo: number) => {
      travado = true;
      window.scrollTo({
        top: Math.max(0, topo),
        behavior: movimentoReduzido.matches ? "auto" : "smooth",
      });
      window.setTimeout(
        () => {
          travado = false;
        },
        movimentoReduzido.matches ? 120 : TRAVA_MS
      );
    };

    const limpezas: (() => void)[] = [];

    // ------------------------------------------------ mouse: uma parada por gesto
    if (ponteiroFino.matches) {
      const aoRolar = (evento: WheelEvent) => {
        if (travado || evento.ctrlKey || evento.metaKey) return;
        if (Math.abs(evento.deltaY) < 1) return;
        if (rolagemPropria(evento.target, evento.deltaY)) return;
        marcar();
        if (modoLeitura()) return;

        const paradas = medirParadas();
        const atual = window.scrollY;
        const alvo =
          evento.deltaY > 0
            ? paradas.find(parada => parada > atual + 8)
            : [...paradas].reverse().find(parada => parada < atual - 8);

        // Sem parada adiante: deixa a rolagem natural terminar o percurso.
        if (alvo === undefined) return;

        evento.preventDefault();
        irPara(alvo);
      };

      window.addEventListener("wheel", aoRolar, { passive: false });
      limpezas.push(() => window.removeEventListener("wheel", aoRolar));
    }

    // ------------------------- toque: ajuste leve quando o gesto para perto da parada
    if (ponteiroGrosso.matches && !movimentoReduzido.matches) {
      let temporizador = 0;
      const aoParar = () => {
        window.clearTimeout(temporizador);
        temporizador = window.setTimeout(() => {
          marcar();
          if (modoLeitura()) return;
          const paradas = medirParadas();
          const atual = window.scrollY;
          const proxima = paradas.reduce(
            (melhor, parada) =>
              Math.abs(parada - atual) < Math.abs(melhor - atual)
                ? parada
                : melhor,
            paradas[0]
          );
          const distancia = Math.abs(proxima - atual);
          if (distancia > 24 && distancia < ATRACAO_TOQUE) {
            window.scrollTo({ top: proxima, behavior: "smooth" });
          }
        }, 220);
      };

      window.addEventListener("scroll", aoParar, { passive: true });
      limpezas.push(() => {
        window.clearTimeout(temporizador);
        window.removeEventListener("scroll", aoParar);
      });
    }

    return () => {
      limpezas.forEach(limpar => limpar());
      delete document.documentElement.dataset.rolagem;
    };
  }, []);

  return null;
}
