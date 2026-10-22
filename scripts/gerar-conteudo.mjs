/**
 * Gera os artefatos de conteúdo a partir dos artigos do blog.
 *
 *   1. client/src/data/blog/artigos.json — todos os artigos em um único
 *      arquivo, do mais recente para o mais antigo. É a fonte das páginas.
 *   2. client/public/manus-routes.json — manifesto de rotas do site, incluindo
 *      /blog e cada artigo (o script de pré-renderização lê este arquivo).
 *   3. client/public/sitemap.xml — mesmas rotas, no formato do sitemap.
 *
 * Uso:  node scripts/gerar-conteudo.mjs
 * Sempre que um artigo novo for criado, rode este script antes do build.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PASTA_BLOG = "client/src/data/blog";
const CAMPOS = [
  "slug",
  "titulo",
  "resumo",
  "publicado",
  "tema",
  "servico",
  "palavrasChave",
  "secoes",
  "perguntas",
];

/** Rotas que não vêm do blog. A ordem é a ordem em que aparecem no site. */
const ROTAS_BASE = [
  { path: "/", title: "Início" },
  { path: "/seu-caso", title: "Descubra o seu caso" },
  { path: "/servicos", title: "Serviços" },
  { path: "/cuidados", title: "Cuidados antes de pedir" },
  { path: "/aposentadoria-especial", title: "Aposentadoria especial" },
  { path: "/aposentadoria-negada", title: "Aposentadoria negada" },
  { path: "/pericia-negada", title: "Perícia negada" },
  { path: "/beneficios-por-incapacidade", title: "Benefícios por incapacidade" },
  { path: "/auxilio-acidente", title: "Auxílio-acidente" },
  { path: "/tempo-rural", title: "Tempo rural" },
  { path: "/servidores-publicos", title: "Servidores públicos" },
  { path: "/planejamento-de-aposentadoria", title: "Planejamento de aposentadoria" },
  { path: "/perdeu-o-beneficio", title: "Perdeu o benefício" },
  { path: "/revisao-de-aposentadoria", title: "Revisão de aposentadoria" },
  { path: "/como-funciona", title: "Como funciona" },
  { path: "/sobre", title: "Sobre o escritório" },
  { path: "/contato", title: "Contato" },
  { path: "/ctc", title: "Certidão de tempo de contribuição" },
];

const ORIGEM = "https://advsdprev-p9xr5zpa.manus.space";

/* ---------------------------------------------------------------- artigos */

const arquivos = (await readdir(PASTA_BLOG)).filter(
  (nome) => nome.endsWith(".json") && nome !== "artigos.json",
);

const artigos = [];
for (const arquivo of arquivos) {
  const bruto = JSON.parse(await readFile(path.join(PASTA_BLOG, arquivo), "utf8"));
  for (const campo of CAMPOS) {
    if (!(campo in bruto)) throw new Error(`${arquivo}: falta o campo "${campo}"`);
  }
  if (bruto.resumo.length > 160) {
    throw new Error(`${arquivo}: resumo com ${bruto.resumo.length} caracteres (limite 160)`);
  }
  if (!Array.isArray(bruto.secoes) || bruto.secoes.length < 3) {
    throw new Error(`${arquivo}: são esperadas pelo menos 3 seções`);
  }
  const palavras =
    bruto.secoes
      .flatMap((s) => [...(s.paragrafos ?? []), ...(s.lista ?? [])])
      .join(" ")
      .split(/\s+/).length +
    bruto.perguntas.map((p) => `${p.pergunta} ${p.resposta}`).join(" ").split(/\s+/).length;
  if (palavras < 500) {
    console.warn(`aviso: ${arquivo} tem apenas ${palavras} palavras`);
  }
  artigos.push({ ...bruto, palavras });
}

artigos.sort((a, b) =>
  a.publicado === b.publicado ? a.titulo.localeCompare(b.titulo) : a.publicado < b.publicado ? 1 : -1,
);

if (artigos.length === 0) {
  throw new Error("nenhum artigo encontrado em " + PASTA_BLOG);
}

await writeFile(
  path.join(PASTA_BLOG, "artigos.json"),
  JSON.stringify(
    artigos.map(({ palavras, ...artigo }) => ({ ...artigo, palavras })),
    null,
    2,
  ) + "\n",
  "utf8",
);

console.log(`${artigos.length} artigos agrupados em artigos.json`);

/* ------------------------------------------------------- rotas e sitemap */

const rotas = [
  ROTAS_BASE[0],
  ROTAS_BASE[1],
  ROTAS_BASE[2],
  ...ROTAS_BASE.slice(3),
  { path: "/blog", title: "Conteúdo" },
  ...artigos.map((artigo) => ({ path: `/blog/${artigo.slug}`, title: artigo.titulo })),
];

await writeFile(
  "client/public/manus-routes.json",
  JSON.stringify({ routes: rotas }, null, 2) + "\n",
  "utf8",
);

const url = (rota, prioridade, frequencia, lastmod) => `  <url>
    <loc>${ORIGEM}${rota}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${frequencia}</changefreq>
    <priority>${prioridade}</priority>
  </url>`;

const ultimaAtualizacao = artigos[0]?.publicado ?? "2026-10-22";
const hoje = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  url("/", "1.0", "weekly", hoje),
  ...ROTAS_BASE.slice(1).map((rota) =>
    url(rota.path, rota.path === "/servicos" || rota.path === "/cuidados" ? "0.9" : "0.8", "monthly", hoje),
  ),
  url("/blog", "0.9", "weekly", ultimaAtualizacao),
  ...artigos.map((artigo) => url(`/blog/${artigo.slug}`, "0.7", "monthly", artigo.publicado)),
].join("\n")}
</urlset>
`;

await writeFile("client/public/sitemap.xml", sitemap, "utf8");

console.log(`${rotas.length} rotas no manifesto e no sitemap`);