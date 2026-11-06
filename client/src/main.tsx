import { createRoot } from "react-dom/client";
import App from "./App";
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

const container = document.getElementById("root")!;

// O HTML inicial continua completo para leitores e buscadores sem JavaScript.
// Ele é um snapshot do DOM de um navegador, e não renderToString do React:
// faltam os marcadores de nós de texto necessários para hydrateRoot. Montar
// normalmente evita a divergência #418; o snapshot permanece até o primeiro
// commit da árvore interativa, com o mesmo conteúdo e os mesmos estilos.
createRoot(container).render(<App />);
