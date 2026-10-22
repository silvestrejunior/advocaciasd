import { Link } from "wouter";
import {
  AlertTriangle,
  CheckCircle2,
  FileSearch,
  FileText,
  Phone,
  Ruler,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  FaixaCta,
  Perguntas,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd, faqJsonLd } from "@/components/site/Seo";
import type { PerguntaFrequente } from "@/data/previdenciario";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [
  { label: "Início", href: "/" },
  { label: "Aposentadoria no INSS", href: "/aposentadoria-inss" },
  { label: "Aposentadoria especial" },
];

/** Data da última conferência das referências citadas nesta página. */
const REVISAO = "21 de outubro de 2026";

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

const O_QUE_ANALISAMOS = [
  {
    titulo: "As atividades de cada vínculo, uma por uma",
    texto:
      "O que importa não é o nome do cargo, mas o que você fazia de fato, em qual ambiente e por quanto tempo. Vínculos parecidos podem ter destinos diferentes.",
  },
  {
    titulo: "Os agentes a que houve exposição",
    texto:
      "Ruído, calor, produtos químicos, agentes biológicos, vibração e outros. Cada agente tem critério próprio de avaliação, e alguns dependem de medição, não apenas de descrição.",
  },
  {
    titulo: "As provas de cada período",
    texto:
      "O PPP é o documento central, mas ele precisa estar completo: agente, período, intensidade e responsável técnico. Laudos, LTCAT e documentos da empresa completam o conjunto.",
  },
  {
    titulo: "O efeito do EPI informado no PPP",
    texto:
      "A anotação de equipamento de proteção pode afastar o reconhecimento do tempo especial. Verificamos o que foi anotado, por quem e se a anotação corresponde à realidade do ambiente.",
  },
  {
    titulo: "A regra aplicável ao período trabalhado",
    texto:
      "Os critérios mudam conforme a data do trabalho e a data em que o pedido é feito. Não é possível aplicar o mesmo enquadramento a períodos distantes entre si.",
  },
  {
    titulo: "O valor, e não apenas o direito",
    texto:
      "Reconhecer o tempo especial não garante o benefício mais vantajoso. Comparamos com as outras aposentadorias possíveis antes de você decidir requerer ou renunciar a algo.",
  },
];

const DECIDIU_STF = {
  mudou: [
    "A idade mínima deixou de ser exigida: a decisão afastou as idades de 55, 58 e 60 anos criadas pela reforma para a aposentadoria especial.",
    "Quem já tinha o tempo de exposição completo e foi barrado apenas pela idade precisa reavaliar a sua situação.",
  ],
  permaneceu: [
    "A comprovação da efetiva exposição continua obrigatória: 15, 20 ou 25 anos, conforme a atividade e o agente.",
    "A forma de cálculo da reforma foi mantida — o benefício não corresponde necessariamente a 100% da média.",
    "A conversão de tempo especial em tempo comum continua vedada para períodos trabalhados depois da reforma.",
  ],
  ressalva:
    "A decisão não resolveu expressamente a regra de transição por pontos, e admite esclarecimentos posteriores. Por isso a análise precisa considerar o período de cada vínculo e a data em que os requisitos foram preenchidos.",
};

