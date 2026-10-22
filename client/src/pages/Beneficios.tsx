import { Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BlocoModalidade,
  BotaoWhatsApp,
  FaixaCta,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd } from "@/components/site/Seo";
import { ANO_REGRAS, BENEFICIOS } from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [{ label: "Início", href: "/" }, { label: "Benefícios" }];

export default function Beneficios() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Benefícios do INSS: incapacidade, pensão, salário-maternidade e BPC"
        descricao={`Os benefícios do INSS explicados: auxílio por incapacidade temporária, aposentadoria por incapacidade permanente, auxílio-acidente, salário-maternidade, salário-família, pensão por morte, auxílio-reclusão e BPC/LOAS. Atualizado em ${ANO_REGRAS}.`}
        caminho="/beneficios"
        jsonLd={breadcrumbJsonLd([
          { label: "Início", href: "/" },
          { label: "Benefícios", href: "/beneficios" },
        ])}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Benefícios do INSS além da aposentadoria
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-blue-50/90">
            Nem todo direito previdenciário é uma aposentadoria. Doença, acidente,
            nascimento, falecimento ou prisão do segurado também geram benefícios —
            cada um com requisitos, prazos e documentos próprios. Um pedido mal
            instruído costuma ser negado por falta de prova, não por falta de
            direito.
          </p>
          <div className="mt-8">
            <a
              href={whatsapp(WHATSAPP_MENSAGENS.beneficio)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 text-[14.5px] font-bold text-blue-950 hover:bg-cyan-300"
            >
              <Phone size={16} />
              Preciso de ajuda com um benefício
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Quando o pedido é negado"
            titulo="A negativa não encerra o caso"
            texto="A maior parte das negativas vem de perícia insuficiente, documento incompleto ou período de carência mal calculado. Antes de desistir, vale ler a razão da negativa: em muitos casos o próprio INSS indica o que faltou, e a correção é possível."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                titulo: "Recurso administrativo",
                texto:
                  "Pedido de reconsideração ao Conselho de Recursos do INSS, com prazo de 30 dias contados da ciência da decisão.",
              },
              {
                titulo: "Novo requerimento",
                texto:
                  "Quando o motivo da negativa pode ser resolvido com documento novo, sem depender de recurso.",
              },
              {
                titulo: "Ação judicial",
                texto:
                  "Quando a negativa decorre de exigência indevida ou de perícia que não reconheceu a incapacidade comprovada.",
              },
            ].map((bloco) => (
              <div
                key={bloco.titulo}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-blue-900">
                  {bloco.titulo}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  {bloco.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Benefício por benefício"
            titulo="O que cada um exige"
          />

          <nav className="mt-8 flex flex-wrap gap-2.5">
            {BENEFICIOS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-cyan-500 hover:text-cyan-700"
              >
                {item.nome}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-7">
            {BENEFICIOS.map((item) => (
              <BlocoModalidade key={item.id} item={item} />
            ))}
          </div>

          <p className="mt-10 text-[13px] leading-relaxed text-slate-500">
            Conteúdo informativo, atualizado em {ANO_REGRAS}, sob responsabilidade
            de {SITE.responsavel} ({SITE.oab}). Requisitos de carência e valores
            podem ser alterados por lei; cada caso exige análise dos documentos.
          </p>
        </div>
      </section>

      <FaixaCta
        titulo="Seu benefício foi negado ou está demorando?"
        texto="Envie a carta de negativa ou o número do pedido. Avaliamos o caminho mais rápido entre recurso, novo requerimento e ação judicial."
        mensagem={WHATSAPP_MENSAGENS.negado}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
