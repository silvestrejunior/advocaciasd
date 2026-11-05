import { useEffect } from "react";
import { SITE } from "@/config/site";

type SeoProps = {
  /** Título da aba e do resultado no Google (sem o nome do escritório). */
  titulo: string;
  /** Meta descrição: o texto que aparece abaixo do título na busca. */
  descricao: string;
  /** Caminho da rota, começando com barra. Ex.: "/servicos". */
  caminho: string;
  tipo?: "website" | "article";
  /** Página que não deve ser indexada (ex.: rota inexistente). */
  noindex?: boolean;
  /** Termos da página, entre 3 e 8, separados por vírgula. */
  palavrasChave?: string;
  /** Imagem de compartilhamento própria da página. */
  imagem?: string;
  /** Texto alternativo e dimensões da imagem de compartilhamento. */
  imagemAlt?: string;
  imagemLargura?: number;
  imagemAltura?: number;
  /** Dados estruturados (schema.org) específicos da página. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /**
   * Origem pública usada na canônica e no og:url quando a página tem endereço
   * próprio. Sem esta prop, vale o domínio principal do site.
   */
  origemCanonica?: string;
  /** Região e cidade para as metatags de geolocalização. */
  geo?: { regiao: string; cidade: string };
  /** Área de atendimento declarada no LegalService do escritório. */
  areaAtendimento?: { tipo: "City" | "State" | "Country"; nome: string }[];
};

/** Teto do título completo: acima disto o Google costuma cortar o texto. */
const LIMITE_TITULO = 60;

/**
 * Monta o título completo.
 *
 * Quando o título da página já é longo, o nome do escritório sai para o
 * resultado não ser cortado na busca — o que importa é a parte que descreve
 * a página.
 */
export function tituloCompleto(titulo: string, nome: string = SITE.nome) {
  const comMarca = `${titulo} | ${nome}`;
  return comMarca.length <= LIMITE_TITULO ? comMarca : titulo;
}

function upsertMeta(attr: "name" | "property", chave: string, valor: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${chave}"]`
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
  palavrasChave,
  imagem,
  imagemAlt,
  imagemLargura,
  imagemAltura,
  jsonLd,
  origemCanonica,
  geo,
  areaAtendimento,
}: SeoProps) {
  useEffect(() => {
    const completo = tituloCompleto(titulo);
    const origem = origemCanonica ?? SITE.dominio;
    const url = `${origem}${caminho}`;
    const imagemPagina = imagem
      ? `${SITE.dominio}${imagem}`
      : `${SITE.dominio}/images/og-image.jpg`;
    const larguraImagem = imagemLargura ?? 1200;
    const alturaImagem = imagemAltura ?? 630;
    const textoAlternativoImagem = imagemAlt ?? `${SITE.nomeCompleto}`;

    document.title = completo;
    upsertMeta("name", "description", descricao);
    if (palavrasChave) upsertMeta("name", "keywords", palavrasChave);
    upsertMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1"
    );
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", tipo);
    upsertMeta("property", "og:site_name", SITE.nomeCompleto);
    upsertMeta("property", "og:title", completo);
    upsertMeta("property", "og:description", descricao);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imagemPagina);
    upsertMeta("property", "og:image:alt", textoAlternativoImagem);
    upsertMeta("property", "og:image:width", String(larguraImagem));
    upsertMeta("property", "og:image:height", String(alturaImagem));
    upsertMeta("property", "og:locale", "pt_BR");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", completo);
    upsertMeta("name", "twitter:description", descricao);
    upsertMeta("name", "twitter:image", imagemPagina);
    upsertMeta("name", "twitter:image:alt", textoAlternativoImagem);

    // Geolocalização: declarada nas páginas que atendem uma região específica.
    // Fora delas, as marcas são removidas para não vazar para outras rotas.
    if (geo) {
      upsertMeta("name", "geo.region", geo.regiao);
      upsertMeta("name", "geo.placename", geo.cidade);
    } else {
      document.head.querySelector('meta[name="geo.region"]')?.remove();
      document.head.querySelector('meta[name="geo.placename"]')?.remove();
    }

    const marcaId = "jsonld-pagina";
    document.getElementById(marcaId)?.remove();

    const blocos = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.dominio}/#site`,
        name: SITE.nomeCompleto,
        alternateName: SITE.nome,
        url: SITE.dominio,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE.dominio}/#escritorio` },
      },
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "@id": `${SITE.dominio}/#escritorio`,
        name: SITE.nomeCompleto,
        url: SITE.dominio,
        logo: `${SITE.dominio}/images/favicon-512.png`,
        image: [`${SITE.dominio}/images/og-image.jpg`],
        telephone: `+${SITE.whatsapp}`,
        email: SITE.email,
        openingHours: "Mo-Fr 09:00-17:00",
        areaServed: areaAtendimento
          ? areaAtendimento.map(area => ({
              "@type": area.tipo,
              name: area.nome,
            }))
          : { "@type": "Country", name: "Brasil" },
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
          streetAddress:
            "Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2",
          addressLocality: "Maringá",
          addressRegion: "PR",
          postalCode: "87020-015",
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
  }, [
    titulo,
    descricao,
    caminho,
    tipo,
    jsonLd,
    noindex,
    palavrasChave,
    imagem,
    imagemAlt,
    imagemLargura,
    imagemAltura,
    origemCanonica,
    geo,
    areaAtendimento,
  ]);

  return null;
}

/** Gera o bloco de perguntas frequentes para os dados estruturados. */
export function faqJsonLd(perguntas: { pergunta: string; resposta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map(p => ({
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
