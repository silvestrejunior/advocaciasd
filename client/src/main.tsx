import { createRoot } from "react-dom/client";
import App from "./App";
import { ativarPreBusca, precarregarRota } from "./lib/paginas";
import { trackWhatsApp } from "./lib/tracking";
import "./index.css";

// Conversão do Google Ads: qualquer clique em link do WhatsApp é medido, de
// qualquer página e inclusive nos links que abrem em nova aba. O ouvinte está
// em fase de captura e não bloqueia a abertura do link.
document.addEventListener(
  "click",
  evento => {
    const alvo = evento.target as Element | null;
    if (alvo?.closest?.('a[href*="wa.me"], a[href*="whatsapp.com"]')) {
      trackWhatsApp("link");
    }
  },
  { capture: true }
);

// A pré-busca nos links internos evita suspensão na navegação entre páginas.
ativarPreBusca();

const container = document.getElementById("root")!;

// O HTML inicial continua completo para leitores e buscadores sem JavaScript.
// Ele é um snapshot do DOM de um navegador, e não renderToString do React:
// faltam os marcadores de nós de texto necessários para hydrateRoot. Montar
// normalmente evita a divergência #418. Para que a montagem não deixe a tela
// vazia, o módulo da rota é baixado antes: a página renderiza de forma
// síncrona e o conteúdo do snapshot é trocado sem intervalo em branco.
async function iniciar() {
  await precarregarRota(window.location.pathname);
  createRoot(container).render(<App />);
}

void iniciar();
