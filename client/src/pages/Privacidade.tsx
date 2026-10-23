import { Link } from "wouter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BotaoWhatsApp, Trilha } from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd } from "@/components/site/Seo";
import { SITE } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Política de Privacidade" },
];

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Política de Privacidade"
        descricao="Como o site do escritório usa cookies para medir visitas e anúncios e como são tratados os dados enviados pelo formulário de contato."
        caminho="/privacidade"
        palavrasChave="política de privacidade, cookies, LGPD, dados do formulário"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Início", href: "/" },
            { label: "Política de Privacidade", href: "/privacidade" },
          ]),
        ]}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-14 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
            Esta página explica como o site do escritório mede as visitas e como
            são tratados os dados enviados pelo formulário de contato.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-brand-800">
            Cookies e medição
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
            <p>
              O site usa a tag do Google Ads para medir visitas vindas de
              anúncios e cliques nos botões de contato. Essa medição registra
              informações como a página visitada, o horário do acesso e dados
              técnicos do navegador, e não identifica o visitante pelo nome.
            </p>
            <p>
              Na primeira visita aparece um aviso na parte de baixo da tela, com
              as opções <strong>Aceitar</strong> e <strong>Recusar</strong>. Ao
              recusar, a medição fica desativada e nenhum cookie de publicidade
              é gravado. A escolha fica guardada no seu navegador e o aviso não
              volta a aparecer.
            </p>
            <p>
              Você também pode apagar ou bloquear cookies pelas configurações do
              seu navegador a qualquer momento. O site continua funcionando
              normalmente.
            </p>
          </div>

          <h2 className="mt-14 font-['Playfair_Display'] text-2xl font-bold text-brand-800">
            Formulário de contato
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
            <p>
              Os dados digitados no formulário da página{" "}
              <Link
                href="/ctc"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                CTC
              </Link>{" "}
              (nome, WhatsApp, e-mail e mensagem) são enviados ao escritório
              pelo WhatsApp e usados apenas para responder ao contato. O mesmo
              vale para o formulário da{" "}
              <Link
                href="/contato"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                página de contato
              </Link>
              .
            </p>
            <p>
              Não usamos esses dados para outra finalidade, não vendemos e não
              compartilhamos essas informações com terceiros para publicidade. A
              conversa fica registrada no WhatsApp, sob as políticas do próprio
              aplicativo.
            </p>
          </div>

          <h2 className="mt-14 font-['Playfair_Display'] text-2xl font-bold text-brand-800">
            Controlador
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700">
            <p>
              {SITE.nomeCompleto}, {SITE.responsavel}, {SITE.oab}. Contato:{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                {SITE.email}
              </a>
              .
            </p>
            <p>{SITE.endereco.completo}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
