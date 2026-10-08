/**
 * Página: Direito Previdenciário (/prev e /previdenciario)
 *
 * Design: Corporate Modernismo Limpo — mesma linguagem visual de /iss e /ctc
 * Paleta: Azul Royal (#1E5FA8) + Ciano (#29ABE2) + Cinza Escuro (#2D3748)
 * Tipografia: Playfair Display (títulos) + Nunito (corpo)
 *
 * IMPORTANTE: esta página é nativa (React). Ela substitui o iframe que apontava
 * para o microsite https://direitoprev-w9hn3xxp.manus.space, que saiu do ar
 * (responde HTTP 404) e deixava /prev em branco para o visitante.
 *
 * As imagens são servidas do próprio domínio (/images/...), portanto não
 * dependem de CDN externo.
 */

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  HelpCircle,
  Scale,
  FileText,
  Compass,
  TrendingUp,
  RefreshCw,
  Building2,
  Play,
  ExternalLink,
} from "lucide-react";

// ===== CONSTANTES =====
const LOGO = "/images/logo-sd.png";
const HERO_IMG = "/images/prev-hero.jpg";
const ANALISE_IMG = "/images/prev-analise.jpg";
const WHATSAPP_NUMBER = "5544998563465";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@sdadvocaciaprevidenciaria";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20uma%20quest%C3%A3o%20previdenci%C3%A1ria.`;

const EMAIL = "joao@advocaciasd.com.br";
const ENDERECO =
  "Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2, Novo Centro, Maringá/PR";
const HORARIO = "Seg–Sex: 9h às 17h";

// ===== HELPER GTM =====
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
function pushGTMEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  }
}

// ===== ÁREAS DE ATUAÇÃO =====
const AREAS = [
  {
    icon: Scale,
    title: "Aposentadorias",
    text: "Análise das modalidades por tempo de contribuição, idade, aposentadoria especial e rural, incluindo as regras de transição da Reforma da Previdência.",
  },
  {
    icon: FileText,
    title: "Benefícios do INSS",
    text: "Auxílio por incapacidade temporária e permanente, pensão por morte, salário-maternidade, BPC/LOAS e demais benefícios: requerimento, revisão e recurso.",
  },
  {
    icon: Compass,
    title: "Contagem de Tempo e CTC",
    text: "Planejamento e emissão da Certidão de Tempo de Contribuição, averbação entre regimes e destinação estratégica do tempo contribuído.",
    link: { label: "Ver a página da CTC", href: "/ctc" },
  },
  {
    icon: TrendingUp,
    title: "Planejamento Previdenciário",
    text: "Estudo do histórico contributivo para comparar regras, datas e cenários possíveis antes de dar entrada no pedido de aposentadoria.",
  },
  {
    icon: RefreshCw,
    title: "Revisão de Benefícios",
    text: "Conferência de benefícios já concedidos, verificação do cálculo da renda mensal e análise de revisões cabíveis.",
  },
  {
    icon: Building2,
    title: "Servidores Públicos",
    text: "Regras dos regimes próprios de previdência (RPPS), direito adquirido, integralidade e paridade, conversão de tempo especial e licenças.",
  },
];

// ===== COMO ATUAMOS =====
const ETAPAS = [
  {
    title: "Análise do caso e do histórico contributivo",
    text: "Reunimos a documentação, lemos o extrato do CNIS e mapeamos vínculos, contribuições, períodos especiais e eventuais pendências.",
  },
  {
    title: "Planejamento estratégico",
    text: "Comparamos as regras aplicáveis ao seu caso e apresentamos os cenários possíveis, com requisitos e exigências de cada um.",
  },
  {
    title: "Requerimento e acompanhamento",
    text: "Elaboramos e protocolamos o pedido administrativo e acompanhamos o andamento junto ao INSS ou ao regime próprio de previdência.",
  },
  {
    title: "Recurso ou ação judicial",
    text: "Se o pedido for indeferido, adotamos as medidas administrativas e judiciais cabíveis, mantendo você informado em cada etapa.",
  },
];