const PONTOS_DE_ATENCAO = [
  {
    icone: FileText,
    titulo: "O PPP veio genérico ou incompleto",
    problema:
      "É o motivo mais comum de indeferimento. Muitos documentos informam apenas que o setor tinha “riscos” ou repetem a descrição do cargo, sem indicar o agente, a intensidade e o período exato de exposição. Há ainda PPPs emitidos por quem não tinha responsabilidade técnica para isso.",
    fazemos:
      "Conferimos item por item o que a norma exige, apontamos exatamente o que falta e buscamos a retificação junto à empresa ou, quando ela não colabora, por via judicial. Também procuramos os laudos técnicos que deram origem ao documento.",
  },
  {
    icone: ShieldCheck,
    titulo: "O EPI aparece como “eficaz” no documento",
    problema:
      "Uma anotação de fornecimento de EPI eficaz pode afastar o tempo especial. É uma discussão técnica: depende do agente, do período e de o equipamento realmente neutralizar o risco no caso concreto.",
    fazemos:
      "Lemos a anotação no contexto do laudo, verificamos quem a assinou e se ela é compatível com as medições e com a atividade real. Quando a anotação não se sustenta, ela é impugnada com base no conjunto técnico do período.",
  },
  {
    icone: AlertTriangle,
    titulo: "A empresa fechou, mudou de nome ou não entrega o documento",
    problema:
      "O fim da empresa não extingue o seu tempo. O problema é de prova, não de direito — e a solução depende de quais documentos sobreviveram e de quanto tempo passou.",
    fazemos:
      "Reconstruímos o período por outros meios: laudos de empresas do mesmo ramo, documentos do sindicato, registros do próprio INSS, processos trabalhistas anteriores e perícia judicial quando necessária.",
  },
  {
    icone: Ruler,
    titulo: "A exposição precisa ser medida, não descrita",
    problema:
      "Ruído, calor e alguns agentes químicos dependem de medição e de limite próprio para o período. Alegações genéricas não sustentam o enquadramento, e medições feitas fora do período exigido também não.",
    fazemos:
      "Verificamos se existe avaliação quantitativa e se ela é contemporânea ao período trabalhado. Quando a medição não existe, trabalhamos com o que for possível comprovar no caso concreto.",
  },
  {
    icone: Scale,
    titulo: "O tempo especial foi convertido ou averbado sem simulação",
    problema:
      "A conversão de tempo especial em comum e a averbação em outro regime são decisões definitivas. Feitas sem cálculo, podem tornar o benefício futuro menor — e não há como desfazer.",
    fazemos:
      "Simulamos os cenários antes da escolha: quanto o tempo rende com cada destinação, em qual regime e em qual data. A decisão passa a ser comparada, e não intuitiva.",
  },
];

const O_QUE_FAZEMOS = [
  {
    icone: FileSearch,
    titulo: "Leitura do histórico",
    texto:
      "Analisamos o CNIS e todos os vínculos, inclusive os que o INSS registrou de forma incompleta ou com data de saída errada.",
  },
  {
    icone: FileText,
    titulo: "Análise técnica dos documentos",
    texto:
      "Examinamos PPP, LTCAT e laudos de cada período, apontando o que sustenta o enquadramento e o que precisa ser corrigido.",
  },
  {
    icone: Scale,
    titulo: "Cálculo comparado",
    texto:
      "Definimos os períodos reconhecíveis e comparamos os valores possíveis antes de definir o que pedir e quando pedir.",
  },
  {
    icone: Send,
    titulo: "Pedido, recurso ou ação",
    texto:
      "Protocolamos, acompanhamos exigências e, se necessário, atuamos no recurso administrativo e na via judicial.",
  },
];

const DOCUMENTOS = [
  "PPP dos vínculos com exposição e os documentos técnicos que você tiver (LTCAT, laudos, ordens de serviço).",
  "Carteira de trabalho, contratos e o extrato de contribuições (CNIS).",
  "Informações sobre pedidos anteriores e sobre empresas que fecharam ou mudaram de nome.",
];

const PASSOS = [
  {
    titulo: "Conte o que aconteceu",
    texto:
      "Explique em que você trabalhou, em quais empresas e por quanto tempo. Não é preciso enviar documentos neste primeiro contato.",
  },
  {
    titulo: "Entenda o atendimento",
    texto:
      "Apresentamos o serviço indicado para o seu caso, o que está incluído e as condições de contratação, antes de qualquer contratação.",
  },
  {
    titulo: "Análise do seu caso",
    texto:
      "Contratado o serviço, examinamos o histórico e os documentos e apresentamos os cenários possíveis, com o que cada um exige e rende.",
  },
];

const PERGUNTAS: PerguntaFrequente[] = [
  {
    pergunta: "O nome do meu cargo já garante a aposentadoria especial?",
    resposta:
      "Não. A profissão é o ponto de partida, mas o enquadramento depende do período trabalhado, do agente a que houve exposição e das provas de cada vínculo. O nome do cargo, isoladamente, não substitui essa análise.",
  },
  {
    pergunta: "Recebo adicional de insalubridade. Isso resolve?",
    resposta:
      "Não. O adicional é uma questão trabalhista e não substitui a análise previdenciária da exposição e dos documentos. É possível ter adicional na folha e não conseguir o tempo especial — e o contrário também acontece.",
  },
  {
    pergunta: "Trabalhei exposto, mas não tenho o PPP. Perdi o direito?",
    resposta:
      "Não necessariamente. O PPP é o documento principal, mas existem outras formas de comprovar o período, que dependem de quais documentos sobreviveram e de quanto tempo passou. Informe a empresa e o período: avaliamos as possibilidades.",
  },
  {
    pergunta: "Preciso levar documentos no primeiro contato?",
    resposta:
      "Não. O primeiro contato serve para entender a sua situação e explicar o atendimento. Depois, indicamos exatamente quais documentos serão necessários para o serviço contratado.",
  },
  {
    pergunta: "Vale pedir agora ou esperar a definição sobre a idade mínima?",
    resposta:
      "Depende do seu histórico. Quem já completou o tempo de exposição e foi barrado apenas pela idade tem motivos para verificar a sua situação agora. Além disso, esperar pode fazer você perder uma regra que ainda está disponível.",
  },
  {
    pergunta: "Como funcionam os honorários?",
    resposta:
      "Dependem do trabalho necessário em cada caso. Antes da contratação, apresentamos uma proposta com o que está incluído, os valores e as condições de pagamento.",
  },
];

