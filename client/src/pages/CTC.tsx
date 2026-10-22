/**
 * Página: Certidão de Tempo de Contribuição (CTC)
 * Design: Trilha Ilustrada — Estrada com Personagem Animado
 * Paleta: Azul Royal (#1E5FA8) + Ciano (#29ABE2) + Branco
 * Tipografia: Playfair Display (títulos) + Nunito (corpo)
 */

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Mail,
  Clock,
  ChevronDown,
  Send,
  CheckCircle,
  FileText,
  Compass,
  Flag,
  ArrowDown,
  Map,
  HelpCircle,
} from "lucide-react";

const LOGO_NEW = "/images/logo-sd.png";
const WHATSAPP_NUMBER = "5544998563465";
const YOUTUBE_VIDEO_ID = "wfPLBr65oik";

// Helper para disparar eventos no dataLayer do GTM
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
const YOUTUBE_CHANNEL = "https://www.youtube.com/@sdadvocaciaprevidenciaria";

// ===== DADOS DO FAQ =====
const FAQ_ITEMS = [
  {
    question: "O que é a Certidão de Tempo de Contribuição (CTC)?",
    answer:
      "A CTC é um documento emitido pelo INSS ou por regime próprio de previdência que comprova o tempo de contribuição de um segurado. Ela permite que esse tempo seja reconhecido e averbado em outro regime previdenciário, ampliando os direitos de aposentadoria.",
  },
  {
    question: "Quem tem direito a solicitar a CTC?",
    answer:
      "Qualquer pessoa que tenha contribuído para mais de um regime previdenciário ao longo da vida laboral. Por exemplo: quem trabalhou na iniciativa privada (INSS) e depois ingressou no serviço público (RPPS), ou vice-versa.",
  },
  {
    question: "Para que serve averbar a CTC?",
    answer:
      "Averbar significa incluir oficialmente o tempo de contribuição de um regime em outro. Com isso, o servidor público pode somar o tempo do INSS ao seu cargo público (ou o contrário), o que pode antecipar a aposentadoria, aumentar o valor do benefício ou até possibilitar mais de uma aposentadoria.",
  },
  {
    question: "Por que é importante fazer um planejamento antes de solicitar a CTC?",
    answer:
      "Porque a destinação do tempo de contribuição na CTC é irreversível. Um planejamento especializado identifica a melhor forma de distribuir esse tempo — podendo indicar, por exemplo, a possibilidade de duas aposentadorias ou a antecipação de uma regra mais vantajosa. Sem planejamento, o cliente pode perder direitos valiosos.",
  },
  {
    question: "Qual é o prazo para obter a CTC?",
    answer:
      "O prazo legal para emissão da CTC pelo INSS é de 30 dias. No entanto, na prática, pode haver atrasos administrativos. Nosso escritório acompanha todo o processo e adota as medidas necessárias para garantir o cumprimento dos prazos.",
  },
  {
    question: "A CTC tem algum custo?",
    answer:
      "A emissão da CTC pelo INSS é gratuita. Os custos envolvidos são referentes à assessoria jurídica especializada para o planejamento, elaboração dos requerimentos e acompanhamento de todo o processo de averbação.",
  },
  {
    question: "Quais documentos são necessários para solicitar a CTC?",
    answer:
      "Em geral, são necessários: documentos de identificação (RG, CPF), comprovante de tempo de contribuição (carteira de trabalho, carnês, extrato do CNIS), e documentos que comprovem o vínculo com o regime de destino. Nossa equipe orienta sobre a documentação específica para cada caso.",
  },
  {
    question: "É possível ter mais de uma aposentadoria usando a CTC?",
    answer:
      "Sim! Dependendo do tempo de contribuição acumulado e do planejamento realizado, é possível se aposentar em mais de um regime previdenciário. Por isso o planejamento é tão importante: ele mapeia todas as possibilidades e define a estratégia mais vantajosa para cada situação.",
  },
];

// ===== COMPONENTE FAQ COM ACCORDION =====
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
    // Rastreia abertura de pergunta do FAQ
    pushGTMEvent("faq_open_ctc", {
      event_category: "Engajamento",
      event_label: FAQ_ITEMS[idx]?.question ?? `Pergunta ${idx + 1}`,
      page: "/ctc",
    });
  };

  return (
    <section className="py-20" style={{ backgroundColor: "#F8FBFF" }}>
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
            style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
          >
            <HelpCircle size={16} />
            Perguntas Frequentes
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
          >
            Dúvidas sobre a CTC?
          </h2>
          <p className="text-lg mt-3" style={{ color: "#4A5568" }}>
            Respondemos as perguntas mais comuns sobre a Certidão de Tempo de Contribuição.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden"
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
                  maxHeight: openIndex === idx ? "500px" : "0px",
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
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ backgroundColor: "#EBF8FF", border: "1px solid #BEE3F8" }}
        >
          <p className="font-semibold mb-3" style={{ color: "#1E5FA8" }}>
            Ainda tem dúvidas? Fale com um especialista!
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20CTC.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushGTMEvent("whatsapp_click_ctc", { event_category: "Conversao", event_label: "FAQ - Falar com Especialista CTC", page: "/ctc" })}
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