// ===== FAQ =====
const FAQ_ITEMS = [
  {
    question: "O que é o planejamento previdenciário?",
    answer:
      "É um estudo do seu histórico de contribuições que compara as regras de aposentadoria aplicáveis ao seu caso. O objetivo é identificar, antes de dar entrada no pedido, qual regra e qual data são mais vantajosas para você — evitando decisões irreversíveis, como a destinação do tempo de contribuição em uma CTC.",
  },
  {
    question: "O que é o CNIS e por que ele é tão importante?",
    answer:
      "O CNIS (Cadastro Nacional de Informações Sociais) é o extrato oficial das suas contribuições, mantido pelo INSS. É a partir dele que se verifica o tempo já registrado, os vínculos existentes e possíveis faltas de informação. Por isso, a leitura e a correção do CNIS costumam ser o primeiro passo do trabalho.",
  },
  {
    question: "Preciso ter todos os documentos antes de procurar o escritório?",
    answer:
      "Não. Você pode iniciar a conversa apenas com o relato da sua situação. A partir disso orientamos quais documentos são necessários e, quando for o caso, solicitamos diretamente os extratos e certidões junto aos órgãos competentes.",
  },
  {
    question: "Posso somar o tempo de INSS com o tempo de serviço público?",
    answer:
      "Depende do caso. É possível somar tempos de regimes diferentes, mas as regras variam conforme o regime de destino e o período trabalhado. A Certidão de Tempo de Contribuição (CTC) é o instrumento usado para averbar esse tempo, e a forma de destinação precisa ser planejada com antecedência porque é definitiva.",
  },
  {
    question: "Quanto tempo demora um pedido de aposentadoria ou benefício?",
    answer:
      "Cada benefício tem um prazo legal próprio e, na prática, o andamento varia conforme a demanda do órgão. O escritório acompanha o processo, monitora os prazos e atua quando há atraso ou exigência a ser cumprida. Na conversa inicial informamos a estimativa aplicável ao seu caso.",
  },
  {
    question: "Meu benefício foi negado. Ainda há o que fazer?",
    answer:
      "Sim. O indeferimento não encerra a discussão: existem caminhos administrativos, como o recurso ao Conselho de Recursos do INSS, e a via judicial. Em muitos casos é possível corrigir a causa da negativa — por exemplo, apresentando documentos que comprovem o período ou a atividade questionada.",
  },
  {
    question: "Vale a pena revisar um benefício que já foi concedido?",
    answer:
      "Depende da forma como o benefício foi calculado. A revisão só é recomendada quando há um erro identificável no cálculo ou na consideração do tempo. Por isso fazemos primeiro uma análise técnica do processo administrativo, para verificar se existe fundamento antes de qualquer medida.",
  },
  {
    question: "O escritório atende quem não mora em Maringá?",
    answer:
      "Sim. A maior parte do atendimento pode ser feita de forma remota, por WhatsApp, e-mail e videochamada. O escritório está em Maringá/PR, mas atua em processos administrativos e judiciais de clientes de outras cidades.",
  },
];

// ===== VÍDEOS DO CANAL =====
const VIDEOS = [
  {
    id: "xHSfHEES8hU",
    title: "A aposentadoria especial exige atenção!",
    duration: "13:47",
  },
  {
    id: "uKAeDBdQHWQ",
    title: "Servidor público: assista antes de averbar a sua CTC",
    duration: "14:08",
  },
  {
    id: "EkDmd1CIv9o",
    title: "Reforma da Previdência – Maringá/PR: novas regras",
    duration: "17:39",
  },
];

