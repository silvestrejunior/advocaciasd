import { Link } from "wouter";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  FaixaCta,
  Selo,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd } from "@/components/site/Seo";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [{ label: "Início", href: "/" }, { label: "Sobre" }];

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Sobre o escritório"
        descricao={`${SITE.nomeCompleto} — atuação especializada em Direito Previdenciário com ${SITE.experiencia} de experiência. Aposentadorias do INSS e de servidores públicos, em Maringá/PR e em todo o Brasil.`}
        caminho="/sobre"
        jsonLd={breadcrumbJsonLd([
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
        ])}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Um escritório dedicado ao Direito Previdenciário
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
            Trabalhamos com um recorte específico: aposentadorias e benefícios
            previdenciários, tanto no regime geral quanto nos regimes próprios de
            servidores públicos. É o que nos permite acompanhar as mudanças que a
            reforma de 2019 trouxe a cada ano — e explicá-las de forma simples.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              <TituloSecao
                sobretitulo="Como trabalhamos"
                titulo="Primeiro o cálculo, depois o pedido"
                texto="A maior parte dos problemas previdenciários nasce de um pedido feito sem planejamento: uma regra escolhida por impulso, um documento que faltou ou um tempo de contribuição mal lido no CNIS. O nosso método começa pelo contrário."
              />
              <div className="mt-9 space-y-6">
                <Selo
                  titulo="Leitura do histórico antes de tudo"
                  texto="Analisamos o CNIS e os documentos para saber exatamente qual tempo já está reconhecido e o que precisa ser corrigido."
                />
                <Selo
                  titulo="Comparação de regras, com datas"
                  texto="Calculamos todas as regras aplicáveis ao mesmo tempo e mostramos quando cada uma se torna possível e quanto renderia."
                />
                <Selo
                  titulo="Atuação nas duas esferas"
                  texto="Pedido, recurso administrativo e ação judicial — sem recomeçar do zero quando algo é indeferido."
                />
              </div>
            </div>

            <div className="space-y-7">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
                  Responsável
                </h2>
                <p className="mt-4 font-['Playfair_Display'] text-2xl font-bold text-brand-800">
                  {SITE.responsavel}
                </p>
                <p className="mt-1 text-sm font-semibold text-cyan-700">
                  {SITE.oab}
                </p>
                <p className="mt-5 text-[14.5px] leading-relaxed text-slate-600">
                  Advogado responsável pelo escritório, com atuação concentrada em
                  Direito Previdenciário e atendimento a segurados do INSS e a
                  servidores públicos de regimes próprios.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
                  Onde estamos
                </h2>
                <ul className="mt-5 space-y-3.5 text-[14px] text-slate-700">
                  <li className="flex gap-2.5">
                    <MapPin size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                    <span>
                      {SITE.endereco.linha1}
                      <br />
                      {SITE.endereco.linha2}
                      <br />
                      {SITE.endereco.linha3}
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <Clock size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                    <span>{SITE.horario}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Phone size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                    <a
                      href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-700"
                    >
                      {SITE.whatsappExibicao}
                    </a>
                  </li>
                  <li className="flex gap-2.5">
                    <Mail size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                    <a href={`mailto:${SITE.email}`} className="hover:text-cyan-700">
                      {SITE.email}
                    </a>
                  </li>
                </ul>
                <Link
                  href="/contato"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-800 px-6 py-3.5 text-[14px] font-bold text-white hover:bg-brand-700"
                >
                  Ir para o contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaixaCta
        titulo="Quer entender a sua situação antes de decidir?"
        texto="O primeiro passo é uma conversa. Conte o seu caso e indicamos quais documentos são necessários."
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