export default function AposentadoriaEspecial() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Aposentadoria especial: análise do trabalho com exposição"
        descricao="O reconhecimento do tempo especial depende das atividades, do agente e das provas de cada vínculo. Veja o que analisamos, os pontos que costumam decidir o caso e o efeito da decisão do STF sobre a idade mínima."
        caminho="/aposentadoria-especial"
        jsonLd={[
          faqJsonLd(PERGUNTAS),
          breadcrumbJsonLd([
            { label: "Início", href: "/" },
            { label: "Aposentadoria no INSS", href: "/aposentadoria-inss" },
            { label: "Aposentadoria especial", href: "/aposentadoria-especial" },
          ]),
        ]}
      />
      <SiteHeader sobreHeroEscuro />

      {/* --------------------------------------------------------- Hero */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Aposentadoria especial: a análise do trabalho com exposição
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-cyan-100">
            Trabalhou com ruído intenso, calor, produtos químicos ou agentes
            biológicos? O reconhecimento do tempo especial depende dos períodos,
            do agente e das provas de cada vínculo — não do nome do cargo.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300/80">
            Você não precisa enviar documentos neste primeiro contato.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsapp(
                "Olá, vim pelo site e gostaria de saber se o meu tempo de trabalho com exposição pode ser reconhecido.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-4 text-[15px] font-bold text-brand-950 hover:bg-cyan-300"
            >
              <Phone size={17} />
              Quero saber se o meu caso é analisável
            </a>
            <a
              href="#analise"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-[15px] font-bold text-white hover:bg-white/20"
            >
              Ver o que analisamos
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- O que analisamos */}
      <section id="analise" className="scroll-mt-24 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Antes de qualquer pedido"
            titulo="O que precisa ser analisado"
            texto="Seis pontos definem se o seu tempo de exposição pode ser reconhecido, por quanto tempo e com qual resultado financeiro. É por aqui que começa o trabalho."
          />
          <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {O_QUE_ANALISAMOS.map((item, i) => (
              <div
                key={item.titulo}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 font-['Playfair_Display'] text-[15px] font-bold text-cyan-700">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-['Playfair_Display'] text-[17px] font-bold leading-snug text-brand-800">
                  {item.titulo}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- STF atual */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Atualização recente"
            titulo="O que a decisão do STF mudou — e o que não mudou"
            texto="Em junho de 2026, o Supremo declarou inconstitucional a exigência de idade mínima para a aposentadoria especial. A decisão não transforma todo trabalho insalubre em aposentadoria concedida, nem dispensa a comprovação da exposição."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 border-t-4 border-t-emerald-500 bg-white p-7">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-emerald-800">
                O que mudou
              </h3>
              <ul className="mt-4 space-y-3">
                {DECIDIU_STF.mudou.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-700">
                    <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 border-t-4 border-t-slate-400 bg-white p-7">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-slate-700">
                O que continua igual
              </h3>
              <ul className="mt-4 space-y-3">
                {DECIDIU_STF.permaneceu.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-700">
                    <AlertTriangle size={17} className="mt-0.5 flex-shrink-0 text-slate-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-[13.5px] leading-relaxed text-slate-600">
            {DECIDIU_STF.ressalva}
          </p>
          <p className="mt-3 text-[12.5px] text-slate-500">
            Referência conferida em {REVISAO}. A aplicação ao seu caso depende dos
            períodos trabalhados e da documentação de cada vínculo.
          </p>
        </div>
      </section>

      {/* ------------------------------------------ Pontos de atenção */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Onde os pedidos se perdem"
            titulo="Os pontos que costumam decidir o caso"
            texto="Estes são os problemas que aparecem com mais frequência e que raramente dependem da lei — dependem de como os documentos foram produzidos e de como o período foi comprovado."
          />

          <div className="mt-11 space-y-7">
            {PONTOS_DE_ATENCAO.map((ponto) => (
              <div
                key={ponto.titulo}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                    <ponto.icone size={22} />
                  </span>
                  <h3 className="mt-1 font-['Playfair_Display'] text-[21px] font-bold leading-snug text-brand-800">
                    {ponto.titulo}
                  </h3>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Por que acontece
                    </h4>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-700">
                      {ponto.problema}
                    </p>
                  </div>
                  <div className="rounded-xl border-l-4 border-l-cyan-500 bg-slate-50 px-5 py-4">
                    <h4 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                      O que fazemos
                    </h4>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-700">
                      {ponto.fazemos}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Como trabalhamos */}
      <section className="bg-brand-800 py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="O trabalho"
            titulo="Como conduzimos a análise"
            claro
            texto="Não começamos pelo pedido: começamos pelos documentos. É o que evita indeferimento por prova insuficiente e evita que você renuncie a algo antes de saber quanto vale."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {O_QUE_FAZEMOS.map((etapa, i) => (
              <div key={etapa.titulo}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 font-['Playfair_Display'] text-[15px] font-bold text-brand-950">
                  {i + 1}
                </span>
                <etapa.icone size={22} className="mt-6 text-cyan-300" />
                <h3 className="mt-3 font-['Playfair_Display'] text-lg font-bold text-white">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300/85">
                  {etapa.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Documentos */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <TituloSecao
                sobretitulo="Documentos"
                titulo="O que ajuda na análise"
                texto="Se você tiver esses documentos, melhor. Se não tiver, o atendimento continua possível: indicamos o caminho para cada situação."
              />
              <ul className="mt-7 space-y-3.5">
                {DOCUMENTOS.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-700">
                    <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-cyan-600" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 rounded-xl border-l-4 border-l-cyan-500 bg-slate-50 px-5 py-4 text-[14px] leading-relaxed text-slate-700">
                Você não precisa reunir nada antes do primeiro contato. Comece
                contando o que aconteceu e indicamos o que será necessário.
              </p>
            </div>

            <div>
              <TituloSecao
                sobretitulo="Atendimento"
                titulo="Como começa"
                texto="O primeiro contato serve para entender a sua situação e explicar o serviço. A análise dos documentos e o planejamento acontecem depois, dentro do trabalho contratado."
              />
              <ol className="mt-7 space-y-6">
                {PASSOS.map((passo, i) => (
                  <li key={passo.titulo} className="flex gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-800 font-['Playfair_Display'] text-[15px] font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-['Playfair_Display'] text-[17px] font-bold text-brand-800">
                        {passo.titulo}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                        {passo.texto}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-7 text-[13.5px] leading-relaxed text-slate-500">
                Quem analisa o seu caso é {SITE.responsavel} ({SITE.oab}), com{" "}
                {SITE.experiencia} de atuação em Direito Previdenciário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FAQ */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <TituloSecao
            sobretitulo="Antes de decidir"
            titulo="Perguntas que costumam vir antes do contato"
          />
          <Perguntas itens={PERGUNTAS} />
        </div>
      </section>

      {/* ---------------------------------------------- Outros caminhos */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 md:p-9">
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
              Não sabe se o seu caso é de tempo especial?
            </h2>
            <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-slate-600">
              Se você trabalhou em ambiente com ruído, calor, produtos químicos,
              agentes biológicos ou risco elétrico, vale uma conversa. Se você é
              servidor público, as regras de exposição também existem, com
              exigências próprias de tempo de serviço.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/aposentadoria-inss"
                className="rounded-lg border border-brand-800 px-5 py-3 text-[13.5px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
              >
                Ver todas as aposentadorias do INSS
              </Link>
              <Link
                href="/aposentadoria-servidor-publico"
                className="rounded-lg border border-brand-800 px-5 py-3 text-[13.5px] font-bold text-brand-800 hover:bg-brand-800 hover:text-white"
              >
                Sou servidor público
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaixaCta
        titulo="Vamos analisar o seu tempo de exposição"
        texto="Conte em quais empresas você trabalhou e em que função. Indicamos o que é necessário para a análise — e você não precisa enviar documentos agora."
        mensagem={
          WHATSAPP_MENSAGENS.geral
        }
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}