// ===== HOOK DE ANIMAÇÃO AO SCROLL =====
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".fade-in-up").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ===== FAQ COM ACCORDION =====
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollAnimation();

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
    pushGTMEvent("faq_open_prev", {
      event_category: "Engajamento",
      event_label: FAQ_ITEMS[idx]?.question ?? `Pergunta ${idx + 1}`,
      page: "/prev",
    });
  };

  return (
    <section id="duvidas" className="py-20" style={{ backgroundColor: "#F8FBFF" }}>
      <div ref={ref} className="container" style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div className="text-center mb-12">
          <div
            className="fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
            style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
          >
            <HelpCircle size={16} />
            Perguntas Frequentes
          </div>
          <h2
            className="fade-in-up text-3xl md:text-4xl font-bold"
            style={{
              color: "#1E5FA8",
              fontFamily: "'Playfair Display', serif",
              transitionDelay: "0.1s",
            }}
          >
            Dúvidas sobre Direito Previdenciário?
          </h2>
          <p
            className="fade-in-up text-lg mt-3"
            style={{ color: "#4A5568", transitionDelay: "0.2s" }}
          >
            Reunimos as perguntas que mais recebemos no escritório.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={item.question}
              className="fade-in-up rounded-2xl overflow-hidden"
              style={{
                border: `2px solid ${openIndex === idx ? "#29ABE2" : "#E2E8F0"}`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow:
                  openIndex === idx
                    ? "0 6px 24px rgba(41,171,226,0.15)"
                    : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <button
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                style={{
                  backgroundColor: openIndex === idx ? "#EBF8FF" : "#FFFFFF",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span
                  className="font-semibold text-base leading-snug"
                  style={{ color: openIndex === idx ? "#1E5FA8" : "#2D3748" }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  style={{
                    color: "#29ABE2",
                    flexShrink: 0,
                    transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
              <div
                style={{
                  maxHeight: openIndex === idx ? "600px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{
                    color: "#4A5568",
                    borderTop: "1px solid #E2E8F0",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <p className="pt-4">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="fade-in-up mt-10 p-6 rounded-2xl text-center"
          style={{ backgroundColor: "#EBF8FF", border: "1px solid #BEE3F8" }}
        >
          <p className="font-semibold mb-3" style={{ color: "#1E5FA8" }}>
            Ficou com alguma dúvida sobre o seu caso?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushGTMEvent("whatsapp_click_prev", {
                event_category: "Conversao",
                event_label: "FAQ - Falar com especialista",
                page: "/prev",
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm"
            style={{ backgroundColor: "#25D366", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Phone size={16} />
            Falar com especialista no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== PÁGINA =====
export default function Previdenciario() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    mensagem: "",
  });

  const heroRef = useScrollAnimation();
  const areasRef = useScrollAnimation();
  const etapasRef = useScrollAnimation();
  const videoRef = useScrollAnimation();
  const contatoRef = useScrollAnimation();

  // Título e descrição próprios desta rota (a SPA compartilha o index.html)
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";

    document.title = "Direito Previdenciário | Santana Daufenbach Advocacia";
    meta?.setAttribute(
      "content",
      "Assessoria jurídica em Direito Previdenciário: aposentadorias, benefícios do INSS, contagem de tempo, CTC e planejamento previdenciário. Maringá/PR."
    );

    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
    };
  }, []);

  useEffect(() => {
    pushGTMEvent("page_view_prev", {
      event_category: "Pageview",
      event_label: "Página Direito Previdenciário",
      page: "/prev",
      page_title: "Direito Previdenciário | Santana Daufenbach Advocacia",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushGTMEvent("form_submit_prev", {
      event_category: "Conversao",
      event_label: "Formulario Direito Previdenciario",
      page: "/prev",
    });
    const message = `Olá! Vim pelo site (Direito Previdenciário).%0ANome: ${formData.nome}%0AWhatsApp: ${formData.whatsapp}%0AE-mail: ${formData.email}%0AMensagem: ${formData.mensagem}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setFormData({ nome: "", whatsapp: "", email: "", mensagem: "" });
  };

  const handleWhatsAppClick = (label: string) => {
    pushGTMEvent("whatsapp_click_prev", {
      event_category: "Conversao",
      event_label: label,
      page: "/prev",
    });
  };

  return (
    <div className="min-h-screen bg-white font-['Nunito']">
      <style>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-in-up {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={LOGO} alt="Santana Daufenbach Advocacia" className="h-11 w-auto" />
            <div>
              <div
                className="text-sm md:text-base font-bold leading-tight"
                style={{ color: scrolled ? "#1E5FA8" : "white" }}
              >
                Santana Daufenbach
              </div>
              <div
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: scrolled ? "#29ABE2" : "#E0F2FE" }}
              >
                Advocacia
              </div>
            </div>
          </a>

          {/* Navegação desktop */}
          <nav className="hidden lg:flex items-center gap-5 flex-1 justify-end">
            {[
              { label: "Início", href: "/" },
              { label: "Serviços", href: "/#servicos" },
              { label: "Equipe", href: "/#equipe" },
              { label: "Contato", href: "/#contato" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                  scrolled
                    ? "text-slate-700 hover:text-blue-700"
                    : "text-white hover:text-cyan-300"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/iss"
              className={`text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
              }`}
            >
              ISS Saneamento
            </a>
            <a
              href="/prev"
              aria-current="page"
              className={`text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                scrolled
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-white/20 text-white border-white"
              }`}
            >
              Previdenciário
            </a>
            <a
              href="/ctc"
              className={`text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
              }`}
            >
              CTC
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("Navbar WhatsApp")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <Phone size={15} />
              WhatsApp
            </a>
          </nav>

          {/* Botão do menu mobile */}
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-slate-700" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-lg border-t border-slate-100">
            <div className="container py-4 flex flex-col gap-3">
              {[
                { label: "Início", href: "/" },
                { label: "Serviços", href: "/#servicos" },
                { label: "Equipe", href: "/#equipe" },
                { label: "Contato", href: "/#contato" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/iss"
                className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 bg-blue-50 px-3 rounded"
              >
                ISS Saneamento
              </a>
              <a
                href="/prev"
                className="text-left text-white font-semibold py-2 px-3 rounded"
                style={{ backgroundColor: "#29ABE2" }}
              >
                Previdenciário
              </a>
              <a
                href="/ctc"
                className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 bg-blue-50 px-3 rounded"
              >
                CTC
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Menu mobile - Falar no WhatsApp")}
                className="bg-green-500 text-white px-5 py-3 rounded-full text-center font-bold"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F2A4A 0%, #1E5FA8 55%, #2B8FCC 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${HERO_IMG}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,42,74,0.92) 0%, rgba(30,95,168,0.86) 55%, rgba(43,143,204,0.78) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />

        <div ref={heroRef} className="container relative z-10 pt-28 pb-40">
          <div className="max-w-3xl">
            <div className="fade-in-up">
              <span className="inline-block bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-cyan-400/30">
                Assessoria Especializada
              </span>
            </div>
            <h1
              className="fade-in-up text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ transitionDelay: "0.1s", fontFamily: "'Playfair Display', serif" }}
            >
              Direito
              <span className="block text-cyan-300">Previdenciário</span>
            </h1>
            <p
              className="fade-in-up text-xl md:text-2xl text-blue-100 mb-6 max-w-2xl leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              Benefícios, contribuições, contagem de tempo e regularização de direitos — para
              servidores públicos, trabalhadores da iniciativa privada e empresas.
            </p>

            <div
              className="fade-in-up rounded-2xl p-6 mb-8 max-w-2xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                transitionDelay: "0.3s",
              }}
            >
              <p className="text-cyan-300 font-bold text-lg uppercase tracking-wider mb-2">
                Como podemos ajudar
              </p>
              <p className="text-white leading-relaxed text-lg">
                Analisamos o seu histórico de contribuições, identificamos{" "}
                <strong className="text-cyan-200">
                  quais regras de aposentadoria se aplicam ao seu caso
                </strong>{" "}
                e conduzimos o pedido — administrativo ou judicial — até a conclusão.
              </p>
              <p className="text-blue-200 mt-3 leading-relaxed">
                O trabalho começa pela leitura do seu CNIS e pelo planejamento: entender o que já
                existe antes de requerer é o que evita perder direitos no meio do caminho.
              </p>
            </div>

            <div
              className="fade-in-up flex flex-col sm:flex-row gap-4"
              style={{ transitionDelay: "0.4s" }}
            >
              <button
                onClick={() => {
                  scrollTo("areas");
                  pushGTMEvent("cta_click_prev", {
                    event_category: "Engajamento",
                    event_label: "Hero - Ver areas de atuacao",
                    page: "/prev",
                  });
                }}
                className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl"
                style={{ backgroundColor: "#29ABE2" }}
              >
                Ver Áreas de Atuação
                <ArrowDown size={20} />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Hero - Falar com especialista")}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl"
              >
                <Phone size={20} />
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ÁREAS DE ATUAÇÃO ===== */}
      <section id="areas" className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div ref={areasRef} className="container">
          <div className="text-center mb-14">
            <div
              className="fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
              style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
            >
              O que fazemos
            </div>
            <h2
              className="fade-in-up text-3xl md:text-4xl font-bold"
              style={{
                color: "#1E5FA8",
                fontFamily: "'Playfair Display', serif",
                transitionDelay: "0.1s",
              }}
            >
              Áreas de Atuação
            </h2>
            <p
              className="fade-in-up text-lg mt-3 max-w-2xl mx-auto"
              style={{ color: "#4A5568", transitionDelay: "0.2s" }}
            >
              Atuação em questões previdenciárias na esfera administrativa e judicial, com
              atendimento presencial em Maringá/PR e remoto para todo o Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="fade-in-up rounded-2xl p-7 h-full flex flex-col"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderTop: "4px solid #29ABE2",
                    boxShadow: "0 4px 20px rgba(15,42,74,0.08)",
                    transitionDelay: `${0.05 * i}s`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
                  >
                    {area.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: "#4A5568" }}>
                    {area.text}
                  </p>
                  {area.link && (
                    <a
                      href={area.link.href}
                      className="mt-4 inline-flex items-center gap-2 font-bold text-sm"
                      style={{ color: "#1E5FA8" }}
                    >
                      {area.link.label}
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COMO ATUAMOS ===== */}
      <section
        id="como-atuamos"
        className="py-24"
        style={{ background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)" }}
      >
        <div ref={etapasRef} className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="fade-in-up order-2 lg:order-1">
              <img
                src={ANALISE_IMG}
                alt="Análise de documentos e planejamento previdenciário"
                className="w-full rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div
                className="fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
                style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
              >
                Nosso método
              </div>
              <h2
                className="fade-in-up text-3xl md:text-4xl font-bold mb-8"
                style={{
                  color: "#1E5FA8",
                  fontFamily: "'Playfair Display', serif",
                  transitionDelay: "0.1s",
                }}
              >
                Como Atuamos
              </h2>

              <ol className="space-y-6">
                {ETAPAS.map((etapa, i) => (
                  <li
                    key={etapa.title}
                    className="fade-in-up flex gap-5"
                    style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white"
                      style={{ backgroundColor: "#1E5FA8" }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: "#2D3748" }}>
                        {etapa.title}
                      </h3>
                      <p className="leading-relaxed text-sm" style={{ color: "#4A5568" }}>
                        {etapa.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div
                className="fade-in-up mt-9 flex items-start gap-3 p-5 rounded-2xl"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E8FA" }}
              >
                <CheckCircle size={22} style={{ color: "#25D366", flexShrink: 0, marginTop: 2 }} />
                <p className="text-sm leading-relaxed" style={{ color: "#2D3748" }}>
                  Você acompanha cada etapa: explicamos o que foi protocolado, qual é o próximo
                  passo e o que depende de terceiros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VÍDEOS DO CANAL ===== */}
      <section id="conteudo" className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div ref={videoRef} className="container">
          <div className="text-center mb-14">
            <div
              className="fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
              style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
            >
              <Play size={16} />
              Nosso Canal
            </div>
            <h2
              className="fade-in-up text-3xl md:text-4xl font-bold"
              style={{
                color: "#1E5FA8",
                fontFamily: "'Playfair Display', serif",
                transitionDelay: "0.1s",
              }}
            >
              Conteúdo sobre Previdência
            </h2>
            <p
              className="fade-in-up text-lg mt-3 max-w-2xl mx-auto"
              style={{ color: "#4A5568", transitionDelay: "0.2s" }}
            >
              Publicamos vídeos explicando regras, prazos e decisões que impactam aposentadorias e
              benefícios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto">
            {VIDEOS.map((video, i) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushGTMEvent("video_click_prev", {
                    event_category: "Engajamento",
                    event_label: video.title,
                    page: "/prev",
                  })
                }
                className="fade-in-up group rounded-2xl overflow-hidden block"
                style={{
                  boxShadow: "0 4px 20px rgba(15,42,74,0.10)",
                  transitionDelay: `${0.05 * i}s`,
                }}
              >
                <div className="relative">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={`Vídeo: ${video.title}`}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <span
                    className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: "rgba(15,23,42,0.85)" }}
                  >
                    {video.duration}
                  </span>
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors"
                    style={{ color: "#2D3748" }}
                  >
                    {video.title}
                  </h3>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-bold"
                    style={{ color: "#1E5FA8" }}
                  >
                    Assistir no YouTube
                    <ExternalLink size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                pushGTMEvent("cta_click_prev", {
                  event_category: "Engajamento",
                  event_label: "Acessar canal do YouTube",
                  page: "/prev",
                })
              }
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Play size={18} />
              Acessar Nosso Canal no YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQSection />

      {/* ===== CONTATO ===== */}
      <section id="contato" className="py-24" style={{ backgroundColor: "#F0F7FF" }}>
        <div ref={contatoRef} className="container">
          <div className="text-center mb-12">
            <div
              className="fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
              style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
            >
              <Mail size={16} />
              Entre em Contato
            </div>
            <h2
              className="fade-in-up text-3xl md:text-4xl font-bold"
              style={{
                color: "#1E5FA8",
                fontFamily: "'Playfair Display', serif",
                transitionDelay: "0.1s",
              }}
            >
              Fale com Nossa Equipe
            </h2>
            <p
              className="fade-in-up text-lg mt-3 max-w-xl mx-auto"
              style={{ color: "#4A5568", transitionDelay: "0.2s" }}
            >
              Conte a sua situação e receba uma avaliação inicial do seu caso.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            {/* Informações de contato */}
            <div className="fade-in-up space-y-6">
              <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: "#FFFFFF" }}>
                <h3 className="text-xl font-bold mb-5" style={{ color: "#1E5FA8" }}>
                  Informações de Contato
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Phone size={20} />,
                      label: "WhatsApp",
                      value: "(44) 99856-3465",
                      href: WHATSAPP_URL,
                    },
                    {
                      icon: <Mail size={20} />,
                      label: "E-mail",
                      value: EMAIL,
                      href: `mailto:${EMAIL}`,
                    },
                    {
                      icon: <MapPin size={20} />,
                      label: "Endereço",
                      value: ENDERECO,
                      href: "#mapa",
                    },
                    { icon: <Clock size={20} />, label: "Horário", value: HORARIO, href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: "#29ABE2" }}
                        >
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="font-semibold hover:underline"
                            style={{ color: "#2D3748" }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold" style={{ color: "#2D3748" }}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: "#1E5FA8" }}>
                <p className="text-white font-bold text-lg mb-2">Atendimento Rápido</p>
                <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                  Para uma resposta mais ágil, entre em contato diretamente pelo WhatsApp. Nossa
                  equipe responde em até 2 horas úteis.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("Secao Contato - Chamar no WhatsApp")}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors w-full"
                >
                  <Phone size={18} />
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            {/* Formulário */}
            <div
              className="fade-in-up rounded-2xl p-8 shadow-md"
              style={{ backgroundColor: "#FFFFFF", transitionDelay: "0.15s" }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: "#1E5FA8" }}>
                Envie sua Mensagem
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="prev-nome"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#2D3748" }}
                  >
                    Nome completo *
                  </label>
                  <input
                    id="prev-nome"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleFormChange}
                    required
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-gray-800"
                    style={{ borderColor: "#E2E8F0" }}
                    onFocus={(e) => (e.target.style.borderColor = "#29ABE2")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="prev-whatsapp"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#2D3748" }}
                  >
                    WhatsApp *
                  </label>
                  <input
                    id="prev-whatsapp"
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleFormChange}
                    required
                    placeholder="(44) 99999-9999"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-gray-800"
                    style={{ borderColor: "#E2E8F0" }}
                    onFocus={(e) => (e.target.style.borderColor = "#29ABE2")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="prev-email"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#2D3748" }}
                  >
                    E-mail
                  </label>
                  <input
                    id="prev-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-gray-800"
                    style={{ borderColor: "#E2E8F0" }}
                    onFocus={(e) => (e.target.style.borderColor = "#29ABE2")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="prev-mensagem"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#2D3748" }}
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="prev-mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    placeholder="Descreva sua situação ou dúvida..."
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors resize-none text-gray-800"
                    style={{ borderColor: "#E2E8F0" }}
                    onFocus={(e) => (e.target.style.borderColor = "#29ABE2")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#1E5FA8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1A4F8F")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1E5FA8")}
                >
                  <Send size={18} />
                  Enviar via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAPA ===== */}
      <section id="mapa" className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
            >
              Nossa Localização
            </h2>
            <p className="mt-3 text-lg" style={{ color: "#4A5568" }}>
              Estamos em Maringá — PR. Venha nos visitar!
            </p>
          </div>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <iframe
              title="Localização Santana Daufenbach Advocacia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.8!2d-51.9390426!3d-23.4175294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd77c609e3a41%3A0x72d87afb95517515!2sSantana+Daufenbach+Advocacia!5e0!3m2!1spt-BR!2sbr!4v1748000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
            {[
              { icon: <MapPin size={24} />, title: "Endereço", value: ENDERECO },
              {
                icon: <Phone size={24} />,
                title: "Telefone / WhatsApp",
                value: "(44) 99856-3465",
              },
              {
                icon: <Clock size={24} />,
                title: "Horário de Atendimento",
                value: "Segunda a Sexta: 9h às 17h",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-2xl shadow-sm"
                style={{ backgroundColor: "#F0F7FF" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#1E5FA8", color: "white" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "#29ABE2" }}
                  >
                    {item.title}
                  </p>
                  <p className="font-semibold" style={{ color: "#2D3748" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RODAPÉ ===== */}
      <footer className="py-10" style={{ backgroundColor: "#0F172A" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="Santana Daufenbach" className="h-10 w-auto" />
              <div>
                <div className="font-bold text-white">Santana Daufenbach</div>
                <div className="text-sm text-slate-400">Advocacia e Assessoria Jurídica</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition-colors">
                Início
              </a>
              <a href="/iss" className="hover:text-white transition-colors">
                ISS Saneamento
              </a>
              <a
                href="/prev"
                className="hover:text-white transition-colors"
                style={{ color: "#29ABE2" }}
              >
                Previdenciário
              </a>
              <a href="/ctc" className="hover:text-white transition-colors">
                CTC
              </a>
            </div>
            <div className="text-sm text-slate-500 text-center md:text-right">
              © 2026 Santana Daufenbach Advocacia.
              <br />
              Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* ===== BOTÃO FLUTUANTE WHATSAPP ===== */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleWhatsAppClick("Botao flutuante WhatsApp")}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        title="Falar no WhatsApp"
        aria-label="Falar no WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="32"
          height="32"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: "#25D366" }}
        />
      </a>
    </div>
  );
}
