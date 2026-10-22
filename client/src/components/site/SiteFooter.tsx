import { Link } from "wouter";
import { Clock, Mail, MapPin, Phone, Youtube } from "lucide-react";
import {
  RODAPE,
  SITE,
  WHATSAPP_MENSAGENS,
  whatsapp,
} from "@/config/site";

export function SiteFooter() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1f37] text-sm text-slate-300/80">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={SITE.logoClaro}
                alt=""
                className="h-12 w-auto"
              />
              <span className="leading-tight">
                <span className="block font-['Playfair_Display'] text-lg font-bold text-white">
                  {SITE.nome}
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.3em] text-cyan-300">
                  ADVOCACIA
                </span>
              </span>
            </div>
            <p className="mt-5 leading-relaxed">
              Atuação especializada em Direito Previdenciário, com{" "}
              {SITE.experiencia} de experiência em aposentadorias e benefícios
              do INSS e de regimes próprios de servidores públicos.
            </p>
            <p className="mt-4 text-xs text-blue-200/60">
              {SITE.responsavel} — {SITE.oab}
            </p>
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-base font-bold text-white">
              Aposentadorias
            </h3>
            <ul className="mt-4 space-y-2.5">
              {RODAPE.aposentadorias.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="hover:text-cyan-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-base font-bold text-white">
              Benefícios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {RODAPE.beneficios.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="hover:text-cyan-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-base font-bold text-white">
              Contato
            </h3>
            <ul className="mt-4 space-y-3.5">
              <li className="flex gap-2.5">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <a
                  href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300"
                >
                  {SITE.whatsappExibicao}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-cyan-300">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>
                  {SITE.endereco.linha1}
                  <br />
                  {SITE.endereco.linha2}
                  <br />
                  {SITE.endereco.linha3}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>{SITE.horario}</span>
              </li>
              <li className="flex gap-2.5">
                <Youtube size={16} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                <a
                  href={SITE.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300"
                >
                  Canal no YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-blue-200/60 md:flex-row md:items-center md:justify-between">
          <span>
            © {ano} {SITE.nomeCompleto}. Todos os direitos reservados.
          </span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {RODAPE.conteudo.map((l) => (
              <Link key={l.href + l.label} href={l.href} className="hover:text-cyan-300">
                {l.label}
              </Link>
            ))}
            {RODAPE.escritorio.map((l) => (
              <Link key={l.href + l.label} href={l.href} className="hover:text-cyan-300">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}