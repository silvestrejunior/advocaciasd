/**
 * Pré-renderização das rotas do site.
 *
 * O site é uma SPA: sem isto, o HTML que o Google recebe é uma div vazia. Este
 * script roda **apenas no ambiente de desenvolvimento** (precisa de um navegador
 * headless), abre cada rota do build já pronto, espera o React renderizar e
 * salva o HTML resultante em `prerender/`.
 *
 * Esses arquivos são versionados e o build de produção apenas os copia para a
 * saída, trocando as referências de assets pelas do build atual — por isso o
 * `build.command` não abre navegador nenhum.
 *
 * Uso:  pnpm build:static && node scripts/prerender.mjs
 */

import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const DIST = path.resolve("dist/public");
const SAIDA = path.resolve("prerender");
const PORTA = 4788;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const servidor = createServer(async (req, res) => {
  const caminho = decodeURIComponent(
    new URL(req.url ?? "/", "http://local").pathname,
  );
  const alvo = path.join(DIST, caminho);
  try {
    const dados = await readFile(alvo);
    res.writeHead(200, {
      "content-type": TIPOS[path.extname(alvo)] ?? "application/octet-stream",
    });
    res.end(dados);
  } catch {
    // Rota do app: devolve o shell, como o servidor publicado faz.
    const shell = await readFile(path.join(DIST, "index.html"));
    res.writeHead(200, { "content-type": TIPOS[".html"] });
    res.end(shell);
  }
});

const { routes } = JSON.parse(
  await readFile("client/public/manus-routes.json", "utf8"),
);

await mkdir(SAIDA, { recursive: true });
await new Promise((resolve) => servidor.listen(PORTA, resolve));

const navegador = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const pagina = await navegador.newPage();
await pagina.setViewport({ width: 1280, height: 900 });

let total = 0;
for (const rota of routes) {
  const url = `http://localhost:${PORTA}${rota.path}`;
  await pagina.goto(url, { waitUntil: "networkidle2" });
  // Dá tempo para o componente de SEO aplicar título, canônica e dados
  // estruturados antes de capturamos o HTML.
  await pagina.evaluate(
    () => new Promise((resolve) => setTimeout(resolve, 350)),
  );

  const html = await pagina.content();
  // O nome do arquivo mantém a estrutura da rota (ex.: blog/algum-artigo.html)
  // para que o build grave cada página no caminho correto.
  const arquivo =
    rota.path === "/"
      ? "index.html"
      : `${rota.path.replace(/^\//, "")}.html`;
  await mkdir(path.dirname(path.join(SAIDA, arquivo)), { recursive: true });
  await writeFile(path.join(SAIDA, arquivo), html, "utf8");

  const titulo = await pagina.title();
  console.log(
    `${rota.path.padEnd(34)} -> prerender/${arquivo.padEnd(38)} ${String(html.length).padStart(7)} bytes | ${titulo}`,
  );
  total += 1;
}

await navegador.close();
servidor.close();
console.log(`\n${total} rotas pré-renderizadas em prerender/`);
