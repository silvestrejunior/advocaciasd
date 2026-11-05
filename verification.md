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

---

# Verificação — usabilidade mobile e estabilidade, 05/11/2026

As correções preservam o conteúdo jurídico, as imagens, a identidade azul profunda, as mensagens de WhatsApp e o canonical `/aposentadoria-especial-saude` da rota de campanha `/aposentadoria-saude`.

O aviso de cookies passou a ocupar uma faixa acima da área completa do WhatsApp, com separação definida em CSS e respeito às safe areas. Não há medição tardia de altura por JavaScript. Em 320, 390, 430, 768, 1024 e 1440 px, não houve interseção entre os dois componentes nem overflow horizontal. Os centros de Recusar e Aceitar ficaram acessíveis por clique real e ambos mediram 44 px de altura. Recusa persistiu após reload e aceitação foi confirmada em contexto de teste. Rastreamento Google foi bloqueado, sem conversões reais.

Menu móvel, FAQ por Enter e foco visível passaram. O menu tem controle 44×44 px; rodapé usa 44 px de altura mínima no mobile e 32 px no desktop. Links específicos de mudanças, situações e temas da página também ganharam área de toque. O nome acessível do flutuante agora coincide com “Fale no WhatsApp”. A página possui um único marco `<main>`.

A viewport inicial é `width=device-width, initial-scale=1.0`, sem `maximum-scale` ou `user-scalable=no`. A emulação CDP atingiu escala 2 nas seis larguras. Isso confirma configuração e emulação, não substitui teste de pinch em aparelho físico nem Safari/iOS.

As fontes Playfair Display e Inter agora são WOFF2 locais, variáveis, com licenças OFL e fontes documentadas em `client/public/fonts/SOURCES.md`. Apenas Playfair Latin, que já inclui os acentos portugueses, é pré-carregada. Inter fica disponível para páginas que a utilizam, sem alterar a fonte sans do corpo da rota de saúde. `font-display: optional` evita uma troca tardia: em uma conexão lenta pode permanecer o fallback naquela visita. Não foi ocultado o conteúdo nem introduzida espera JavaScript por fontes. Google Fonts não é mais requisitado. Todas as 12 imagens da rota têm dimensões explícitas, incluindo logos, hero e cards.

O observador de layout registrou CLS 0 nas seis larguras. Em testes adicionais com as requisições das fontes atrasadas em 3 segundos, CLS continuou 0 em 390 e 768 px. A primeira revisão Lighthouse, com três coletas mobile e uma desktop do build de produção local, também registrou CLS 0, acessibilidade 100/100 e SEO automático 100/100 em todas as coletas. `color-contrast`, `target-size`, `meta-viewport` e `unsized-images` passaram. Contrastes relevantes calculados: WhatsApp 9,53:1; CTA ciano 10,45:1; ciano sobre branco 5,36:1.

Essa revisão inicial mediu LCP mobile mediano de 4,63 s e desempenho 82/100 no laboratório local. O servidor já comprime CSS e JS com gzip; portanto o resultado não foi atribuído incorretamente à falta de compressão. Há oportunidade de otimização do JavaScript e da remontagem interativa do HTML; esses resultados locais não são diretamente comparáveis aos testes anteriores no domínio público nem equivalem a dados reais do CrUX/INP. Os preloads das fotos da home foram removidos das páginas internas na etapa de aplicação dos snapshots, e as duas rotas de saúde agora pré-carregam somente sua foto hospitalar e a fonte crítica. A home preserva seus dois preloads responsivos.

`pnpm check`, build estático e pré-renderização concluíram; 37 rotas foram regeneradas. A aplicação dos snapshots mantém a tag Google, os metadados e os nomes de assets do build atual. As correções foram verificadas em build local, não no domínio publicado. Publicação automática permanece desligada; não houve push para a main da Vercel, publicação ou alteração de DNS/certificado nesta etapa.

Evidências locais: `/home/ubuntu/advocacia/correcoes-mobile-2026-11-05/usabilidade.json`, capturas representativas no mesmo diretório e relatórios Lighthouse nas subpastas `lighthouse` e `lighthouse-final`.

**Ressalva de instrumentação:** a subpasta `lighthouse-final` contém uma rodada intermediária inválida para comparação com rastreamento bloqueado: o CLI recebeu os padrões concatenados como um único filtro. A tag Google conseguiu executar e poderá ter registrado três visualizações da URL local. Não houve clique, envio de dados de cliente ou conversão de WhatsApp. Essa rodada continua mostrando CLS 0, mas seus indicadores de desempenho incluem terceiros e não compõem as medianas da validação final. O instrumento foi corrigido para sete argumentos separados e a rodada final válida fica em `lighthouse-final-valid`, com transferência de terceiros conferida como zero nos JSONs.

**Rodada final válida, após correção dos preloads:** três medições mobile confirmaram CLS 0, acessibilidade 100/100 e SEO automático 100/100; desempenho mediano 82/100, LCP 4,598 s, FCP 0,965 s e TBT 129 ms. Os sete bloqueios de terceiros foram conferidos no `configSettings` e a transferência externa foi zero em cada coleta. A redução de preloads não foi apresentada como solução suficiente para o LCP: otimização de JavaScript e revalidação no domínio após publicação permanecem recomendadas. A meta de estabilidade foi atingida nestas medições locais, não garantida universalmente.
