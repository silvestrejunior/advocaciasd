/**
 * Design: Corporate Modernismo Limpo
 * Paleta: Azul Royal (#1E5FA8) + Ciano (#29ABE2) + Cinza Escuro (#2D3748)
 * Tipografia: Playfair Display (h1/h2/h3) + Nunito (corpo)
 * Layout: Seções alternadas com diagonal cuts, hero assimétrico, cards com borda esquerda colorida
 */

import { useEffect, useRef, useState } from "react";
import {
  Scale,
  TrendingUp,
  Shield,
  CheckCircle,
  Phone,
  Menu,
  X,
  ChevronDown,
  Building2,
  Banknote,
  FileText,
  Clock,
  ArrowRight,
  Play,
  Users,
  Award,
} from "lucide-react";

// CDN URLs dos logos e imagens
const LOGO_NEW = "/images/logo-sd.png";
const LOGO_VERTICAL_WHITE = "/images/logo-sd-branco.png";

const HERO_IMG = "/images/iss-hero.jpg";
const TEAM_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/hVrwbHFcxm4l8ctZpj2qrf/sandbox/ApZd3tEKUsDPsHHzFhTHoi-img-2_1771949703000_na1fn_dGVhbS1sYXd5ZXJz.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaFZyd2JIRmN4bTRsOGN0WnBqMnFyZi9zYW5kYm94L0FwWmQzdEVLVXNEUHNISHpGaFRIb2ktaW1nLTJfMTc3MTk0OTcwMzAwMF9uYTFmbl9kR1ZoYlMxc1lYZDVaWEp6LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=p8Odfy8I9846oxf2vsSWF~Z~sryzjX8HTOCf1ka-PI-R~AIaHV-k2E-JThq4mXRU2S7Md3B5IkDfT4N3G8W11PWVQZy659x99myo4tjLmPudctGOd-C54nVdRE-5dEeAc6Br0ZywZtWh83mPS9upJsSXvydFi83YmGv~VfXTqWJBiRjbZGZWc-IMPL~sIjBIOdeNajJuiIb0ugHjJSaCg4MIpN41BojIIUzxP5bq9s0301~629USAo1-WrLfBkH-xtQfOHX7BMdLZB4li3KFluu5mrpHZ0NVSuxaPU1bjVUmB28tdEmAlhb9Zp4c39znhQtei-m~CJKyP4mZmZc4JQ__";
const FINANCIAL_IMG = "/images/iss-financeiro.jpg";
const PIPES_IMG = "/images/iss-obras.jpg";

const WHATSAPP_NUMBER = "5544998563465"; // Número do escritório Santana Daufenbach

