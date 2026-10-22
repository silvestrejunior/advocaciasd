import { useEffect } from "react";
import { SITE } from "@/config/site";

type SeoProps = {
  /** Título da aba e do resultado no Google (sem o nome do escritório). */
  titulo: string;
  /** Meta descrição: o texto que aparece abaixo do título na busca. */
  descricao: string;
  /** Caminho da rota, começando com barra. Ex.: "/aposentadoria-inss". */
  caminho: string;
  tipo?: "website" | "article";
  /** Página que não deve ser indexada (ex.: rota inexistente). */
  noindex?: boolean;
  /** Dados estruturados (schema.org) específicos da página. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: "name" | "property", chave: string, valor: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${chave}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, chave);
    document.head.appendChild(el);
  }
  el.setAttribute("content", valor);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Aplica título, descrição, canônica, dados para redes sociais e dados
 * estruturados de cada página.
 *
 * Como o site é uma SPA, isto roda no navegador. É o que faz a aba e os
 * resultados do Google ficarem corretos; a versão pré-renderizada dessas
 * mesmas tags é gerada no build.
 */
export function Seo({
  titulo,
  descricao,
  caminho,
  tipo = "website",
  noindex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const tituloCompleto = `${titulo} | ${SITE.nome}`;
    const url = `${SITE.dominio}${caminho}`;

    document.title = tituloCompleto;
    upsertMeta("name", "description", descricao);
    upsertMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1",
    );
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", tipo);
    upsertMeta("property", "og:site_name", SITE.nomeCompleto);
    upsertMeta("property", "og:title", tituloCompleto);
    upsertMeta("property", "og:description", descricao);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", `${SITE.dominio}/images/og-image.jpg`);
    upsertMeta("property", "og:locale", "pt_BR");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", tituloCompleto);
    upsertMeta("name", "twitter:description", descricao);
    upsertMeta("name", "twitter:image", `${SITE.dominio}/images/og-image.jpg`);

    const marcaId = "jsonld-pagina";
    document.getElementById(marcaId)?.remove();

    const blocos = [
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: SITE.nomeCompleto,
        url: SITE.dominio,
        image: `${SITE.dominio}/images/og-image.jpg`,
        telephone: `+${SITE.whatsapp}`,
        email: SITE.email,
        openingHours: "Mo-Fr 09:00-17:00",
        areaServed: { "@type": "Country", name: "Brasil" },
        sameAs: [SITE.youtube],
        knowsAbout: [
          "Aposentadoria por idade",
          "Aposentadoria especial",
          "Aposentadoria de servidor público",
          "Benefícios por incapacidade",
          "Revisão de benefício do INSS",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2",
          addressLocality: "Maringá",
          addressRegion: "PR",
          addressCountry: "BR",
        },
        employee: {
          "@type": "Person",
          name: SITE.responsavel,
          jobTitle: "Advogado",
          identifier: SITE.oab,
        },
      },
      ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
    ];

    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = marcaId;
    tag.textContent = JSON.stringify(blocos);
    document.head.appendChild(tag);

    return () => {
      document.getElementById(marcaId)?.remove();
    };
  }, [titulo, descricao, caminho, tipo, jsonLd, noindex]);

  return null;
}

/** Gera o bloco de perguntas frequentes para os dados estruturados. */
export function faqJsonLd(perguntas: { pergunta: string; resposta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
    })),
  };
}

/** Gera a trilha de navegação para os dados estruturados. */
export function breadcrumbJsonLd(itens: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE.dominio}${item.href}`,
    })),
  };
}
