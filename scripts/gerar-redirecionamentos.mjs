/**
 * Gera as páginas de redirecionamento dos endereços antigos do site.
 *
 * O domínio www.advocaciasd.com.br já teve um site com outros endereços, que
 * podem estar salvos em favoritos, em links de terceiros e no índice do Google.
 * Como a hospedagem é estática, não há como emitir um 301 de servidor; cada
 * endereço antigo recebe uma página própria que declara o destino com
 * `canonical` e redireciona (meta refresh + JavaScript + link visível).
 *
 * Uso:  node scripts/gerar-redirecionamentos.mjs
 * Roda depois de `aplicar-prerender.mjs`, dentro do build.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist/public");
const ORIGEM = "https://www.advocaciasd.com.br";

/**
 * Endereços que existiram no site anterior e para onde vão agora.
 * O /ctc continua existindo com o mesmo nome e não aparece aqui.
 */
const REDIRECIONAMENTOS = [
  { de: "/prev", para: "/servicos", motivo: "Direito Previdenciário" },
  { de: "/previdenciario", para: "/servicos", motivo: "Direito Previdenciário" },
  { de: "/iss", para: "/", motivo: "ISS e saneamento" },
];

const pagina = ({ de, para, motivo }) => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Redirecionando… | Santana Daufenbach Advocacia</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${ORIGEM}${para}" />
    <meta http-equiv="refresh" content="0; url=${para}" />
    <script>window.location.replace(${JSON.stringify(para)});</script>
    <style>
      body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 0; padding: 48px 24px; color: #0a2a4a; }
      a { color: #0e7490; }
    </style>
  </head>
  <body>
    <p>
      O conteúdo de <strong>${motivo}</strong> agora está em
      <a href="${para}">${ORIGEM}${para}</a>.
    </p>
    <p>Se o navegador não redirecionar, use o link acima.</p>
    <p>Endereço anterior: ${de}</p>
  </body>
</html>
`;

for (const item of REDIRECIONAMENTOS) {
  const destino = path.join(DIST, item.de.replace(/^\//, ""), "index.html");
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, pagina(item), "utf8");
  console.log(`${item.de.padEnd(18)} -> ${item.para}`);
}

console.log(`${REDIRECIONAMENTOS.length} redirecionamentos gravados`);