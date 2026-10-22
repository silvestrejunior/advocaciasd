/**
 * Aplica o HTML pré-renderizado ao build de produção.
 *
 * Roda dentro do `build.command` (sem navegador): pega cada arquivo de
 * `prerender/`, troca as referências de assets pelas do build recém-gerado e
 * grava o resultado na saída estática, no caminho da respectiva rota.
 *
 * Uso:  pnpm build:static && node scripts/aplicar-prerender.mjs
 */

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist/public");
const ORIGEM = path.resolve("prerender");

const shell = await readFile(path.join(DIST, "index.html"), "utf8");

// Tags de asset do build atual (nomes com hash, diferentes a cada build).
const tags = shell.match(/<(?:script|link)\b[^>]*\/assets\/[^>]*>/g) ?? [];
const tagsCss = tags.filter((tag) => tag.startsWith("<link"));
// O `match` devolve só a tag de abertura: o fechamento é recomposto aqui —
// sem ele o navegador baixa o arquivo e não executa nada.
const tagsJs = tags
  .filter((tag) => tag.startsWith("<script"))
  .map((tag) => `${tag}</script>`);

if (tagsJs.length === 0) {
  throw new Error(
    "Nenhum script de /assets/ encontrado em dist/public/index.html — build inválido.",
  );
}

const TAG_PLATAFORMA = '<script src="/api/platform/config.js"></script>';

function preparar(html) {
  return html
    // remove os marcadores de edição visual da prévia, que não pertencem ao
    // HTML publicado (reduzem o arquivo e não têm uso em produção)
    .replace(/\sdata-loc="[^"]*"/g, "")
    // remove as referências antigas de assets (e o script da plataforma,
    // que é reinserido para não duplicar)
    .replace(/<link\b[^>]*\/assets\/[^>]*>/g, "")
    .replace(/<script\b[^>]*\/assets\/[^>]*><\/script>/g, "")
    .replace(/<script\b[^>]*\/api\/platform\/config\.js[^>]*><\/script>/g, "")
    .replace("</head>", `${tagsCss.join("\n")}\n</head>`)
    .replace("</body>", `${TAG_PLATAFORMA}\n${tagsJs.join("\n")}\n</body>`);
}

// A leitura é recursiva porque as rotas aninhadas (ex.: /blog/algum-artigo)
// ficam em subpastas dentro de prerender/.
const arquivos = (await readdir(ORIGEM, { recursive: true })).filter((nome) =>
  nome.endsWith(".html"),
);

for (const arquivo of arquivos) {
  const html = await readFile(path.join(ORIGEM, arquivo), "utf8");
  const pronto = preparar(html);

  if (arquivo === "index.html") {
    await writeFile(path.join(DIST, "index.html"), pronto, "utf8");
    console.log("prerender/index.html            -> dist/public/index.html");
    continue;
  }

  const destino = path.join(DIST, arquivo.replace(/\.html$/, ""), "index.html");
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, pronto, "utf8");
  console.log(`prerender/${arquivo.padEnd(32)} -> dist/public/.../index.html`);
}

console.log(`\n${arquivos.length} rotas com HTML pré-renderizado aplicado.`);
