# Verificação — avaliação final da página de profissionais da saúde, 03/11/2026

## Aposentadoria especial na saúde

O TypeScript (`pnpm check`) e o build estático (`pnpm build:static`) concluíram sem erros. A rota está no manifesto `client/public/manus-routes.json` e no `client/public/sitemap.xml`; a pré-renderização concluiu as 36 rotas.

O HTML pré-renderizado foi conferido sem navegador: título de 59 caracteres, descrição de 129, canonical no domínio oficial, robots indexável, Open Graph/Twitter com imagem própria do hospital, 1 H1, 8 H2, 21 H3, 12 imagens com `alt` e todos os seis textos de resposta do FAQ presentes no HTML. O FAQ mantém o acordeão visual, com `hidden`, `aria-controls` e `aria-labelledby`; o clique foi testado no navegador e abriu a resposta correta.

O Schema agora tem um único `LegalService` com CEP `87020-015`; a página usa esse nó por `provider`, e o JSON-LD foi validado como JSON. As afirmações sobre a idade mínima foram conferidas na notícia oficial do STF sobre a ADI 6309 e o Tema 383 foi conferido na página oficial da TNU/CJF. O resumo foi ajustado para não sugerir que o EPI eficaz deixou de ser relevante em toda situação.

Capturas visuais em desktop (1440 px) e celular (390 px) não mostraram deformação, overflow horizontal ou quebra de composição. A prévia continua local e nenhuma alteração foi publicada.

---

# Verificação — refinamento da home, 22/10/2026

O pedido mantém a identidade azul e o site existente, alterando banner, entrada por situação, apresentação da atuação, cards complementares e seção de vídeo. Escritório, mapa, artigos, perguntas e contatos permanecem.

TypeScript sem erros (`pnpm exec tsc --noEmit --incremental false`), build estático concluído e 28 rotas pré-renderizadas. O diff não apresenta erros de whitespace.

Responsividade conferida em 320, 375, 414, 768 e 1440 pixels: largura do documento igual à viewport, foto carregada, `object-fit: contain`, sem deformação ou overflow horizontal. A legenda traz a frase pedida, o nome completo, a OAB e atendimento em todo o Brasil. O WhatsApp flutuante, apenas na home móvel, não cobre o banner: reaparece ao sair da primeira seção; a chamada direta abaixo da foto permanece disponível. Desktop mantém o flutuante.

A primeira rodada identificou o aviso React #418 por tentar hidratar um snapshot capturado de navegador. A entrada foi corrigida para montagem normal sobre o HTML inicial, que continua completo para leitura e busca sem JavaScript. A rodada final de desktop/celular não registrou erros de execução.

Uma única seção do canal, no lugar das quatro etapas da home. Vídeo confirmado pelo cliente: `https://www.youtube.com/shorts/8tRtrJsjv_Q`, player 9:16, URL centralizada em `SITE.youtubeVideoDestaque`, lazy loading, sem autoplay e link direto de alternativa. O endereço de incorporação respondeu HTTP 200 e o player apresentou a miniatura real no navegador. A troca manual está documentada em `docs/video-destaque.md`; vídeos convencionais usam 16:9.

Revisão somente leitura confirmou destinos reais para os três casos, oito benefícios compactos e as âncoras `cuidados#inss` e `cuidados#alem`. Conteúdo de cuidados e etapas de outras páginas não foi retirado: a substituição solicitada aplica-se à home.

Capturas locais de conferência: `/home/ubuntu/advocacia/verificacao-home-refinada/` (não fazem parte do site publicado). O arquivo de resultados registra a checagem técnica.
