import { Link } from "wouter";
import {
  Building2,
  Calculator,
  Clock,
  FileSearch,
  Gavel,
  MapPin,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  CartaoModalidade,
  FaixaCta,
  Perguntas,
  Selo,
  TituloSecao,
} from "@/components/site/Sections";
import { Seo, faqJsonLd } from "@/components/site/Seo";
import {
  ANO_REGRAS,
  APOSENTADORIAS_INSS,
  APOSENTADORIAS_RPPS,
  BENEFICIOS,
  FAQ_HOME,
  SERVICOS,
} from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const ETAPAS = [
  {
    icone: FileSearch,
    titulo: "Análise do histórico",
    texto:
      "Reunimos a documentação e lemos o CNIS, mapeando vínculos, contribuições e pendências que podem reduzir o seu tempo.",
  },
  {
    icone: Calculator,
    titulo: "Planejamento da regra",
    texto:
      "Comparamos todas as regras aplicáveis e mostramos os cenários, com datas e valores estimados antes de qualquer pedido.",
  },
  {
    icone: Send,
    titulo: "Requerimento e acompanhamento",
    texto:
      "Elaboramos e protocolamos o pedido e acompanhamos prazos e exigências até a decisão.",
  },
  {
    icone: Gavel,
    titulo: "Recurso ou ação judicial",
    texto:
      "Se o pedido for indeferido, adotamos as medidas administrativas e judiciais cabíveis, sem recomeçar do zero.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Aposentadoria no INSS e para Servidores Públicos"
        descricao={`Advocacia especializada em Direito Previdenciário com ${SITE.experiencia} de experiência. Aposentadorias do INSS e de regimes próprios de servidores públicos, com planejamento da melhor regra antes do pedido.`}
        caminho="/"
        jsonLd={faqJsonLd(FAQ_HOME)}
      />
      <SiteHeader sobreHeroEscuro />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 pb-24 pt-36 text-white md:pt-44">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/prev-hero.jpg')" }}
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_330px]">
            <div>
              <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.16em]">
                {SITE.experienciaCurta} de atuação em Direito Previdenciário
              </p>

              <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-[1.1] md:text-6xl">
                Aposentadoria no <span className="text-cyan-200">INSS</span> e
                para <span className="text-cyan-200">Servidores Públicos</span>
              </h1>

              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-blue-50/90 md:text-[19px]">
                Analisamos o seu histórico de contribuições, identificamos a
                melhor regra aplicável ao seu caso e conduzimos o pedido até o
                fim — na via administrativa ou judicial.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-blue-950 transition-colors hover:bg-cyan-300"
                >
                  <Phone size={17} />
                  Falar com um especialista
                </a>
                <Link
                  href="/aposentadoria-inss"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/20"
                >
                  Ver as regras de aposentadoria
                </Link>
              </div>

              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7">
                <div>
                  <dt className="text-[15px] font-bold text-white">
                    {SITE.experienciaCurta} de experiência
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-blue-100/80">
                    em Direito Previdenciário
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] font-bold text-white">
                    Administrativo e judicial
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-blue-100/80">
                    do requerimento ao recurso
                  </dd>
                </div>
                <div>
                  <dt className="text-[15px] font-bold text-white">
                    Maringá/PR e todo o Brasil
                  </dt>
                  <dd className="mt-0.5 text-[13px] text-blue-100/80">
                    atendimento presencial e remoto
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm">
              <h2 className="font-['Playfair_Display'] text-[17px] font-bold text-white">
                Comece por aqui
              </h2>
              <ul className="mt-4 space-y-0.5">
                {[
                  { t: "Quero me aposentar pelo INSS", m: WHATSAPP_MENSAGENS.inss },
                  { t: "Sou servidor público", m: WHATSAPP_MENSAGENS.servidor },
                  { t: "Meu benefício foi negado", m: WHATSAPP_MENSAGENS.negado },
                  { t: "Quero revisar meu benefício", m: WHATSAPP_MENSAGENS.revisao },
                ].map((item) => (
                  <li key={item.t}>
                    <a
                      href={whatsapp(item.m)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-b border-white/10 py-3 text-[13.5px] text-blue-50/90 hover:text-cyan-300"
                    >
                      {item.t}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={whatsapp(WHATSAPP_MENSAGENS.geral)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-lg bg-green-500 px-4 py-3 text-center text-[14px] font-bold text-white hover:bg-green-600"
              >
                Falar no WhatsApp
              </a>
              <p className="mt-4 text-[11.5px] leading-relaxed text-blue-100/70">
                {SITE.responsavel} — {SITE.oab}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Dois caminhos */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Por onde começar"
            titulo="Você se aposenta pelo INSS ou é servidor público?"
            texto="São regimes diferentes, com requisitos, cálculos e prazos próprios. Escolher o caminho errado custa tempo — e, às vezes, dinheiro. Comece pelo que corresponde ao seu caso."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {[
              {
                icone: Building2,
                titulo: "Aposentadoria no INSS",
                texto:
                  "Para quem contribui pelo regime geral: trabalhadores da iniciativa privada, autônomos, contribuintes individuais, segurados especiais rurais e professores da rede privada.",
                itens: [
                  "Regra dos pontos e idade mínima progressiva",
                  "Aposentadoria por idade, especial, rural e do professor",
                  "Planejamento antes do pedido, com comparação de regras",
                ],
                href: "/aposentadoria-inss",
                rotulo: "Ver regras do INSS",
              },
              {
                icone: Users,
                titulo: "Aposentadoria de Servidores Públicos",
                texto:
                  "Para servidores efetivos vinculados a regime próprio de previdência — federal, estadual ou municipal.",
                itens: [
                  "Regra permanente e transições da EC 103",
                  "Aposentadoria compulsória e aposentadoria especial",
                  "Abono de permanência, averbação de tempo e CTC",
                ],
                href: "/aposentadoria-servidor-publico",
                rotulo: "Ver regras do servidor",
              },
            ].map((caminho) => (
              <div
                key={caminho.titulo}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <caminho.icone size={24} />
                </span>
                <h3 className="mt-5 font-['Playfair_Display'] text-2xl font-bold text-blue-900">
                  {caminho.titulo}
                </h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-slate-600">
                  {caminho.texto}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {caminho.itens.map((i) => (
                    <li
                      key={i}
                      className="border-l-2 border-cyan-200 pl-3 text-[13.5px] text-slate-700"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href={caminho.href}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-900 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-blue-800"
                >
                  {caminho.rotulo}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------- Aposentadorias do INSS */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Regime Geral de Previdência Social"
            titulo="Aposentadorias do INSS"
            texto={`Cada modalidade tem requisitos próprios, e as regras de transição mudam a cada 1º de janeiro. Estes são os caminhos possíveis em ${ANO_REGRAS} — o melhor deles depende do seu histórico, não da sua idade isoladamente.`}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APOSENTADORIAS_INSS.map((item) => (
              <CartaoModalidade key={item.id} item={item} href="/aposentadoria-inss" />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/aposentadoria-inss"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-900 px-6 py-3.5 text-[14px] font-bold text-blue-900 transition-colors hover:bg-blue-900 hover:text-white"
            >
              Ver as regras completas do INSS
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------- Aposentadorias de RPPS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Regimes Próprios de Previdência"
            titulo="Aposentadorias de servidores públicos"
            texto="Servidores efetivos seguem regras próprias, e a escolha entre a regra permanente e as transições precisa ser simulada antes do pedido. Em muitos casos, servidores estaduais e municipais ainda se guiam pela legislação anterior à reforma."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APOSENTADORIAS_RPPS.map((item) => (
              <CartaoModalidade
                key={item.id}
                item={item}
                href="/aposentadoria-servidor-publico"
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/aposentadoria-servidor-publico"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-900 px-6 py-3.5 text-[14px] font-bold text-blue-900 transition-colors hover:bg-blue-900 hover:text-white"
            >
              Ver as regras completas do servidor
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Outros benefícios */}
      <section id="beneficios" className="scroll-mt-24 bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Além da aposentadoria"
            titulo="Outros benefícios previdenciários"
            texto="Atuamos também nos benefícios por incapacidade, nas prestações aos dependentes e nos benefícios assistenciais — inclusive quando o pedido já foi negado."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((item) => (
              <CartaoModalidade key={item.id} item={item} href="/beneficios" />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/beneficios"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-900 px-6 py-3.5 text-[14px] font-bold text-blue-900 transition-colors hover:bg-blue-900 hover:text-white"
            >
              Ver todos os benefícios
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Serviços */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Como podemos ajudar"
            titulo="Planejamento, revisão e defesa do seu direito"
            texto="Antes de protocolar qualquer pedido, comparamos as regras aplicáveis ao seu histórico. É o que evita perder uma regra que ainda está disponível e o que evita receber menos do que é devido."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICOS.map((servico) => (
              <div
                key={servico.id}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-blue-900">
                  {servico.nome}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                  {servico.resumo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Como funciona */}
      <section className="bg-blue-900 py-20 text-white md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Como funciona"
            titulo="Quatro etapas, do histórico à concessão"
            claro
            centro
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ETAPAS.map((etapa, i) => (
              <div key={etapa.titulo}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-[16px] font-bold text-blue-950">
                  {i + 1}
                </span>
                <etapa.icone size={22} className="mt-6 text-cyan-300" />
                <h3 className="mt-3 font-['Playfair_Display'] text-lg font-bold text-white">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-blue-100/85">
                  {etapa.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Sobre */}
      <section id="sobre" className="scroll-mt-24 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              <TituloSecao
                sobretitulo="O escritório"
                titulo="Atuação especializada, e não generalista"
                texto={`${SITE.nomeCompleto} atua em Direito Previdenciário há ${SITE.experiencia}. Nesse período, acompanhamos ano a ano as mudanças que a reforma de 2019 trouxe — e é por isso que trabalhamos com o cálculo comparado das regras, e não com uma única receita.`}
              />
              <div className="mt-9 space-y-6">
                <Selo
                  titulo="Especialização em previdenciário"
                  texto="O trabalho é dedicado a aposentadorias, benefícios por incapacidade e prestações aos dependentes."
                />
                <Selo
                  titulo="Administrativo e judicial"
                  texto="Atuação no requerimento, no recurso ao Conselho de Recursos do INSS e na ação judicial quando necessária."
                />
                <Selo
                  titulo="Atendimento remoto"
                  texto="Sede em Maringá, no Paraná, com acompanhamento de clientes de outras cidades por WhatsApp, e-mail e videochamada."
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-blue-900">
                Responsável pelo atendimento
              </h3>
              <p className="mt-4 font-['Playfair_Display'] text-2xl font-bold text-blue-900">
                {SITE.responsavel}
              </p>
              <p className="mt-1 text-sm font-semibold text-cyan-700">{SITE.oab}</p>
              <p className="mt-5 text-[14.5px] leading-relaxed text-slate-600">
                Advogado responsável pelo escritório, com atuação concentrada em
                Direito Previdenciário.
              </p>
              <ul className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-[14px] text-slate-700">
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
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FAQ */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Dúvidas frequentes"
            titulo="Perguntas que recebemos todos os dias"
          />
          <Perguntas itens={FAQ_HOME} />
        </div>
      </section>

      <FaixaCta />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}