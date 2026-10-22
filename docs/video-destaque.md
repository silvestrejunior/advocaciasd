# Vídeo em destaque na página inicial

A troca é manual. No repositório `silvestrejunior/advocaciasd`, edite `client/src/config/site.ts`, no campo `youtubeVideoDestaque`. Substitua somente a URL entre aspas. O vídeo inicial é `https://www.youtube.com/shorts/8tRtrJsjv_Q`.

Links de Shorts abrem em um player vertical 9:16. Links `youtube.com/watch?v=...` ou `youtu.be/...` abrem em 16:9. O componente preserva a proporção, não inicia a reprodução sozinho e inclui um link para assistir diretamente no YouTube. Se o proprietário desativar a incorporação, esse link continua disponível.

O site entrega HTML pré-renderizado. Portanto, após mudar o link, também é necessário atualizar o HTML da home, não apenas a configuração. O fluxo completo no ambiente de desenvolvimento, com Chromium disponível, é:

```bash
pnpm install --frozen-lockfile
pnpm build:static
node scripts/prerender.mjs
node scripts/aplicar-prerender.mjs
node scripts/gerar-redirecionamentos.mjs
node scripts/gerar-html-plano.mjs
```

Envie a configuração e a pasta `prerender/` atualizadas para a branch `main`. O Vercel executa o build configurado e publica no domínio. Se preferir, envie o novo link na conversa do projeto para que essa atualização seja feita mantendo o layout.

Não há atualização automática do vídeo nem painel administrativo nesta versão estática do site.
