import { useState, type ChangeEvent, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BotaoWhatsApp,
  FaixaCta,
  TituloSecao,
  Trilha,
} from "@/components/site/Sections";
import { Seo, breadcrumbJsonLd } from "@/components/site/Seo";
import { SITE, WHATSAPP_MENSAGENS, whatsapp } from "@/config/site";

const TRILHA = [{ label: "Início", href: "/" }, { label: "Contato" }];

const ASSUNTOS = [
  "Aposentadoria pelo INSS",
  "Aposentadoria de servidor público",
  "Benefício por incapacidade",
  "Benefício negado",
  "Pensão por morte",
  "Revisão de benefício",
  "Outro assunto",
];

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    assunto: ASSUNTOS[0],
    mensagem: "",
  });

  const alterar = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const texto = [
      "Olá, vim pelo site.",
      `Nome: ${form.nome}`,
      `Telefone: ${form.telefone}`,
      form.email ? `E-mail: ${form.email}` : "",
      `Assunto: ${form.assunto}`,
      "",
      form.mensagem,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        titulo="Fale com o escritório em Maringá"
        descricao={`Fale com o escritório ${SITE.nomeCompleto}. WhatsApp ${SITE.whatsappExibicao}, e-mail e endereço em Maringá/PR. Atendimento presencial e remoto em todo o Brasil.`}
        caminho="/contato"
        palavrasChave="contato advogado previdenciário, atendimento previdenciário Maringá, WhatsApp advogado INSS, consulta previdenciária"
        jsonLd={breadcrumbJsonLd([
          { label: "Início", href: "/" },
          { label: "Contato", href: "/contato" },
        ])}
      />
      <SiteHeader sobreHeroEscuro />

      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-16 pt-36 text-white md:pt-44">
        <div className="container mx-auto px-4">
          <Trilha itens={TRILHA} />
          <h1 className="mt-6 max-w-3xl font-['Playfair_Display'] text-4xl font-bold leading-tight md:text-5xl">
            Fale com o escritório
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-100/90">
            Você pode escrever pelo formulário abaixo ou falar direto no WhatsApp.
            Se já tiver documentos, informe no primeiro contato: agiliza bastante a
            análise.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* Formulário */}
            <div>
              <TituloSecao
                sobretitulo="Envie uma mensagem"
                titulo="Conte a sua situação"
                texto="Ao enviar, a mensagem é direcionada para o WhatsApp do escritório com os dados já preenchidos."
              />

              <form onSubmit={enviar} className="mt-9 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[13px] font-semibold text-slate-700">
                      Nome completo *
                    </span>
                    <input
                      name="nome"
                      value={form.nome}
                      onChange={alterar}
                      required
                      autoComplete="name"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-[14px] outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-semibold text-slate-700">
                      Telefone / WhatsApp *
                    </span>
                    <input
                      name="telefone"
                      value={form.telefone}
                      onChange={alterar}
                      required
                      autoComplete="tel"
                      placeholder="(44) 99999-9999"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-[14px] outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[13px] font-semibold text-slate-700">
                      E-mail
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={alterar}
                      autoComplete="email"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-[14px] outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-semibold text-slate-700">
                      Assunto
                    </span>
                    <select
                      name="assunto"
                      value={form.assunto}
                      onChange={alterar}
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[14px] outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    >
                      {ASSUNTOS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-[13px] font-semibold text-slate-700">
                    Mensagem *
                  </span>
                  <textarea
                    name="mensagem"
                    value={form.mensagem}
                    onChange={alterar}
                    required
                    rows={5}
                    placeholder="Descreva brevemente a sua situação: tempo de contribuição, idade, se já fez algum pedido no INSS."
                    className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-[14px] outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-7 py-4 text-[15px] font-bold text-white transition-colors hover:bg-green-600"
                >
                  <Send size={17} />
                  Enviar pelo WhatsApp
                </button>

                <p className="text-[12px] leading-relaxed text-slate-500">
                  O envio abre a conversa no WhatsApp do escritório. Nenhum dado é
                  armazenado neste site.
                </p>
              </form>
            </div>

            {/* Dados e mapa */}
            <div className="space-y-7">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-brand-800">
                  Dados de contato
                </h2>
                <ul className="mt-5 space-y-3.5 text-[14px] text-slate-700">
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
                <p className="mt-5 border-t border-slate-200 pt-5 text-[13px] text-slate-500">
                  {SITE.responsavel} — {SITE.oab}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  title="Localização do escritório em Maringá"
                  src="https://www.google.com/maps?q=Av.+Jo%C3%A3o+Paulino+Vieira+Filho,+625,+Maring%C3%A1+-+PR&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaixaCta
        titulo="Prefere falar direto?"
        texto="O WhatsApp é o caminho mais rápido para uma primeira avaliação."
      />
      <SiteFooter />
      <BotaoWhatsApp />
    </div>
  );
}
