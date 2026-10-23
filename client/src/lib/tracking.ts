/**
 * Medição dos cliques no WhatsApp para o Google Ads.
 *
 * A conversão é disparada em um único lugar, para que nenhum caminho do site
 * fique sem medição e para que o mesmo clique nunca seja contado duas vezes.
 */

/** Conversão "Clique no WhatsApp" configurada no Google Ads. */
export const CONVERSAO_WHATSAPP = "AW-17096336975/0KROCN2brKcdEM_Mldg_";

/** Intervalo mínimo entre duas conversões, em milissegundos. */
const INTERVALO_MINIMO = 1000;

let ultimoDisparo = 0;

/**
 * Registra um clique para o WhatsApp.
 *
 * @param origem de onde partiu o clique: `"link"` para links e botões que levam
 * ao WhatsApp e `"formulario"` para as aberturas feitas no envio de formulário.
 */
export function trackWhatsApp(origem: string) {
  if (typeof window === "undefined") return;

  // O mesmo clique pode passar por mais de um caminho (um link com evento
  // próprio, por exemplo): a conversão continua sendo uma só.
  const agora = Date.now();
  if (agora - ultimoDisparo < INTERVALO_MINIMO) return;
  ultimoDisparo = agora;

  window.gtag?.("event", "conversion", { send_to: CONVERSAO_WHATSAPP });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    origem,
    pagina: window.location.pathname,
  });
}
