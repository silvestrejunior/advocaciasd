import { Link } from "wouter";
import { Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BlocoModalidade,
  BotaoWhatsApp,
  FaixaCta,
  Perguntas,
  TabelaRegras,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd, faqJsonLd } from "@/components/site/Seo";
import {
  ANO_REGRAS,
  APOSENTADORIAS_RPPS,
  FAQ_RPPS,
  REGRAS_RPPS,
} from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Servidores públicos" },
];

export default function AposentadoriaServidorPublico() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo={`Aposentadoria de servidor público: regras de ${ANO_REGRAS}`}
        descricao={`Regras de aposentadoria dos servidores públicos em ${ANO_REGRAS}: regra permanente da EC 103, transição por pontos, pedágio de 100%, aposentadoria compulsória, especial, abono de permanência e averbação de tempo.`}
        caminho="/aposentadoria-servidor-publico"
        jsonLd={[faqJsonLd(FAQ_RPPS), breadcrumbJsonLd(TRILHA.map((t) => ({ label: t.label, href: t.href ?? "/aposentadoria-servidor-publico" })).slice(0, 2))]}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Aposentadoria de servidores públicos
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-blue-50/90">
            Servidores efetivos não seguem o INSS: cada ente tem um regime próprio
            de previdência, com requisitos, cálculo de proventos e reajuste
            próprios. Reunimos abaixo as regras aplicáveis em {ANO_REGRAS} e as
            decisões que costumam passar despercebidas — como a averbação de tempo
            e o abono de permanência.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsapp(WHATSAPP_MENSAGENS.servidor)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 text-[14.5px] font-bold text-blue-950 hover:bg-cyan-300"
            >
              <Phone size={16} />
              Quero simular minha aposentadoria
            </a>
            <a
              href="#regras"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/20"
            >
              Ver a tabela comparativa
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Tabela */}
      <section id="regras" className="scroll-mt-24 bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Comparativo"
            titulo="As regras lado a lado"
            texto="Além da idade e do tempo de contribuição, o servidor precisa cumprir tempo de efetivo exercício no serviço público e tempo no cargo em que se dará a aposentadoria."
          />
          <TabelaRegras
            titulo={`Requisitos para se aposentar em ${ANO_REGRAS}`}
            linhas={REGRAS_RPPS}
            ano={ANO_REGRAS}
          />
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-5">
            <p className="text-[13.5px] leading-relaxed text-amber-900">
              <strong className="font-bold">
                Atenção para servidores estaduais e municipais:
              </strong>{" "}
              a EC 103 aplica-se diretamente aos servidores federais. Estados,
              Distrito Federal e municípios seguem as normas anteriores à reforma
              enquanto não alterarem a legislação do seu próprio regime de
              previdência (EC 103, art. 4º, §9º). Na prática, isso significa que as
              regras do seu ente podem ser diferentes das federais.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- Blocos detalhados */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Situação por situação"
            titulo="O que cada caminho exige"
            texto="Do servidor que ingressou antes de 2019 ao que tomou posse depois da reforma, e das carreiras com regras especiais aos momentos de decisão sobre o tempo já trabalhado."
          />

          <nav className="mt-8 flex flex-wrap gap-2.5">
            {APOSENTADORIAS_RPPS.map((item) => (
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
            {APOSENTADORIAS_RPPS.map((item) => (
              <BlocoModalidade key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- CTC */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloColuna />
        </div>
      </section>

      {/* --------------------------------------------------------- FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Dúvidas frequentes"
            titulo="Perguntas sobre aposentadoria do servidor"
          />
          <Perguntas itens={FAQ_RPPS} />
          <p className="mt-8 text-[13px] leading-relaxed text-slate-500">
            Conteúdo informativo, atualizado em {ANO_REGRAS}, sob
            responsabilidade de {SITE.responsavel} ({SITE.oab}). Regras de regimes
            próprios variam conforme o ente federativo e exigem análise
            individual.
          </p>
        </div>
      </section>

      <FaixaCta
        titulo="Quanto tempo falta e quanto você vai receber?"
        texto="Fazemos a simulação comparada entre a regra permanente e as transições, incluindo o efeito da averbação de tempo de outros regimes."
        mensagem={WHATSAPP_MENSAGENS.servidor}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}

/** Bloco que liga a página do servidor à página de CTC. */
function TituloColuna() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <TituloSecao
          sobretitulo="Decisão que não se desfaz"
          titulo="Averbação de tempo e Certidão de Tempo de Contribuição"
          texto="Se você trabalhou na iniciativa privada antes de assumir o cargo público, esse tempo pode ser usado no regime próprio — mas a destinação é definitiva. Depois de averbado, não é possível voltar atrás. A escolha precisa ser simulada, comparando o que cada regime oferece."
        />
        <Link
          href="/ctc"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3.5 text-[14px] font-bold text-white hover:bg-blue-800"
        >
          Entender a CTC e a averbação
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-7">
        <h3 className="font-['Playfair_Display'] text-lg font-bold text-blue-900">
          Vale a pena averbar todo o tempo?
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
          Depende. O tempo averbado pode antecipar a aposentadoria no regime
          próprio, mas há situações em que ele rende mais se permanecer no INSS —
          especialmente quando envolve períodos com exposição a agentes nocivos ou
          atividade rural.
        </p>
      </div>
    </div>
  );
}