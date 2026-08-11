/*
 * Design: Corporate Modernismo Limpo (similar ao site de ISS)
 * Paleta: Azul Royal (#1E5FA8) + Ciano (#29ABE2) + Cinza Escuro (#2D3748)
 * Tipografia: Playfair Display (h1/h2/h3) + Nunito (corpo)
 * Layout: Seções alternadas com diagonal cuts, hero assimétrico, cards com borda esquerda colorida
 */

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  ArrowRight,
} from "lucide-react";

// CDN URLs
const LOGO_NEW = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/DdpGSCuwtiJucNOQ.png";
const WHATSAPP_NUMBER = "5544998109740";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    mensagem: "",
  });

  const heroRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const teamRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  const team = [
    {
      name: "João Luiz Santana Daufenbach",
      role: "Sócio Proprietário",
      oab: "OAB/PR nº 66.208",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/YeriNorWVXuXcveq.png",
    },
    {
      name: "Lucas Felipe Real",
      role: "Advogado",
      oab: "OAB/PR nº 134.127",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/iYGzIuXNYclStIth.png",
    },
    {
      name: "Gabriela Andressa Borsato",
      role: "Estagiária",
      oab: "",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/bPBvCtRQerTBewMS.png",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `Nome: ${formData.nome}%0AWhatsApp: ${formData.whatsapp}%0AE-mail: ${formData.email}%0AMensagem: ${formData.mensagem}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setFormData({ nome: "", whatsapp: "", email: "", mensagem: "" });
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="min-h-screen bg-white font-['Nunito']">
      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
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
              { label: "Equipe", id: "equipe" },
              { label: "Contato", id: "contato" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out transform hover:scale-110 relative pb-1 ${scrolled ? "text-slate-700 hover:text-blue-700" : "text-white hover:text-cyan-300"
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-700 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/iss"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
                }`}
            >
              ISS Saneamento
            </a>
            <a
              href="/prev"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${scrolled
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/30 border border-cyan-400/50"
                }`}
            >
              Previdenciário
            </a>
            <a
              href="/ctc"
              className={`text-sm font-semibold uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${scrolled
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
                href="/iss"
                className="text-left text-slate-700 font-semibold py-2 border-b border-slate-100 hover:text-blue-700 bg-blue-50 px-3 rounded"
              >
                ISS Saneamento
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
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{
          background: "linear-gradient(135deg, #1A365D 0%, #1E5FA8 50%, #2B7FC4 100%)",
        }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/CSIKWBvQveAASmaf.jpg')` }}
        />

        {/* Diagonal bottom cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />

        {/* Balao translucido Portal Principal */}
        <div className="absolute top-32 right-8 z-20">
          <div className="portal-badge bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-semibold text-sm md:text-base shadow-lg">
            Portal Principal
          </div>
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Playfair_Display'] fade-in-up">
              Soluções Jurídicas Especializadas
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 fade-in-up">
              Direito Previdenciário e Tributário para Construtoras
            </p>
            <div className="flex flex-col md:flex-row gap-4 fade-in-up">
              <button
                onClick={() => scrollTo("servicos")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
              >
                Conheça Nossas Áreas de Atuação
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={20} />
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section
        id="servicos"
        ref={servicesRef}
        className="py-20 px-4 bg-white relative"
      >
        {/* Diagonal top cut */}
        <div
          className="absolute top-0 left-0 right-0 h-24 bg-white"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />

        <div className="container mt-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-16 text-center font-['Playfair_Display'] fade-in-up">
            Áreas de Atuação
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Direito Previdenciário */}
            <div className="fade-in-up group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-blue-600">
              <div className="h-48 overflow-hidden bg-blue-100">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/YdYgaeGsBUAWMjBz.webp"
                  alt="Direito Previdenciário"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 font-['Playfair_Display']">
                  Direito Previdenciário
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Assessoria jurídica especializada em questões previdenciárias, benefícios, contribuições e regularização de direitos.
                </p>
                <a
                  href="/prev"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                >
                  Acessar Site
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Card 2: Empresas de Saneamento */}
            <div className="fade-in-up group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-blue-600">
              <div className="h-48 overflow-hidden bg-cyan-100">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/kVnJTyxrYmyphdjo.png"
                  alt="Empresas de Saneamento"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 font-['Playfair_Display']">
                  Empresas de Saneamento
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Recuperação e isenção de ISS em obras de saneamento básico. Suspensão de pagamentos e recuperação de ativos.
                </p>
                <a
                  href="/iss"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                >
                  Acessar Site
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EQUIPE ===== */}
      {/* <section
        id="equipe"
        ref={teamRef}
        className="py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/hWTTEoTFWuIhYiLc.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          background: `linear-gradient(135deg, #1A365D 0%, #1E5FA8 50%, #2B7FC4 100%), url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663380153869/hWTTEoTFWuIhYiLc.jpg')`,
          backgroundBlendMode: 'overlay',
        }}
      >

        //Diagonal top cut
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background: "white",
            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          }}
        />

        <div className="container mt-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center font-['Playfair_Display'] fade-in-up">
            Nossa Equipe
          </h2>

          <div className="relative flex items-center justify-center gap-6 fade-in-up">
            //Botão Anterior
            <button
              onClick={() => setCurrentTeamIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1))}
              className="absolute left-0 z-10 p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>

            //Carousel
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-sm">
                <div className="relative group">
                 //Card com efeito de profundidade
                  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/50 to-blue-700/50 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <img
                      src={team[currentTeamIndex].image}
                      alt={team[currentTeamIndex].name}
                      className="w-full h-auto object-contain object-center"
                      style={{ maxHeight: "500px" }}
                    />
                    <div className="p-8 text-center bg-gradient-to-b from-white/95 to-blue-50/95">
                      <h3 className="text-2xl font-bold text-blue-900 mb-2 font-['Playfair_Display']">
                        {team[currentTeamIndex].name}
                      </h3>
                      <p className="text-cyan-600 font-semibold mb-2 text-lg">
                        {team[currentTeamIndex].role}
                      </p>
                      {team[currentTeamIndex].oab && (
                        <p className="text-blue-700 font-medium text-sm border-t border-blue-200 pt-3 mt-3">
                          {team[currentTeamIndex].oab}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            //Botão Próximo
            <button
              onClick={() => setCurrentTeamIndex((prev) => (prev === team.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 z-10 p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section> */}

      {/* ===== CONTATO ===== */}
      <section
        id="contato"
        ref={contactRef}
        className="py-16 px-4 bg-white relative"
      >
        {/* Diagonal top cut */}
        <div
          className="absolute top-0 left-0 right-0 h-24 bg-white"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />

        <div className="container mt-12 max-w-2xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-center font-['Playfair_Display'] fade-in-up">
            Entre em Contato
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg shadow-lg p-8 space-y-6 border border-blue-200 fade-in-up"
          >
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white"
                placeholder="Seu nome completo"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white"
                placeholder="(XX) XXXXX-XXXX"
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white"
                placeholder="seu@email.com"
              />
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Como posso te ajudar?
              </label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleFormChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none bg-white"
                placeholder="Descreva sua necessidade..."
              />
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-blue-800 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              Enviar Mensagem
              <Send size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* ===== ENDEREÇO ===== */}
      <section className="py-3 px-4 relative" style={{
        background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
      }}>
        {/* Diagonal top cut */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background: "white",
            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          }}
        />

        <div className="container mt-2 max-w-2xl relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 text-center font-['Playfair_Display'] fade-in-up">
            Visite Nosso Escritório
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-600 fade-in-up">
            <p className="text-slate-700 mb-4">
              <span className="font-bold text-base">Endereço Completo:</span><br />
              <span className="text-slate-600 text-sm">
                Avenida João Paulino Vieira Filho, nº 625, Sala 708, Torre 2<br />
                Ed. New Tower Plaza, Novo Centro<br />
                Maringá/PR, Brasil | CEP 87020-015
              </span>
            </p>
            <p className="text-slate-700">
              <span className="font-bold text-base">Horário de Atendimento:</span><br />
              <span className="text-slate-600 text-sm">
                Segunda a Sexta: 09:00 - 17:00<br />
                Sábado e Domingo: Fechado
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== BOTÃO WHATSAPP FLUTUANTE ===== */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle size={28} />
      </a>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-12"
        style={{ background: "linear-gradient(135deg, #0F2744 0%, #1A365D 100%)" }}
      >
        <div className="container">
          <div className="text-center mb-8">
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

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <img
              src={LOGO_NEW}
              alt="Santana Daufenbach"
              className="h-8 w-auto"
            />
            <p className="text-blue-400 text-sm">
              © {new Date().getFullYear()} Santana Daufenbach Advocacia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