// Hook de animação ao scroll
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
      { threshold: 0.15 }
    );
    const elements = ref.current?.querySelectorAll(".fade-in-up");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Hook para contador animado
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// Componente de estatística
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display']">
        {count}{suffix}
      </div>
      <div className="text-cyan-300 text-sm mt-1 font-['Nunito'] font-semibold uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function ISS() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const advantagesRef = useScrollAnimation();
  const teamRef = useScrollAnimation();
  const processRef = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20recupera%C3%A7%C3%A3o%20de%20ISS%20em%20obras%20de%20saneamento%20b%C3%A1sico.`;

  return (
    <div className="min-h-screen bg-white font-['Nunito']">

      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src={LOGO_NEW}
              alt="Santana Daufenbach Advocacia"
              className="h-12 w-auto"
            />
            <div>
              <div className="text-sm md:text-base font-bold leading-tight" style={{ color: scrolled ? '#1E5FA8' : 'white' }}>
                Santana Daufenbach
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: scrolled ? '#29ABE2' : '#E0F2FE' }}>
                Advocacia
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {[
              { label: "Início", id: "inicio" },
              { label: "Serviços", id: "servicos" },
              { label: "Como Atuamos", id: "como-atuamos" },
              { label: "Vantagens", id: "vantagens" },
              { label: "Equipe", id: "equipe" },
              { label: "Contato", id: "contato" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                  scrolled ? "text-slate-700 hover:text-blue-700" : "text-white hover:text-cyan-300"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
              }`}
            >
              Portal Principal
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
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
              }`}
            >
              CTC
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
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
          <div className="md:hidden bg-white shadow-lg border-t border-slate-100 mobile-menu-open">
            <div className="container py-4 flex flex-col gap-4">
              {[
                { label: "Início", id: "inicio" },
                { label: "Serviços", id: "servicos" },
                { label: "Como Atuamos", id: "como-atuamos" },
                { label: "Vantagens", id: "vantagens" },
                { label: "Equipe", id: "equipe" },
                { label: "Contato", id: "contato" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/"
                className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700 bg-blue-50 px-3 rounded"
              >
                Portal Principal
              </a>
              <a
                href="/prev"
                className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700 bg-blue-50 px-3 rounded"
              >
                Previdenciário
              </a>
              <a
                href="/ctc"
                className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700 bg-blue-50 px-3 rounded"
              >
                CTC
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
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
          background: "linear-gradient(135deg, #1A365D 0%, #1E5FA8 50%, #2B7FC4 100%)",
        }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Diagonal bottom cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />

        <div ref={heroRef} className="container relative z-10 pt-28 pb-40">
          <div className="max-w-3xl">
            <div className="fade-in-up">
              <span className="inline-block bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-cyan-400/30">
                Advocacia Tributária Especializada
              </span>
            </div>
            <h1 className="fade-in-up text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{ transitionDelay: "0.1s" }}>
              Recupere o ISS Pago
              <span className="block text-cyan-300">Indevidamente</span>
              em Obras de Saneamento
            </h1>
            <p className="fade-in-up text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed" style={{ transitionDelay: "0.2s" }}>
              Sua construtora tem direito à isenção de ISS em obras de implantação e manutenção de redes de esgoto, abastecimento de água e ligações hidrossanitárias. Nossa equipe atua na recuperação dos valores pagos indevidamente e na suspensão dos pagamentos durante o período de obra.
            </p>
            <div className="fade-in-up flex flex-col sm:flex-row gap-4" style={{ transitionDelay: "0.3s" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg"
              >
                <Phone size={20} />
                Consulta Gratuita via WhatsApp
              </a>
              <button
                onClick={() => scrollTo("como-atuamos")}
                className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all"
              >
                Saiba Mais
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* ===== SOBRE O SERVIÇO ===== */}
      <section id="servicos" className="py-20 bg-white">
        <div ref={servicesRef} className="container">
          <div className="text-center mb-16">
            <div className="fade-in-up">
              <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">O Que Fazemos</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-3 mb-6">
                Especialistas em ISS para<br />Obras de Saneamento Básico
              </h2>
              <div className="w-16 h-1 bg-cyan-400 mx-auto mb-6" />
              <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
                A legislação brasileira prevê a isenção de ISS para empresas que executam obras de saneamento básico — mas muitas construtoras continuam pagando esse imposto indevidamente. Nossa equipe identifica, documenta e recupera esses valores com segurança jurídica.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 size={32} className="text-cyan-500" />,
                title: "Obras Contempladas",
                desc: "Rede coletora de esgoto, rede de abastecimento de água, ligações hidrossanitárias, estações de tratamento e demais obras de saneamento básico.",
                delay: "0s",
              },
              {
                icon: <Banknote size={32} className="text-cyan-500" />,
                title: "Recuperação de ISS",
                desc: "Identificamos os valores pagos indevidamente nos últimos 5 anos e atuamos para a restituição integral com correção monetária e juros.",
                delay: "0.1s",
              },
              {
                icon: <Shield size={32} className="text-cyan-500" />,
                title: "Suspensão Ativa",
                desc: "Atuamos preventivamente para suspender os pagamentos de ISS durante o período de execução das obras, melhorando seu fluxo de caixa imediatamente.",
                delay: "0.2s",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="fade-in-up bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow group"
                style={{ transitionDelay: card.delay }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMO ATUAMOS ===== */}
      <section
        id="como-atuamos"
        className="py-20 relative"
        style={{ background: "linear-gradient(135deg, #1A365D 0%, #1E5FA8 100%)" }}
      >
        <div ref={processRef} className="container">
          <div className="text-center mb-16">
            <div className="fade-in-up">
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Nossa Atuação</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4">
                Como Podemos Auxiliar<br />a Sua Construtora
              </h2>
              <div className="w-16 h-1 bg-cyan-400 mx-auto" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  num: "01",
                  title: "Diagnóstico Tributário Gratuito",
                  desc: "Analisamos os contratos e notas fiscais da sua empresa para identificar o montante de ISS pago indevidamente nos últimos 5 anos.",
                  delay: "0s",
                },
                {
                  num: "02",
                  title: "Ação de Recuperação Retroativa",
                  desc: "Ingressamos com medida judicial ou administrativa para recuperar todos os valores pagos indevidamente, com correção monetária e juros legais.",
                  delay: "0.1s",
                },
                {
                  num: "03",
                  title: "Suspensão dos Pagamentos em Curso",
                  desc: "Obtemos liminar ou decisão administrativa para suspender os pagamentos de ISS durante toda a vigência dos contratos de saneamento em execução.",
                  delay: "0.2s",
                },
                {
                  num: "04",
                  title: "Acompanhamento Contínuo",
                  desc: "Monitoramos todos os processos e mantemos sua empresa informada sobre cada etapa, garantindo segurança jurídica em todas as operações.",
                  delay: "0.3s",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="fade-in-up flex gap-5 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                  style={{ transitionDelay: step.delay }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-sm">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video section */}
            <div className="fade-in-up" style={{ transitionDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={PIPES_IMG}
                  alt="Obras de saneamento básico"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/60 flex flex-col items-center justify-center">
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform mb-4"
                  >
                    <Play size={32} className="text-blue-700 ml-1" fill="currentColor" />
                  </button>
                  <p className="text-white font-bold text-lg text-center px-6">
                    Assista ao vídeo explicativo sobre nossa atuação
                  </p>
                  <p className="text-blue-200 text-sm mt-2 text-center px-6">
                    Entenda como recuperamos o ISS da sua empresa
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-start gap-3">
                  <FileText size={24} className="text-cyan-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Base Legal Sólida</h4>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Nossa atuação é fundamentada na Lei Federal nº 11.445/2007 (Lei do Saneamento Básico), na LC 116/2003 e em jurisprudência consolidada do STJ e STF, garantindo segurança e previsibilidade para sua empresa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VANTAGENS ===== */}
      <section id="vantagens" className="py-20 bg-slate-50">
        <div ref={advantagesRef} className="container">
          <div className="text-center mb-16">
            <div className="fade-in-up">
              <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Por Que Contratar</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-3 mb-4">
                Vantagens para Sua Empresa
              </h2>
              <div className="w-16 h-1 bg-cyan-400 mx-auto mb-6" />
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                A contratação do nosso serviço gera impacto direto e imediato nos resultados financeiros da sua construtora.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="fade-in-up" style={{ transitionDelay: "0s" }}>
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[300px]">
                <img src={FINANCIAL_IMG} alt="Recuperação financeira" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Recuperação de Ativos Financeiros</h3>
                  <p className="text-blue-100">Valores pagos indevidamente nos últimos 5 anos retornam ao caixa da empresa com correção e juros.</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: <TrendingUp size={24} className="text-cyan-500" />,
                  title: "Melhora Imediata no Fluxo de Caixa",
                  desc: "Com a suspensão dos pagamentos de ISS durante as obras, sua empresa reduz a carga tributária imediatamente, liberando capital de giro.",
                  delay: "0.1s",
                },
                {
                  icon: <Banknote size={24} className="text-cyan-500" />,
                  title: "Barateamento da Carga Tributária",
                  desc: "A isenção de ISS reduz diretamente o custo tributário das obras, tornando sua empresa mais competitiva nas licitações.",
                  delay: "0.2s",
                },
                {
                  icon: <Scale size={24} className="text-cyan-500" />,
                  title: "Segurança Jurídica Total",
                  desc: "Toda a atuação é baseada em legislação federal e jurisprudência consolidada, sem riscos para sua empresa.",
                  delay: "0.3s",
                },
                {
                  icon: <Clock size={24} className="text-cyan-500" />,
                  title: "Honorários por Êxito",
                  desc: "Nossos honorários são vinculados ao resultado obtido. Você só paga quando sua empresa recuperar os valores.",
                  delay: "0.4s",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="fade-in-up flex gap-4 bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-cyan-200 transition-colors"
                  style={{ transitionDelay: item.delay }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Obras contempladas */}
          <div className="fade-in-up bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Obras de Saneamento Contempladas</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Rede coletora de esgoto",
                "Rede de abastecimento de água",
                "Ligações hidrossanitárias",
                "Estações de tratamento de esgoto (ETE)",
                "Estações de tratamento de água (ETA)",
                "Adutoras e emissários",
                "Poços artesianos e reservatórios",
                "Sistemas de drenagem urbana",
                "Obras de manutenção de redes",
              ].map((obra) => (
                <div key={obra} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <CheckCircle size={18} className="text-cyan-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{obra}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ===== CTA FINAL ===== */}
      <section id="contato" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Comece Agora</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-3 mb-6">
              Sua Construtora Pode Estar<br />Pagando ISS Indevidamente
            </h2>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Faça uma consulta gratuita com nossa equipe. Em poucos minutos, identificamos se sua empresa tem direito à recuperação de ISS e qual o potencial de valores a recuperar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg"
              >
                <Phone size={24} />
                Consulta Gratuita via WhatsApp
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: <CheckCircle size={20} className="text-green-500" />, text: "Consulta 100% gratuita" },
                { icon: <CheckCircle size={20} className="text-green-500" />, text: "Honorários por êxito" },
                { icon: <CheckCircle size={20} className="text-green-500" />, text: "Sem risco para sua empresa" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 justify-center text-slate-600 font-medium">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCALIZACAO ===== */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Entre em Contato</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-3 mb-6">
              Visite Nosso Escritório
            </h2>
            <div className="w-16 h-1 bg-cyan-400 mx-auto mb-6" />
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Localizado no coração do Novo Centro de Maringá, no Ed. New Tower Plaza. Estamos prontos para recebê-lo presencialmente ou via WhatsApp para uma consulta especializada.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Endereço Completo</h3>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Avenida João Paulino Vieira Filho, 625</strong><br />
                  Sala 708, Torre 2<br />
                  Ed. New Tower Plaza<br />
                  Novo Centro<br />
                  Maringá/PR, Brasil<br />
                  CEP 87020-015
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Horário de Atendimento</h3>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Segunda a Sexta</strong><br />
                  09:00 - 17:00<br />
                  <br />
                  <strong>Sábado e Domingo</strong><br />
                  Fechado
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 w-full justify-center"
              >
                <Phone size={20} />
                Agendar Reunião via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-12"
        style={{ background: "linear-gradient(135deg, #0F2744 0%, #1A365D 100%)" }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <img
                src={LOGO_NEW}
                alt="Santana Daufenbach"
                className="h-16 w-auto mx-auto md:mx-0 mb-4"
              />
              <p className="text-blue-300 text-sm max-w-xs">
                Especialistas em recuperação e isenção de ISS para construtoras em obras de saneamento básico.
              </p>
            </div>

            <div className="text-center">
              <p className="text-blue-300 text-sm mb-4">Fale conosco</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
              >
                <Phone size={18} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-center">
            <p className="text-blue-400 text-sm">
              © {new Date().getFullYear()} Santana Daufenbach Advocacia. Todos os direitos reservados.
            </p>
            <p className="text-blue-500 text-xs mt-1">
              Advocacia Previdenciária e Tributária
            </p>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOATING BUTTON ===== */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl whatsapp-pulse hover:bg-green-600 transition-colors"
        title="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ===== VIDEO MODAL ===== */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-slate-800">Como Atuamos — Santana Daufenbach</h3>
              <button onClick={() => setVideoOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video bg-slate-100">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/ctTXXNmb6v4"
                title="Como Atuamos - Santana Daufenbach"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
