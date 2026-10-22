# Verificação — refinamento da home, 22/10/2026

O pedido mantém a identidade azul e o site existente, alterando banner, entrada por situação, apresentação da atuação, cards complementares e seção de vídeo. Escritório, mapa, artigos, perguntas e contatos permanecem.

TypeScript sem erros (`pnpm exec tsc --noEmit --incremental false`), build estático concluído e 28 rotas pré-renderizadas. O diff não apresenta erros de whitespace.

Responsividade conferida em 320, 375, 414, 768 e 1440 pixels: largura do documento igual à viewport, foto carregada, `object-fit: contain`, sem deformação ou overflow horizontal. A legenda traz a frase pedida, o nome completo, a OAB e atendimento em todo o Brasil. O WhatsApp flutuante, apenas na home móvel, não cobre o banner: reaparece ao sair da primeira seção; a chamada direta abaixo da foto permanece disponível. Desktop mantém o flutuante.

A primeira rodada identificou o aviso React #418 por tentar hidratar um snapshot capturado de navegador. A entrada foi corrigida para montagem normal sobre o HTML inicial, que continua completo para leitura e busca sem JavaScript. A rodada final de desktop/celular não registrou erros de execução.

Uma única seção do canal, no lugar das quatro etapas da home. Vídeo confirmado pelo cliente: `https://www.youtube.com/shorts/8tRtrJsjv_Q`, player 9:16, URL centralizada em `SITE.youtubeVideoDestaque`, lazy loading, sem autoplay e link direto de alternativa. O endereço de incorporação respondeu HTTP 200 e o player apresentou a miniatura real no navegador. A troca manual está documentada em `docs/video-destaque.md`; vídeos convencionais usam 16:9.

Revisão somente leitura confirmou destinos reais para os três casos, oito benefícios compactos e as âncoras `cuidados#inss` e `cuidados#alem`. Conteúdo de cuidados e etapas de outras páginas não foi retirado: a substituição solicitada aplica-se à home.

Capturas locais de conferência: `/home/ubuntu/advocacia/verificacao-home-refinada/` (não fazem parte do site publicado). O arquivo de resultados registra a checagem técnica.
