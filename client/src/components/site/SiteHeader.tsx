import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { MENU, SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

type Props = {
  /**
   * Quando a página começa com um bloco escuro (hero), o cabeçalho fica
   * transparente no topo e ganha fundo sólido depois da rolagem.
   */
  sobreHeroEscuro?: boolean;
};

export function SiteHeader({ sobreHeroEscuro = false }: Props) {
  const [location] = useLocation();
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [aberto, setAberto] = useState<string | null>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    setMenuAberto(false);
    setAberto(null);
  }, [location]);

  const solido = !sobreHeroEscuro || rolou || menuAberto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solido
          ? "bg-white/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center gap-6 px-4 py-3 lg:py-4">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3">
          <img
            src={solido ? SITE.logo : SITE.logoClaro}
            alt={`${SITE.nomeCompleto} — logotipo`}
            className="h-11 w-auto"
          />
          <span className="leading-tight">
            <span
              className={`block font-['Playfair_Display'] text-lg font-bold ${
                solido ? "text-blue-900" : "text-white"
              }`}
            >
              {SITE.nome}
            </span>
            <span
              className={`block text-[10px] font-semibold tracking-[0.28em] ${
                solido ? "text-cyan-600" : "text-cyan-300"
              }`}
            >
              ADVOCACIA
            </span>
          </span>
        </Link>

        {/* Navegação de desktop */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {MENU.map((item) => {
            const ativo =
              item.href === "/"
                ? location === "/"
                : location.startsWith(item.href.split("#")[0]);
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.filhos && setAberto(item.label)}
                onMouseLeave={() => setAberto(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors ${
                    solido
                      ? ativo
                        ? "text-cyan-700"
                        : "text-slate-700 hover:text-cyan-700"
                      : ativo
                        ? "text-cyan-300"
                        : "text-blue-50 hover:text-cyan-300"
                  }`}
                  aria-current={ativo ? "page" : undefined}
                >
                  {item.label}
                  {item.filhos && (
                    <ChevronDown size={13} className="opacity-60" />
                  )}
                </Link>

                {item.filhos && aberto === item.label && (
                  <div className="absolute left-0 top-full z-50 w-80 pt-2">
                    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
                      {item.filhos.map((filho) => (
                        <Link
                          key={filho.href + filho.label}
                          href={filho.href}
                          className="block border-b border-slate-50 px-4 py-3 last:border-0 hover:bg-cyan-50/60"
                        >
                          <span className="block text-sm font-semibold text-blue-900">
                            {filho.label}
                          </span>
                          {filho.descricao && (
                            <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                              {filho.descricao}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <a
            href={whatsapp(WHATSAPP_MENSAGENS.geral)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-green-600"
          >
            <Phone size={15} />
            WhatsApp
          </a>
        </nav>

        {/* Botão do menu móvel */}
        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className={`ml-auto rounded-lg p-2 lg:hidden ${
            solido ? "text-blue-900" : "text-white"
          }`}
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navegação móvel */}
      {menuAberto && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-slate-100 bg-white px-4 pb-6 lg:hidden">
          {MENU.map((item) => (
            <div key={item.label} className="border-b border-slate-100 py-3">
              <Link
                href={item.href}
                className="block text-[15px] font-semibold text-blue-900"
              >
                {item.label}
              </Link>
              {item.filhos && (
                <div className="mt-1.5 space-y-1 pl-3">
                  {item.filhos.map((filho) => (
                    <Link
                      key={filho.href + filho.label}
                      href={filho.href}
                      className="block py-1 text-[13.5px] text-slate-600"
                    >
                      {filho.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href={whatsapp(WHATSAPP_MENSAGENS.geral)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-sm font-bold text-white"
          >
            <Phone size={16} />
            Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}