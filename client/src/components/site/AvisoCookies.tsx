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
    // O invólucro não intercepta cliques: assim o botão do WhatsApp, que fica
    // no canto inferior direito, continua acessível enquanto o aviso está na tela.
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 rounded-xl border border-white/10 bg-[#0b1f37]/95 px-4 py-3 text-xs text-slate-200/90 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pr-24 sm:text-[13px]">
        <p className="pr-20 leading-relaxed sm:pr-0">
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
        <div className="flex flex-shrink-0 items-center gap-2 pr-20 sm:pr-0">
          <button
            type="button"
            onClick={() => escolher("recusado")}
            className="rounded-lg border border-white/25 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-white/50 hover:bg-white/5"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => escolher("aceito")}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-bold text-[#0b1f37] transition hover:bg-cyan-300"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
