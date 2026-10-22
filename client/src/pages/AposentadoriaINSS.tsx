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
  APOSENTADORIAS_INSS,
  FAQ_INSS,
  REGRAS_INSS,
} from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Aposentadorias", href: "/aposentadoria-inss" },
  { label: "INSS" },
];

export default function AposentadoriaINSS() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo={`Aposentadoria no INSS: regras de ${ANO_REGRAS}`}
        descricao={`Todas as regras de aposentadoria do INSS em ${ANO_REGRAS}: regra dos pontos (93 e 103), idade mínima progressiva, pedágio de 100%, aposentadoria por idade, especial, rural e do professor.`}
        caminho="/aposentadoria-inss"
        jsonLd={[
          faqJsonLd(FAQ_INSS),
          breadcrumbJsonLd([
            { label: "Início", href: "/" },
            { label: "Aposentadoria no INSS", href: "/aposentadoria-inss" },
          ]),
        ]}
      />
      <SiteHeader sobreHeroEscuro />

      {/* --------------------------------------------------------- Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Aposentadoria no INSS: quais regras valem em {ANO_REGRAS}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-blue-50/90">
            Quem contribui pelo regime geral tem hoje sete caminhos possíveis para
            se aposentar, e a regra mais vantajosa depende do seu histórico — não
            da sua idade isoladamente. Reunimos abaixo o que cada uma exige em{" "}
            {ANO_REGRAS}, com a base legal ao lado, para você conferir.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsapp(WHATSAPP_MENSAGENS.inss)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3.5 text-[14.5px] font-bold text-blue-950 hover:bg-cyan-300"
            >
              <Phone size={16} />
              Quero saber qual regra é a minha
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
            texto="As regras de transição sobem a cada 1º de janeiro: a pontuação aumenta um ponto por ano e a idade mínima progressiva, seis meses. Por isso comparamos sempre com os números do ano corrente."
          />
          <TabelaRegras
            titulo={`Requisitos para se aposentar em ${ANO_REGRAS}`}
            linhas={REGRAS_INSS}
            ano={ANO_REGRAS}
          />
          <p className="mt-5 text-[13px] leading-relaxed text-slate-500">
            Fonte: EC 103/2019 e tabela oficial de regras de aposentadorias do
            INSS. Para quem se filiou ao INSS após a reforma, a aposentadoria por
            idade exige 15 anos de contribuição (mulher) e 20 anos (homem).
          </p>
        </div>
      </section>

      {/* --------------------------------------------- Quem é do INSS */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Antes de escolher"
            titulo="Tempo de contribuição não é o tempo que aparece na carteira"
            texto="O que decide a sua aposentadoria é o tempo registrado no CNIS, e ele costuma estar incompleto: períodos sem baixa, vínculos com data de saída errada, contribuições do empregador não recolhidas e atividade rural ou especial não reconhecida. Corrigir o extrato antes do pedido muda a regra aplicável em muitos casos."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                titulo: "Quem se aposenta pelo INSS",
                texto:
                  "Trabalhadores com registro em carteira, domésticos, autônomos e contribuintes individuais, segurados especiais rurais, pescadores artesanais e professores da rede privada.",
              },
              {
                titulo: "O que costuma atrasar o direito",
                texto:
                  "Períodos não registrados, atividade especial sem PPP, tempo rural sem prova material e contribuições abaixo do mínimo mensal, que só contam com agrupamento.",
              },
              {
                titulo: "O que fazemos primeiro",
                texto:
                  "Lemos o CNIS, apontamos as correções necessárias e só então comparamos todas as regras aplicáveis, com as datas em que cada uma se torna possível.",
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

      {/* ------------------------------------------- Blocos detalhados */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Regra por regra"
            titulo="O que cada caminho exige"
            texto="Leia a regra que parece a sua, ou vá direto à que o seu tempo de contribuição já permite. Em caso de dúvida entre duas, o cálculo comparado resolve."
          />

          {/* Índice interno */}
          <nav className="mt-8 flex flex-wrap gap-2.5">
            {APOSENTADORIAS_INSS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-cyan-500 hover:text-cyan-700"
              >
                {item.nome}
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-cyan-200 bg-cyan-50/50 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-blue-900">
                Trabalhou exposto a ruído, calor, produtos químicos ou agentes
                biológicos?
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                A aposentadoria especial tem análise própria, documento por
                documento. Veja os pontos que costumam decidir esse tipo de caso.
              </p>
            </div>
            <Link
              href="/aposentadoria-especial"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-blue-900 px-6 py-3.5 text-[14px] font-bold text-white hover:bg-blue-800"
            >
              Ver a análise da aposentadoria especial
            </Link>
          </div>

          <div className="mt-10 space-y-7">
            {APOSENTADORIAS_INSS.map((item) => (
              <BlocoModalidade key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-7">
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-blue-900">
              Prefere ver o lado dos servidores públicos?
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
              Servidores efetivos seguem regras próprias, com exigências
              adicionais de tempo de serviço público e de permanência no cargo.
            </p>
            <Link
              href="/aposentadoria-servidor-publico"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3.5 text-[14px] font-bold text-white hover:bg-blue-800"
            >
              Ver as regras do servidor público
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Dúvidas frequentes"
            titulo="Perguntas sobre aposentadoria no INSS"
          />
          <Perguntas itens={FAQ_INSS} />
          <p className="mt-8 text-[13px] leading-relaxed text-slate-500">
            Conteúdo informativo, atualizado em {ANO_REGRAS}, sob
            responsabilidade de {SITE.responsavel} ({SITE.oab}). Cada caso exige
            análise individual dos documentos.
          </p>
        </div>
      </section>

      <FaixaCta
        titulo="Qual regra se aplica ao seu caso?"
        texto="Envie o seu extrato do CNIS ou apenas conte a sua situação. Fazemos a leitura e mostramos os cenários possíveis, com datas."
        mensagem={WHATSAPP_MENSAGENS.inss}
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
