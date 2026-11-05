import { useEffect, useState } from "react";
import { Link } from "wouter";

/** Chave onde fica guardada a escolha do visitante. */
export const CHAVE_COOKIES = "sd_cookies";

const NEGADO = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const CONCEDIDO = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

/**
 * Aviso de cookies (LGPD).
 *
 * Aparece uma única vez, na parte de baixo da tela, em todas as páginas. A
 * escolha fica guardada no navegador e o aviso não volta a aparecer.
 */
export function AvisoCookies() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE_COOKIES) === null) setVisivel(true);
    } catch {
      // Navegador com armazenamento bloqueado: o aviso aparece e a escolha
      // vale para esta visita.
      setVisivel(true);
    }
  }, []);

  if (!visivel) return null;

  const escolher = (valor: "aceito" | "recusado") => {
    try {
      localStorage.setItem(CHAVE_COOKIES, valor);
    } catch {
      // Sem armazenamento disponível, a escolha vale para esta visita.
    }
    window.gtag?.("consent", "update", valor === "aceito" ? CONCEDIDO : NEGADO);
    setVisivel(false);
  };

  return (
    // A faixa fica acima de toda a área do flutuante, inclusive em tablet e
    // com zoom. Não depende de medir a altura por JavaScript nem cobre as ações.
    <div
      role="region"
      aria-label="Preferências de cookies"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(6.5rem+env(safe-area-inset-bottom,0px))] z-30 p-3 sm:p-4"
    >
      <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 rounded-xl border border-white/10 bg-[#0b1f37]/95 px-4 py-3 text-[13px] text-slate-100 shadow-2xl backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <p className="leading-relaxed">
          Usamos cookies para medir o desempenho do site e dos nossos anúncios.
          Saiba mais na{" "}
          <Link
            href="/privacidade"
            className="font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => escolher("recusado")}
            className="min-h-11 min-w-24 flex-1 rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10 sm:flex-none"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => escolher("aceito")}
            className="min-h-11 min-w-24 flex-1 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-[#0b1f37] transition hover:bg-cyan-300 sm:flex-none"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