// Hook para animação de entrada ao scroll
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    const elements = ref.current?.querySelectorAll(".fade-in-up");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Hook para rastrear progresso do scroll dentro de um elemento
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // começa quando o topo do elemento entra na tela (com margem generosa),
      // termina quando o final do elemento sai da tela (com margem extra para garantir que o último card seja visível)
      const start = rect.top - windowH * 0.9;
      const end = rect.bottom - windowH * 0.5;
      const total = end - start;
      const scrolled = -start;
      const p = Math.min(Math.max(scrolled / total, 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);
  return progress;
}

// SVG do personagem caminhante (silhueta simples)
function WalkerCharacter({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      width="48"
      height="64"
      viewBox="0 0 48 64"
      fill="none"
      style={{ transform: flipped ? "scaleX(-1)" : "none", filter: "drop-shadow(0 4px 8px rgba(30,95,168,0.4))" }}
    >
      {/* Cabeça */}
      <circle cx="24" cy="9" r="7" fill="#1E5FA8" />
      {/* Corpo */}
      <rect x="18" y="17" width="12" height="18" rx="4" fill="#29ABE2" />
      {/* Braço esquerdo animado */}
      <rect x="8" y="19" width="10" height="4" rx="2" fill="#1E5FA8" transform="rotate(-20 8 21)" />
      {/* Braço direito animado */}
      <rect x="30" y="19" width="10" height="4" rx="2" fill="#1E5FA8" transform="rotate(20 40 21)" />
      {/* Perna esquerda */}
      <rect x="16" y="34" width="6" height="18" rx="3" fill="#1E5FA8" transform="rotate(-10 19 34)" />
      {/* Perna direita */}
      <rect x="26" y="34" width="6" height="18" rx="3" fill="#1E5FA8" transform="rotate(10 29 34)" />
      {/* Pasta/documento */}
      <rect x="32" y="22" width="10" height="8" rx="2" fill="#FFF" stroke="#1E5FA8" strokeWidth="1.5" />
      <line x1="34" y1="25" x2="40" y2="25" stroke="#29ABE2" strokeWidth="1" />
      <line x1="34" y1="27" x2="40" y2="27" stroke="#29ABE2" strokeWidth="1" />
    </svg>
  );
}

