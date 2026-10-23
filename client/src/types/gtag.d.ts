/**
 * Tipos da tag do Google (gtag.js), carregada no `<head>` do site.
 *
 * Fica em um arquivo próprio para que os componentes usem a mesma declaração
 * de `window.dataLayer` e `window.gtag`.
 */
interface Window {
  dataLayer: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
}