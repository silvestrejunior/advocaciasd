import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * Registra a visualização de cada página do site.
 *
 * A tag do Google (Google Ads AW-17096336975) é carregada no `<head>` de todas
 * as páginas e conta a primeira visualização sozinha. Como o site navega sem
 * recarregar a página, as trocas de rota seguintes precisam ser avisadas —
 * é isso que este componente faz, uma única vez por rota visitada.
 */
export function TagGoogle() {
  const [caminho] = useLocation();
  const ultimo = useRef<string | null>(null);

  useEffect(() => {
    // A primeira página já foi contada pela tag carregada no <head>.
    if (ultimo.current === null) {
      ultimo.current = caminho;
      return;
    }
    if (ultimo.current === caminho) return;

    ultimo.current = caminho;
    window.gtag?.("event", "page_view", {
      page_path: caminho,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [caminho]);

  return null;
}