// Componente da estrada/trilha com personagem animado
function AnimatedRoad() {
  const roadRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(roadRef);

  // A estrada tem 3 marcos. O personagem vai de 0% a 100% ao longo do caminho SVG
  // Posições dos marcos na estrada (em % do comprimento do path)
  const step1Y = 120;
  const step2Y = 380;
  const step3Y = 640;
  const totalH = 760;

  // Posição Y do personagem baseada no progresso
  const characterY = progress * (totalH - 80);
  // Flip do personagem: vai para direita nas etapas pares
  const flipped = characterY > step1Y + 80 && characterY < step2Y + 80;

  return (
    <div ref={roadRef} className="relative w-full" style={{ minHeight: `${totalH + 60}px` }}>
      {/* SVG da estrada */}
      <svg
        viewBox={`0 0 400 ${totalH}`}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ width: "min(400px, 100%)", height: `${totalH}px`, top: 0 }}
        fill="none"
      >
        {/* Sombra da estrada */}
        <path
          d="M200 20 C200 20, 120 100, 120 200 C120 300, 280 300, 280 400 C280 500, 120 500, 120 600 C120 680, 200 740, 200 740"
          stroke="#CBD5E0"
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Estrada principal - asfalto */}
        <path
          d="M200 20 C200 20, 120 100, 120 200 C120 300, 280 300, 280 400 C280 500, 120 500, 120 600 C120 680, 200 740, 200 740"
          stroke="#2D3748"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bordas brancas da estrada */}
        <path
          d="M200 20 C200 20, 120 100, 120 200 C120 300, 280 300, 280 400 C280 500, 120 500, 120 600 C120 680, 200 740, 200 740"
          stroke="white"
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 999999"
          opacity="0"
        />
        {/* Faixa central tracejada amarela */}
        <path
          d="M200 20 C200 20, 120 100, 120 200 C120 300, 280 300, 280 400 C280 500, 120 500, 120 600 C120 680, 200 740, 200 740"
          stroke="#F6E05E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="20 15"
          opacity="0.9"
        />
        {/* Borda esquerda da estrada */}
        <path
          d="M200 20 C200 20, 120 100, 120 200 C120 300, 280 300, 280 400 C280 500, 120 500, 120 600 C120 680, 200 740, 200 740"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
          strokeDashoffset="10"
          style={{ filter: "blur(0.5px)" }}
        />

        {/* Marco 1 — Ponto de Partida */}
        <circle cx="200" cy={step1Y} r="22" fill="#1E5FA8" />
        <circle cx="200" cy={step1Y} r="16" fill="white" />
        <text x="200" y={step1Y + 6} textAnchor="middle" fill="#1E5FA8" fontSize="14" fontWeight="bold">1</text>
        {/* Placa Marco 1 */}
        <rect x="230" y={step1Y - 20} width="80" height="36" rx="6" fill="#1E5FA8" />
        <text x="270" y={step1Y - 5} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PLANEJAMENTO</text>
        <text x="270" y={step1Y + 8} textAnchor="middle" fill="#A8D8F0" fontSize="8">Ponto de Partida</text>
        {/* Poste da placa */}
        <line x1="230" y1={step1Y + 16} x2="230" y2={step1Y + 40} stroke="#1E5FA8" strokeWidth="2" />

        {/* Marco 2 — No Caminho */}
        <circle cx="280" cy={step2Y} r="22" fill="#29ABE2" />
        <circle cx="280" cy={step2Y} r="16" fill="white" />
        <text x="280" y={step2Y + 6} textAnchor="middle" fill="#29ABE2" fontSize="14" fontWeight="bold">2</text>
        {/* Placa Marco 2 */}
        <rect x="90" y={step2Y - 20} width="80" height="36" rx="6" fill="#29ABE2" />
        <text x="130" y={step2Y - 5} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">REQUERIMENTOS</text>
        <text x="130" y={step2Y + 8} textAnchor="middle" fill="#E0F7FF" fontSize="8">No Caminho</text>
        <line x1="170" y1={step2Y + 16} x2="170" y2={step2Y + 40} stroke="#29ABE2" strokeWidth="2" />

        {/* Marco 3 — Chegada */}
        <circle cx="120" cy={step3Y} r="22" fill="#1E5FA8" />
        <circle cx="120" cy={step3Y} r="16" fill="white" />
        <text x="120" y={step3Y + 6} textAnchor="middle" fill="#1E5FA8" fontSize="14" fontWeight="bold">3</text>
        {/* Bandeira de chegada */}
        <line x1="120" y1={step3Y - 40} x2="120" y2={step3Y - 80} stroke="#1E5FA8" strokeWidth="2.5" />
        <polygon points="120,{step3Y - 80} 148,{step3Y - 68} 120,{step3Y - 56}" fill="#1E5FA8" />
        {/* Placa Marco 3 */}
        <rect x="150" y={step3Y - 20} width="80" height="36" rx="6" fill="#1E5FA8" />
        <text x="190" y={step3Y - 5} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">AVERBAÇÃO</text>
        <text x="190" y={step3Y + 8} textAnchor="middle" fill="#A8D8F0" fontSize="8">Chegada!</text>
        <line x1="150" y1={step3Y + 16} x2="150" y2={step3Y + 40} stroke="#1E5FA8" strokeWidth="2" />

        {/* Árvores decorativas */}
        <circle cx="60" cy="150" r="18" fill="#68D391" opacity="0.7" />
        <rect x="57" y="165" width="6" height="15" rx="2" fill="#9AE6B4" opacity="0.7" />
        <circle cx="340" cy="250" r="15" fill="#68D391" opacity="0.6" />
        <rect x="337" y="263" width="6" height="12" rx="2" fill="#9AE6B4" opacity="0.6" />
        <circle cx="50" cy="450" r="20" fill="#68D391" opacity="0.7" />
        <rect x="47" y="467" width="6" height="15" rx="2" fill="#9AE6B4" opacity="0.7" />
        <circle cx="350" cy="550" r="16" fill="#68D391" opacity="0.6" />
        <rect x="347" y="564" width="6" height="12" rx="2" fill="#9AE6B4" opacity="0.6" />

        {/* Nuvens decorativas */}
        <ellipse cx="80" cy="60" rx="25" ry="12" fill="white" opacity="0.6" />
        <ellipse cx="100" cy="55" rx="18" ry="10" fill="white" opacity="0.6" />
        <ellipse cx="320" cy="320" rx="22" ry="10" fill="white" opacity="0.5" />
        <ellipse cx="340" cy="315" rx="16" ry="9" fill="white" opacity="0.5" />

        {/* Personagem animado */}
        <g transform={`translate(${
          // Interpola X ao longo do caminho curvo
          characterY < step1Y
            ? 200 - (characterY / step1Y) * 80
            : characterY < step2Y
            ? 120 + ((characterY - step1Y) / (step2Y - step1Y)) * 160
            : characterY < step3Y
            ? 280 - ((characterY - step2Y) / (step3Y - step2Y)) * 160
            : 120
        } ${characterY}) translate(-24, -56)`}>
          {/* Sombra do personagem */}
          <ellipse cx="24" cy="62" rx="16" ry="5" fill="rgba(0,0,0,0.15)" />
          {/* Cabeça */}
          <circle cx="24" cy="9" r="7" fill="#1E5FA8" />
          {/* Capacete/chapéu */}
          <ellipse cx="24" cy="4" rx="8" ry="4" fill="#29ABE2" />
          {/* Corpo */}
          <rect x="18" y="17" width="12" height="18" rx="4" fill="#29ABE2" />
          {/* Gravata */}
          <polygon points="24,19 22,26 24,28 26,26" fill="#1E5FA8" />
          {/* Braço esquerdo */}
          <rect x="8" y="20" width="10" height="4" rx="2" fill="#1E5FA8"
            style={{ transformOrigin: "18px 22px", animation: "swingArm 0.6s ease-in-out infinite alternate" }}
          />
          {/* Braço direito */}
          <rect x="30" y="20" width="10" height="4" rx="2" fill="#1E5FA8"
            style={{ transformOrigin: "30px 22px", animation: "swingArm 0.6s ease-in-out infinite alternate-reverse" }}
          />
          {/* Perna esquerda */}
          <rect x="16" y="34" width="6" height="18" rx="3" fill="#1E5FA8"
            style={{ transformOrigin: "19px 34px", animation: "swingLeg 0.6s ease-in-out infinite alternate" }}
          />
          {/* Perna direita */}
          <rect x="26" y="34" width="6" height="18" rx="3" fill="#1E5FA8"
            style={{ transformOrigin: "29px 34px", animation: "swingLeg 0.6s ease-in-out infinite alternate-reverse" }}
          />
          {/* Pasta */}
          <rect x="33" y="22" width="10" height="8" rx="2" fill="white" stroke="#1E5FA8" strokeWidth="1.5" />
          <line x1="35" y1="25" x2="41" y2="25" stroke="#29ABE2" strokeWidth="1" />
          <line x1="35" y1="27" x2="41" y2="27" stroke="#29ABE2" strokeWidth="1" />
        </g>
      </svg>

      {/* Cards das etapas posicionados ao lado da estrada */}
      {/* ETAPA 1 */}
      <div
        className="absolute fade-in-step"
        style={{
          top: `${step1Y - 80}px`,
          right: "0",
          width: "calc(50% - 220px)",
          minWidth: "280px",
          opacity: progress > 0.05 ? 1 : 0,
          transform: progress > 0.05 ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.6s ease",
        }}
      >
        <div
          className="rounded-2xl p-6 shadow-xl border-l-4 cursor-default"
          style={{ backgroundColor: "#FFFFFF", borderLeftColor: "#1E5FA8", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(30,95,168,0.25)'; (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#29ABE2'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#1E5FA8'; }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
          >
            <Compass size={12} />
            ETAPA 1 — O MAIS IMPORTANTE
          </div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
          >
            Planejamento Estratégico
          </h3>
          <p className="text-lg leading-relaxed mb-3" style={{ color: "#2D3748" }}>
            Realizamos um <strong>estudo completo da sua situação previdenciária</strong>, identificando as melhores possibilidades:
          </p>
          <ul className="space-y-2">
            {[
              "Possibilidade de mais de uma aposentadoria",
              "Antecipação de regras de aposentadoria",
              "Combinações mais vantajosas de tempo",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#29ABE2" }} />
                <span className="text-base font-medium" style={{ color: "#4A5568" }}>{item}</span>
              </li>
            ))}
          </ul>
          <div
            className="mt-3 p-3 rounded-xl text-base font-semibold"
            style={{ backgroundColor: "#FFF8E1", color: "#B7791F" }}
          >
            💡 O planejamento é a <strong>bússola de toda a jornada</strong>
          </div>
        </div>
      </div>

      {/* ETAPA 2 */}
      <div
        className="absolute"
        style={{
          top: `${step2Y - 80}px`,
          left: "0",
          width: "calc(50% - 220px)",
          minWidth: "280px",
          opacity: progress > 0.3 ? 1 : 0,
          transform: progress > 0.3 ? "translateX(0)" : "translateX(-40px)",
          transition: "all 0.6s ease",
        }}
      >
        <div
          className="rounded-2xl p-6 shadow-xl border-r-4 cursor-default"
          style={{ backgroundColor: "#FFFFFF", borderRightColor: "#29ABE2", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(41,171,226,0.25)'; (e.currentTarget as HTMLDivElement).style.borderRightColor = '#1E5FA8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; (e.currentTarget as HTMLDivElement).style.borderRightColor = '#29ABE2'; }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ backgroundColor: "#E0F7FF", color: "#0077A8" }}
          >
            <FileText size={12} />
            ETAPA 2 — ELABORAÇÃO
          </div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
          >
            Requerimentos da CTC
          </h3>
          <p className="text-lg leading-relaxed mb-3" style={{ color: "#2D3748" }}>
            Elaboramos os <strong>requerimentos da CTC</strong> com destinação exata do tempo de contribuição, seguindo o plano.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Documentação Completa", icon: "📋" },
              { label: "Destinação Precisa", icon: "🎯" },
              { label: "Seguindo o Plano", icon: "🗺️" },
              { label: "Acompanhamento Total", icon: "👁️" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1 p-2 rounded-lg"
                style={{ backgroundColor: "#F0F7FF" }}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-base font-semibold" style={{ color: "#1E5FA8" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ETAPA 3 */}
      <div
        className="absolute"
        style={{
          top: `${step3Y - 80}px`,
          right: "0",
          width: "calc(50% - 220px)",
          minWidth: "280px",
          opacity: progress > 0.6 ? 1 : 0,
          transform: progress > 0.6 ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.6s ease",
        }}
      >
        <div
          className="rounded-2xl p-6 shadow-xl border-l-4 cursor-default"
          style={{ backgroundColor: "#FFFFFF", borderLeftColor: "#1E5FA8", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(30,95,168,0.25)'; (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#29ABE2'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#1E5FA8'; }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
            style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
          >
            <Flag size={12} />
            ETAPA 3 — DESTINO FINAL
          </div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
          >
            Averbação do Tempo
          </h3>
          <p className="text-lg leading-relaxed mb-3" style={{ color: "#2D3748" }}>
            Com a CTC em mãos, realizamos os <strong>pedidos de averbação</strong> de acordo com o planejamento inicial.
          </p>
          <div
            className="p-4 rounded-xl border-2"
            style={{ backgroundColor: "#EFF6FF", borderColor: "#1E5FA8" }}
          >
            <p className="font-bold text-lg mb-1" style={{ color: "#1E5FA8" }}>🏁 Resultado Final</p>
            <p className="text-base leading-relaxed" style={{ color: "#2D3748" }}>
              Tempo averbado da maneira que você tenha o <strong>melhor direito de aposentadoria possível</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CTC() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    mensagem: "",
  });

  const heroRef = useScrollAnimation();
  const videoRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  // Evento de pageview ao carregar a página CTC
  useEffect(() => {
    pushGTMEvent("page_view_ctc", {
      event_category: "Pageview",
      event_label: "Página CTC - Certidão de Tempo de Contribuição",
      page: "/ctc",
      page_title: "CTC | Santana Daufenbach Advocacia",
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Evento de conversão: envio do formulário
    pushGTMEvent("form_submit_ctc", {
      event_category: "Conversao",
      event_label: "Formulario CTC",
      page: "/ctc",
    });
    const message = `Olá! Vim pelo site CTC.%0ANome: ${formData.nome}%0AWhatsApp: ${formData.whatsapp}%0AE-mail: ${formData.email}%0AMensagem: ${formData.mensagem}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setFormData({ nome: "", whatsapp: "", email: "", mensagem: "" });
  };

  const handleWhatsAppClick = (label: string) => {
    // Evento de conversão: clique no WhatsApp
    pushGTMEvent("whatsapp_click_ctc", {
      event_category: "Conversao",
      event_label: label,
      page: "/ctc",
    });
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20tenho%20interesse%20na%20Certid%C3%A3o%20de%20Tempo%20de%20Contribui%C3%A7%C3%A3o.`;

  return (
    <div className="min-h-screen bg-white font-['Nunito']">

      {/* Keyframes para animações do personagem */}
      <style>{`
        @keyframes swingArm {
          from { transform: rotate(-25deg); }
          to { transform: rotate(25deg); }
        }
        @keyframes swingLeg {
          from { transform: rotate(-20deg); }
          to { transform: rotate(20deg); }
        }
        @keyframes walkBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .trail-bg {
          background: linear-gradient(180deg, #E8F4FD 0%, #D4EBF8 30%, #C8E8F5 60%, #E8F4FD 100%);
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
            <img
              src={LOGO_NEW}
              alt="Santana Daufenbach Advocacia"
              className="h-12 w-auto"
            />
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {[
              { label: "Início", href: "/" },
              { label: "Serviços", href: "/#servicos" },
              { label: "Equipe", href: "/#equipe" },
              { label: "Contato", href: "/#contato" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out transform hover:scale-110 relative pb-1 ${
                  scrolled
                    ? "text-slate-700 hover:text-blue-700"
                    : "text-white hover:text-cyan-300"
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-700 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/iss"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
              }`}
            >
              ISS Saneamento
            </a>
            <a
              href="/prev"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
              }`}
            >
              Previdenciário
            </a>
            <a
              href="/ctc"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 border-2 ${
                scrolled
                  ? "bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600"
                  : "bg-white/20 text-white border-white hover:bg-white/30"
              }`}
            >
              CTC
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("Navbar WhatsApp CTC")}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <Phone size={15} />
              WhatsApp
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 ${scrolled ? "text-slate-700" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-slate-100">
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
              <a href="/iss" className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700 bg-blue-50 px-3 rounded">
                ISS Saneamento
              </a>
              <a href="/prev" className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700 bg-blue-50 px-3 rounded">
                Previdenciário
              </a>
              <a href="/ctc" className="text-left text-white font-semibold py-2 border-b border-slate-100 bg-cyan-500 px-3 rounded">
                CTC
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Mobile Menu - Falar no WhatsApp CTC")}
                className="bg-green-500 text-white px-5 py-3 rounded-full text-center font-bold"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO — PONTO DE PARTIDA ===== */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F2A4A 0%, #1E5FA8 55%, #2B8FCC 100%)",
        }}
      >
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/images/ctc-hero.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Overlay gradiente sobre a imagem */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(15,42,74,0.88) 0%, rgba(30,95,168,0.82) 55%, rgba(43,143,204,0.75) 100%)",
          }}
        />
        {/* Corte diagonal inferior */}
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
              Certidão de Tempo
              <span className="block text-cyan-300">de Contribuição</span>
            </h1>
            <p
              className="fade-in-up text-2xl md:text-3xl text-blue-100 mb-6 max-w-2xl leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              Antes de iniciar a trilha para a averbação do tempo de contribuição, você precisa conhecer o documento mais importante dessa jornada.
            </p>

            {/* Box explicativo */}
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
                🎯 O que é a Certidão de Tempo de Contribuição?
              </p>
              <p className="text-white leading-relaxed text-xl">
                É o documento que permite <strong className="text-cyan-200">somar as contribuições de um regime previdenciário em outro</strong> — por exemplo, o tempo contribuído para o INSS pode ser averbado no seu cargo público, ou vice-versa.
              </p>
              <p className="text-blue-200 mt-3 leading-relaxed text-lg">
                Em outras palavras: se você trabalhou na iniciativa privada (INSS) e hoje é servidor público, ou o contrário, a CTC é o instrumento que une esses dois mundos e pode <strong className="text-white">ampliar significativamente seus direitos de aposentadoria</strong>.
              </p>
            </div>

            <div
              className="fade-in-up flex flex-col sm:flex-row gap-4"
              style={{ transitionDelay: "0.4s" }}
            >
              <button
                onClick={() => { scrollTo("trilha"); pushGTMEvent("cta_click_ctc", { event_category: "Engajamento", event_label: "Hero - Iniciar a Trilha", page: "/ctc" }); }}
                className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl"
                style={{ backgroundColor: "#29ABE2" }}
              >
                Iniciar a Trilha
                <ChevronDown size={20} />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Hero - Falar com Especialista CTC")}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl"
              >
                <Phone size={20} />
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>

        {/* Seta animada para baixo */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white opacity-60 animate-bounce">
          <ArrowDown size={28} />
        </div>
      </section>

      {/* ===== TRILHA — JORNADA DO CLIENTE ===== */}
      <section id="trilha" className="py-24 overflow-hidden trail-bg">
        <div className="container">
          {/* Título da seção */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
              style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
            >
              <Map size={16} />
              Sua Jornada Começa Aqui
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                color: "#1E5FA8",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Agora que você já sabe o que é a CTC...
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#4A5568" }}
            >
              Vamos mostrar o <strong style={{ color: "#1E5FA8" }}>melhor caminho</strong> para aproveitar a Certidão de Tempo de Contribuição ao máximo. Role a página e acompanhe a jornada!
            </p>
          </div>

          {/* ESTRADA ANIMADA — visível em telas grandes */}
          <div className="hidden lg:block">
            <AnimatedRoad />
          </div>

          {/* VERSÃO MOBILE — cards empilhados com linha conectora */}
          <div className="lg:hidden relative">
            {/* Linha vertical conectora */}
            <div
              className="absolute left-8 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: "#29ABE2", opacity: 0.3 }}
            />

            {[
              {
                num: "1",
                icon: <Compass size={20} />,
                label: "ETAPA 1 — O MAIS IMPORTANTE",
                title: "Planejamento Estratégico",
                color: "#1E5FA8",
                content: (
                  <>
                    <p className="text-base leading-relaxed mb-3" style={{ color: "#2D3748" }}>
                      Realizamos um <strong>estudo completo da sua situação previdenciária</strong>, identificando as melhores possibilidades.
                    </p>
                    <ul className="space-y-2">
                      {["Possibilidade de mais de uma aposentadoria", "Antecipação de regras de aposentadoria", "Combinações mais vantajosas de tempo"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#29ABE2" }} />
                          <span className="text-base font-medium" style={{ color: "#4A5568" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 p-3 rounded-xl text-sm font-semibold" style={{ backgroundColor: "#FFF8E1", color: "#B7791F" }}>
                      💡 O planejamento é a <strong>bússola de toda a jornada</strong>
                    </div>
                  </>
                ),
              },
              {
                num: "2",
                icon: <FileText size={20} />,
                label: "ETAPA 2 — ELABORAÇÃO",
                title: "Requerimentos da CTC",
                color: "#29ABE2",
                content: (
                  <>
                    <p className="text-base leading-relaxed mb-3" style={{ color: "#2D3748" }}>
                      Elaboramos os <strong>requerimentos da CTC</strong> com destinação exata do tempo de contribuição, seguindo o plano.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ label: "Documentação Completa", icon: "📋" }, { label: "Destinação Precisa", icon: "🎯" }, { label: "Seguindo o Plano", icon: "🗺️" }, { label: "Acompanhamento Total", icon: "👁️" }].map((item, i) => (
                        <div key={i} className="flex items-center gap-1 p-2 rounded-lg" style={{ backgroundColor: "#F0F7FF" }}>
                          <span className="text-sm">{item.icon}</span>
                          <span className="text-base font-semibold" style={{ color: "#1E5FA8" }}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ),
              },
              {
                num: "3",
                icon: <Flag size={20} />,
                label: "ETAPA 3 — DESTINO FINAL",
                title: "Averbação do Tempo",
                color: "#1E5FA8",
                content: (
                  <>
                    <p className="text-base leading-relaxed mb-3" style={{ color: "#2D3748" }}>
                      Com a CTC em mãos, realizamos os <strong>pedidos de averbação</strong> de acordo com o planejamento inicial.
                    </p>
                    <div className="p-3 rounded-xl border-2" style={{ backgroundColor: "#EFF6FF", borderColor: "#1E5FA8" }}>
                      <p className="font-bold text-base mb-1" style={{ color: "#1E5FA8" }}>🏁 Resultado Final</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#2D3748" }}>
                        Tempo averbado da maneira que você tenha o <strong>melhor direito de aposentadoria possível</strong>.
                      </p>
                    </div>
                  </>
                ),
              },
            ].map((step, idx) => (
              <div key={idx} className="relative pl-20 mb-12">
                {/* Marcador circular */}
                <div
                  className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                  style={{ backgroundColor: step.color, top: "16px" }}
                >
                  <div className="text-white">{step.icon}</div>
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "#0F2A4A" }}
                  >
                    {step.num}
                  </div>
                </div>
                {/* Card */}
                <div
                  className="rounded-2xl p-6 shadow-lg border-t-4 cursor-default"
                  style={{ backgroundColor: "#FFFFFF", borderTopColor: step.color, transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(30,95,168,0.22)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
                >
                  <div
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-2"
                    style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
                  >
                    {step.label}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#1E5FA8", fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  {step.content}
                </div>
              </div>
            ))}
          </div>

          {/* CTA após trilha */}
          <div className="text-center mt-16">
            <div
              className="inline-block rounded-3xl p-8 shadow-xl max-w-2xl"
              style={{ backgroundColor: "#1E5FA8" }}
            >
              <p
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Pronto para iniciar sua jornada?
              </p>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Nossa equipe especializada está pronta para guiar você em cada etapa desta trilha e garantir que você chegue ao melhor destino possível.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("CTA Trilha - Iniciar Agora CTC")}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg"
                >
                  <Phone size={20} />
                  Iniciar Agora pelo WhatsApp
                </a>
                <button
                  onClick={() => { scrollTo("contato"); pushGTMEvent("cta_click_ctc", { event_category: "Engajamento", event_label: "CTA Trilha - Enviar Mensagem", page: "/ctc" }); }}
                  className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/40 hover:bg-white/10"
                >
                  <Send size={20} />
                  Enviar Mensagem
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VÍDEO DO YOUTUBE ===== */}
      <section id="video" className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div ref={videoRef} className="container">
          <div className="text-center mb-12">
            <div
              className="fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-4"
              style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
            >
              📺 Nosso Canal
            </div>
            <h2
              className="fade-in-up text-3xl md:text-4xl font-bold"
              style={{
                color: "#1E5FA8",
                fontFamily: "'Playfair Display', serif",
                transitionDelay: "0.1s",
              }}
            >
              Saiba Mais Sobre a Assessoria na CTC
            </h2>
            <p
              className="fade-in-up text-lg mt-3 max-w-xl mx-auto"
              style={{ color: "#4A5568", transitionDelay: "0.2s" }}
            >
              Assista ao nosso vídeo explicativo e entenda todos os detalhes do Serviço de Assessoria na Certidão de Tempo de Contribuição.
            </p>
          </div>

          <div className="fade-in-up max-w-3xl mx-auto" style={{ transitionDelay: "0.2s" }}>
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Certidão de Tempo de Contribuição"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-center mt-6">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushGTMEvent("cta_click_ctc", { event_category: "Engajamento", event_label: "Video - Acessar Canal YouTube", page: "/ctc" })}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Acessar Nosso Canal no YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQSection />

      {/* ===== FORMULÁRIO DE CONTATO ===== */}
      <section id="contato" className="py-20" style={{ backgroundColor: "#F0F7FF" }}>
        <div ref={contactRef} className="container">
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
              Tire suas dúvidas ou solicite uma avaliação gratuita da sua situação previdenciária.
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
                    { icon: <Phone size={20} />, label: "WhatsApp", value: "(44) 99856-3465", href: whatsappUrl },
                    { icon: <Mail size={20} />, label: "E-mail", value: "joao@advocaciasd.com.br", href: "mailto:joao@advocaciasd.com.br" },
                    { icon: <MapPin size={20} />, label: "Endereço", value: "Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2, Novo Centro, Maringá/PR", href: "#mapa" },
                    { icon: <Clock size={20} />, label: "Horário", value: "Seg–Sex: 9h às 17h", href: null },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#E0F0FF", color: "#1E5FA8" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#29ABE2" }}>
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
                          <p className="font-semibold" style={{ color: "#2D3748" }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: "#1E5FA8" }}>
                <p className="text-white font-bold text-lg mb-2">Atendimento Rápido</p>
                <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                  Para uma resposta mais ágil, entre em contato diretamente pelo WhatsApp. Nossa equipe responde em até 2 horas úteis.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("Secao Contato - Chamar no WhatsApp CTC")}
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
                  <label className="block text-sm font-semibold mb-1" style={{ color: "#2D3748" }}>
                    Nome completo *
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-1" style={{ color: "#2D3748" }}>
                    WhatsApp *
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-1" style={{ color: "#2D3748" }}>
                    E-mail
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-1" style={{ color: "#2D3748" }}>
                    Mensagem *
                  </label>
                  <textarea
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
      <section id="mapa" className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
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
              { icon: <MapPin size={24} />, title: "Endereço", value: "Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2, Novo Centro, Maringá/PR" },
              { icon: <Phone size={24} />, title: "Telefone / WhatsApp", value: "(44) 99856-3465" },
              { icon: <Clock size={24} />, title: "Horário de Atendimento", value: "Segunda a Sexta: 9h às 17h" },
            ].map((item, i) => (
              <div
                key={i}
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
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#29ABE2" }}>
                    {item.title}
                  </p>
                  <p className="font-semibold" style={{ color: "#2D3748" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10" style={{ backgroundColor: "#0F172A" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={LOGO_NEW} alt="Santana Daufenbach" className="h-10 w-auto" />
              <div>
                <div className="font-bold text-white">Santana Daufenbach</div>
                <div className="text-sm text-slate-400">Advocacia e Assessoria Jurídica</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition-colors">Início</a>
              <a href="/iss" className="hover:text-white transition-colors">ISS Saneamento</a>
              <a href="/prev" className="hover:text-white transition-colors">Previdenciário</a>
              <a href="/ctc" className="hover:text-white transition-colors" style={{ color: "#29ABE2" }}>CTC</a>
            </div>
            <div className="text-sm text-slate-500 text-center md:text-right">
              © 2026 Santana Daufenbach Advocacia.<br />
              Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* ===== BOTÃO FLUTUANTE WHATSAPP ===== */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleWhatsAppClick("Botao Flutuante WhatsApp CTC")}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        title="Falar no WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
      </a>
    </div>
  );
}
