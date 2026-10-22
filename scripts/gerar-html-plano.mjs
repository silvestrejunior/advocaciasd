/**
 * Gera a variante `.html` de cada página, além do `index.html` de cada pasta.
 *
 * A hospedagem estática resolve um endereço sem extensão de duas formas
 * possíveis: pelo `index.html` da pasta (`/blog` -> `/blog/index.html`) ou pelo
 * arquivo com extensão (`/blog` -> `/blog.html`). Como as duas formas não
 * podem ser testadas antes de publicar, o build grava as duas — é um arquivo a
 * mais por página, e garante que o HTML pré-renderizado de cada rota seja o
 * que chega ao navegador e ao robô de busca.
 *
 * Uso:  node scripts/gerar-html-plano.mjs   (depois de aplicar o pré-render)
 */

import { readdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist/public");
/** Pastas que não são páginas do site. */
const IGNORAR = new Set(["assets", "images", "api", "__manus__", "node_modules"]);

const arquivos = (await readdir(DIST, { recursive: true })).filter(
  (nome) => nome.endsWith("index.html") && nome !== "index.html",
);

let total = 0;
for (const arquivo of arquivos) {
  const pasta = path.dirname(arquivo);
  if (IGNORAR.has(pasta.split(path.sep)[0])) continue;

  const destino = path.join(DIST, `${pasta}.html`);
  const info = await stat(destino).catch(() => null);
  if (info) continue;

  await copyFile(path.join(DIST, arquivo), destino);
  total += 1;
}

console.log(`${total} páginas também gravadas na forma .html`);