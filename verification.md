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
---

# Verificação — campanha ACS e ACE pela EC 140/2026, 05/11/2026

Página nova em `/aposentadoria-acs-ace`, com identidade própria pedida no briefing (azul-chumbo #32414E, azul médio #0066AD, ciano #00AEEF apenas em elementos gráficos, fundo #F4F7F9, faixa escura #22303B e WhatsApp #1F8F4E), Sora nos títulos e Source Sans 3 no texto. As duas famílias vieram da origem oficial do Google Fonts e são servidas localmente em `/fonts-acs/`, com licenças OFL 1.1 no projeto; o Google Fonts não é requisitado em nenhum momento. Só esta rota pré-carrega as duas fontes latinas.

TypeScript sem erros e 38 rotas pré-renderizadas. No HTML entregue ao Google, sem executar JavaScript, a auditoria encontrou: título exato do briefing, descrição exata com 161 caracteres (um acima do limite em que o painel do Google apenas avisa), canônica `https://advocaciasd.com.br/aposentadoria-acs-ace` como pedido, `og:locale` pt_BR, `geo.region` BR-PR, `geo.placename` Maringá, robots indexável, um único H1, 12 H2, um único `main`, link interno para a página inicial e logo oficial com texto alternativo. As demais páginas seguem com canônica no domínio com www e sem metatags de geolocalização.

Os dados estruturados têm um único `LegalService`, agora com `areaServed` em Maringá e Paraná, telefone, e-mail, endereço e a identificação do advogado responsável; a página acrescenta um nó `WebPage` e o `FAQPage` com as 11 perguntas. As 11 respostas ficam no HTML com `hidden`, mantendo o acordeão visual e o conteúdo disponível para busca. São 5 links de WhatsApp, todos para `wa.me/5544998563465` com a mensagem pronta do briefing, e 3 links da fonte citada, todos abrindo em nova aba com `rel="noopener noreferrer"`. Há link para a Política de Privacidade e o aviso do Provimento 205/2021 com a menção à LGPD.

No teste funcional em navegador, com o rastreamento do Google bloqueado antes da navegação: em 390 px a largura do documento é igual à viewport, sem rolagem lateral, com a barra fixa de WhatsApp no rodapé do celular e fonte de leitura mínima de 17 px (o texto pequeno pedido no briefing, como a citação da fonte, fica em 15 px). No computador a barra fixa não aparece e o topo usa duas colunas. O caso de teste do briefing foi confirmado: mulher, 47 anos, 20 anos como agente e 22 de contribuição resulta em 2031 pela transição por idade (aos 52) e 2039 pela transição por pontos (aos 60), e o botão de envio abre o WhatsApp com o resultado preenchido. Com vínculo "Já sou aposentado" o resultado é trocado pela frase de revisão, e com contrato temporário aparece a nota de efetivação até 31/12/2028. Nenhum erro de execução foi registrado.

Os dados do escritório continuam vindo de `config/site.ts`, sem telefone, endereço ou OAB escritos na página. Não há formulário, promessa de resultado, depoimento, número de casos, preço ou honorário. A rota entrou no manifesto e no sitemap; a rota alternativa de campanha da saúde continua apenas no manifesto, fora do sitemap.

A conferência do texto jurídico contra o texto oficial da EC 140/2026 e contra o artigo indicado como fonte está em `docs/revisao-ec140-2026.md`. O texto da página foi publicado exatamente como recebido no briefing; os pontos em que a fonte citada diverge do texto oficial ficaram registrados para decisão do advogado antes da publicação. A canônica foi ajustada para o endereço com www a pedido do cliente, e a página foi publicada em 05/11/2026. No domínio oficial, o HTML entregue ao Google traz a canônica e o og:url em www.advocaciasd.com.br, um único H1, as 11 respostas do FAQ, a âncora do simulador, o aviso do Provimento 205/2021 e o preload da fonte local, sem qualquer requisição ao Google Fonts. Os 5 links de WhatsApp, os 3 links da fonte, o logotipo, os arquivos de fonte e os assets responderam HTTP 200; o sitemap traz a rota uma única vez; o endereço sem www responde 308 para o endereço com www; e o acesso com o agente do Google recebeu 200 com o conteúdo no HTML. O deploy da Vercel concluiu com sucesso. O link do artigo citado abre normalmente em navegador (o servidor do artigo recusa requisições automáticas de datacenter, o que não afeta o visitante).

Evidências locais: `/home/ubuntu/advocacia/acs-ace-2026-11-05/` (auditoria estática, testes funcionais e capturas em 390 e 1440 px).

## Ajustes de banner, botão flutuante e rodapé, 05/11/2026

A pedido do cliente, o banner principal passou a ser centrado e os nomes das duas categorias ficaram destacados no próprio H1 ("Agente Comunitário de Saúde" e "Agente de Endemias"), no azul institucional do site (#0066AD). O quadro escuro com a tabela das idades mínimas saiu do banner e passou a fechar a seção "O que mudou", sem perder nenhum dado. O botão de simulação virou o destaque do banner: fundo ciano, texto escuro, tamanho maior e o mesmo efeito pulsante usado nas outras páginas (classe `pulsar-cta`), ao lado do botão verde do WhatsApp.

O botão flutuante de WhatsApp passou a ser o componente compartilhado de todas as páginas, no lugar da barra fixa que existia só nesta rota. O rodapé agora é o mesmo das outras páginas (`SiteFooter`), mantendo acima dele a faixa com a fonte citada, o aviso do Provimento 205/2021 com a menção à LGPD e o link da Política de Privacidade.

Depois das mudanças: TypeScript sem erros, 38 rotas pré-renderizadas, auditoria estática sem falhas (canônica com www, H1 único, 11 respostas de FAQ no HTML, 12 H2) e testes funcionais aprovados. Em 390 px não há rolagem lateral, o botão flutuante aparece dentro da tela na posição fixa, a barra antiga deixou de existir, o texto de leitura segue em 17 px e as duas fontes da campanha carregam. No computador o flutuante aparece, o rodapé padrão está presente e o banner não usa mais duas colunas.

A versão ajustada foi publicada em 05/11/2026 no domínio oficial. No endereço público, o H1 aparece com os dois nomes destacados no azul institucional (#0066AD), o botão flutuante de WhatsApp está presente, o rodapé é o do site e o quadro das idades ficou dentro da seção "O que mudou". A página, o logotipo, o arquivo de fonte da campanha e o manifesto de rotas responderam HTTP 200, o sitemap segue com a rota uma única vez e o deploy da Vercel concluiu com sucesso. Nesta janela a rede do sandbox apresentou erros intermitentes de TLS também contra outros domínios, sem relação com o site do escritório: as verificações foram repetidas com nova tentativa e todas as respostas válidas voltaram 200.


## Correções pedidas pelo cliente em 06/11/2026

Na página de ACS e ACE saíram o quadro "Idade mínima na regra de transição" e o trecho riscado com a regra geral anterior (62 e 65 anos). A assinatura do escritório no cabeçalho passou a ser a mesma das outras páginas: o logotipo original com a escrita em Playfair Display ("Santana Daufenbach" + ADVOCACIA), visível também no celular, onde antes só aparecia o símbolo. O banner deixou de exibir nome, OAB e os quatro marcadores antigos e passou a mostrar só duas informações, com destaque no azul institucional: "Atendemos Servidores Públicos e INSS" e "Atendemos em todo o Brasil". As demais menções regionais do texto foram alinhadas a esse atendimento nacional (parágrafo do banner, FAQ, etapas e chamada final), mantendo as metatags geográficas para as buscas locais.

A mensagem pré-escrita dos botões desta página passou a ser "Quero falar com um advogado sobre a aposentadoria do ACS ou ACE.", inclusive no botão que envia a simulação, que agora começa por essa frase e acrescenta os dados simulados. Na página da aposentadoria especial da saúde a mensagem passou a ser "Sou da área da saúde e quero falar com um advogado sobre a minha Aposentadoria Especial.".

Validação após as correções: TypeScript sem erros, 38 rotas pré-renderizadas, auditoria estática sem falhas (com verificações específicas de que os conteúdos removidos não voltaram e de que todos os links de WhatsApp usam a mensagem combinada) e testes funcionais aprovados em 390 px e 1440 px.


## Acesso ao site principal no cabeçalho, 06/11/2026

O cabeçalho da página de ACS e ACE passou a levar também para a página principal do escritório, com o rótulo "Conheça nosso escritório!" destacado em azul institucional ao lado do botão do WhatsApp. O cabeçalho continua fixo no topo e acompanha a rolagem.

Para não sobrepor nem quebrar o espaçamento em telas menores, o rótulo e a assinatura se adaptam: abaixo de 375 px o cabeçalho mostra só o símbolo do logotipo com o rótulo curto "Escritório"; de 375 px a 767 px aparecem a assinatura completa (nome + ADVOCACIA) e o rótulo curto; a partir de 768 px entram o rótulo completo "Conheça nosso escritório!" e o botão do WhatsApp. Todas as transições foram medidas em doze larguras (320, 360, 375, 390, 412, 414, 480, 640, 768, 1024, 1280 e 1440 px): sem rolagem lateral, sem sobreposição entre logotipo, link e WhatsApp, sem texto cortado, cabeçalho em linha única e altura estável, e o link continua visível e clicável com a página rolada.

## Rodada de otimização — 06/11/2026

Auditoria externa (Lighthouse 13.6.0, 12 execuções em 6 rotas, mobile e desktop),
auditoria de links (38 rotas, 2.380 referências, 110 URLs) e auditoria de SEO
técnico (38 rotas). Correções aplicadas e conferidas no build local:

- Bundle inicial: 246 KB → 193 KB gzip (removido o aparato de API/autenticação do
  modelo e os componentes de toast/tooltip, que o site não usava).
- Imagens reotimizadas: 1.676 KB → 890 KB (economia de 786 KB); logotipos de
  interface em WebP de 128 px (53 KB → 3 KB e 28 KB → 1 KB).
- Largura e altura reais declaradas em todas as imagens das 38 rotas (26 pendências).
- CLS da rota /aposentadoria-acs-ace: 0,267 → 0,000 (fontes da campanha passaram a
  usar `font-display: optional`, como as demais fontes do site).
- Contraste do verde da campanha: #1F8F4E → #177A3F (5,4:1 com texto branco).
- Nome acessível do link da marca na campanha ajustado ao texto visível.
- Landmark <main> acrescentado em /servicos, /aposentadoria-especial e /ctc.
- LegalService de /aposentadoria-especial unificado ao nó do escritório.
- BlogPosting de /blog com author e publisher.
- Título e descrição da campanha dentro do limite (59 e 135 caracteres).
- Pré-carregamento do retrato do banner na home.

Verificação local (build de produção servido localmente): 7 rotas com HTTP 200, um
único h1, nenhuma imagem quebrada, sem imagem sem alt ou sem dimensões, links do
WhatsApp com mensagem pré-escrita e acordeão do FAQ abrindo normalmente. Medição com
rede e CPU lentas (1,6 Mbps, 150 ms, 4x CPU): CLS 0,0000 em /aposentadoria-acs-ace.

## Resultado publicado — 06/11/2026 (commit 5b3a6e2)

Medição no domínio oficial com a versão publicada (Lighthouse 13.6.0), comparada com a
medição anterior nas mesmas páginas:

| Página | Desempenho celular | Desempenho computador | Acessibilidade | CLS celular |
|---|---|---|---|---|
| Início | 60 → 76 | 76 → 89 | 100 | 0 |
| Aposentadoria especial (saúde) | 76 → 89 | 86 → 97 | 100 | 0 |
| Aposentadoria ACS e ACE | 65 → 88 | 76 → 95 | 96 → 100 | 0,267 → 0 |
| Aposentadoria especial | 81 → 87 | 86 → 94 | 98 → 100 | 0 |
| Serviços | 81 → 85 | 89 → 96 | 98 → 100 | 0 |
| Seu caso | 84 → 86 | 90 → 99 | 100 | 0 |

SEO técnico: 100 em todas as rotas medidas. Evidências em
/home/ubuntu/advocacia/auditoria-final-2026-11-06/pos-publicacao/.

## Correção da foto do banner — 06/11/2026 (commit 185299d)

A otimização anterior converteu o retrato do banner de RGBA para RGB e o fundo
transparente (53% da imagem) passou a aparecer preto. A imagem foi refeita a partir do
arquivo original, com transparência preservada e duas resoluções:

- /images/advogado-banner.webp — 720x995, RGBA, 151 KB (computador, 2x dos 360 px exibidos)
- /images/advogado-banner-600.webp — 600x829, RGBA, 108 KB (celular, 2x dos 300 px exibidos)

O banner passou a usar `srcset`/`sizes` e o pré-carregamento da home usa `imagesrcset`, de
modo que o celular baixa a variante de 600 px. Conferido no ar: variante correta por
tamanho de tela, alfa preservado e foto integrada ao fundo do banner. Home no celular:
desempenho 74, LCP 3,8 s, CLS 0 (antes da correção: 76 com a imagem defeituosa e 60 na
medição original).

## Prévia de `/como-pedir-aposentadoria` — 06/11/2026

A landing page mantém os textos e a paleta solicitados: hero com três cuidados antes do pedido, vídeo em fachada, seleção local de idade/rural/insalubridade, frase do escritório e rodapé legal. Usa o símbolo original e a mesma assinatura da marca existente no site. Sora e Source Sans 3 locais foram reutilizadas, corpo/legendas/aviso legal com pelo menos17px e botões com pelo menos48px. Botões verdes #1F8F4E com texto branco de20px/negrito, classificado como texto grande para contraste WCAG. Nenhuma promessa de resultado foi acrescentada ao texto.

Vídeo fornecido pelo cliente: https://www.youtube.com/shorts/KNg-vQ7uo3k. oEmbed oficial confirmou o canal SD Advocacia Previdenciária e a capa hq2.jpg, convertida em WebP de14.370bytes, sem recorte. A página oficial mostrou publicação24/03/2025, usada em uploadDate; duração desconhecida foi omitida. O Short conserva o conteúdo vertical dentro do quadro16:9 solicitado. Não há iframe inicial nem requisição ao player antes do clique. Após a interação, o player usa youtube-nocookie.com e não contém autoplay. O link alternativo, com o mesmo texto Assistir ao vídeo, aparece após abrir o player ou sem JavaScript, sem alterar a copy visível da fachada inicial.

TypeScript e build passaram, assim como21testes unitários de idades18..80, limites, inválidos e todas as combinações opcionais. Teste real de navegador em8larguras(320,375,390,480,640,768,1024,1440), no desenvolvimento e no build estático, confirmou ausência de scrollhorizontal, H1 único, controles>=48px, caso58/Sim/Não sei e bloqueio de idade vazia. Mensagem obtida literalmente: Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei no meio rural e não sei se trabalhei com insalubridade. Gostaria de orientação para o meu pedido. A idade vazia não abre WhatsApp nem dispara conversão; mostra Selecione sua idade e foca o select. As respostas não são persistidas nem incluídas no evento do Google; o único uso de localStorage é o consentimento global de cookies.

A revisão identificou e corrigiu duas falhas: o círculo flutuante entrava8px no botão de envio e a escrita do logo podia ultrapassar o retângulo externo depois do carregamento das fontes. O flutuante agora se afasta dos controles sem animação de posição, protegendo hero, seleção e cookies; percurso completo de rolagem não encontrou sobreposição com o envio. A assinatura foi dimensionada para a faixa mínima; nova medição incluiu seus filhos e cache aquecido nas8larguras e passou. Teste pontual confirmou ausência de sobreposição com cookies e rodapé e3links padrão para5544998563465 com3conversões locais para3cliques separados. O envio da seleção produz1conversão pela função única existente. Os testes bloquearam rastreamento externo e abertura real de mensagens; nenhuma mensagem foi enviada nem conversão real registrada.

SEO no HTML inicial: título e descrição literais, canonical https://advocaciasd.com.br/como-pedir-aposentadoria igual ao sitemap, OG/pt_BR, geoBR-PR/Maringá, LegalService único com advogado/OAB/endereço/telefone/e-mail/Maringá eParaná, WebPage e VideoObject com data confirmada. Manifesto válido de39rotas com somente path/title em cada item. As demais canônicas e os conteúdos das páginas antigas foram preservados. O título literal excede a recomendação editorial de60caracteres e foi mantido por solicitação expressa, sem prometer ranking.

Capturas finais da prévia visual: /home/ubuntu/advocacia/como-pedir-aposentadoria/previa-390.png e previa-1440.png. Evidências adicionais de teste no mesmo diretório.

**Não publicado.** Nenhum push para GitHub/Vercel nem chamada Publish desta campanha. O addon Manus continua recusando operações porque a recuperação do workspace não terminou, portanto não foi possível confirmar auto_publish para salvar um checkpoint remoto com segurança. A versão é preservada no Git local e a prévia visual é entregue em capturas. Prévia interativa e checkpoint registrado no Manus permanecem pendentes da recuperação; não são confundidos com publicação.

## Revisão final de textos e CTAs — 06/11/2026, após aprovação da prévia

A revisão manteve H1, três cuidados, frase do escritório, rótulos Assistir ao vídeo, Falar no WhatsApp, Enviar pelo WhatsApp e Conheça o escritório, além das mensagens pré-escritas e dados oficiais. Não foram introduzidas novas regras jurídicas, promessas de concessão, urgência artificial, preço ou resultado garantido.

O parágrafo do hero agora usa influenciam o valor em vez de definem o valor e explica a análise de histórico/documentos antes do pedido, evitando sugerir uma lista exaustiva de fatores ou conferência absoluta. O aviso da seleção esclarece que as respostas não são gravadas na página e que o clique apenas abre uma mensagem preparada: o próprio visitante confere e envia pelo WhatsApp. A mensagem padrão e o resultado de58/Sim/Não sei permaneceram idênticos. Revisão editorial, não parecer de conformidade jurídica.

21 testes unitários passaram novamente. Verificação pontual no navegador confirmou os3contatos para5544998563465, uma conversão local por clique, ausência de sobreposição com cookies/envio/rodapé e viewport sem bloqueio de zoom. Rastreamento real bloqueado e nenhum envio real. Os controles e o fluxo não mudaram; não houve uma nova auditoria global de todas as páginas.

O cliente autorizou publicar quando o addon Manus estiver normalizado. A consulta atual ainda retornou Addon manus-webdev is not ready: its workspace recovery has not completed. A publicação e os pushes que a disparariam não foram efetuados, respeitando essa condição. O catálogo de Triggers foi consultado de forma focada e depois completo: não há evento de recuperação do addon/WebDev. Não há um endpoint público confirmado para monitorar essa condição; nenhum Trigger, script de monitoramento nem agendamento recorrente foi criado. A autorização foi registrada, mas não existe retomada automática configurada. Será necessária a retomada da tarefa após a recuperação. A revisão permanece no Git local, sem afirmar checkpoint registrado.

## Verificação e publicação da campanha — 07/11/2026

O addon respondeu normalmente à leitura de configuração (revisão7) e a publicação automática continua desativada, portanto a condição de deploy combinada com o cliente foi atendida.

Responsividade de `/como-pedir-aposentadoria` confirmada em8larguras (320, 375, 390, 480, 640, 768, 1024 e 1440) no desenvolvimento e no build estático: sem rolagem horizontal, um único H1, nenhum iframe antes do clique, controles com pelo menos48px (envio com52px de altura) e flutuante sem sobreposição com os controles. Capturas revisadas em320, 390 e no bloco de vídeo; o Short permanece com faixas laterais dentro do quadro16:9, sem autoplay. Seleção bloqueia idade vazia, foca o campo e não dispara conversão; mensagem de58/Sim/Não sei idêntica à aprovada; uma conversão por clique.

Auditoria de links e WhatsApp das39rotas ativas no build local: 39rotas em2xx/3xx, 2408referências e203links de WhatsApp para5544998563465, sem link interno ou ativo quebrado. Quatro ocorrências foram analisadas e nenhuma é defeito do site: três são o mesmo destino externo que responde403 a requisições automatizadas por proteção antibot (o artigo já havia sido aberto com sucesso em navegador real) e uma é a canônica da própria rota nova, que respondia404 por ainda não estar publicada. A verificação deve ser repetida no domínio oficial após o deploy.

### Resultado publicado — 07/11/2026 (commit 57456fe)

Checkpoint registrado na main canônica e enviado para a main de produção (Vercel), além da publicação na hospedagem do projeto (versão57456fe). A rota respondeu200 já na primeira checagem: título e descrição literais, canônica `https://advocaciasd.com.br/como-pedir-aposentadoria` igual ao sitemap, um único H1, sem iframe antes do clique, sem bloqueio de zoom, capa do vídeo e fontes locais em200, e as páginas `/`, `/aposentadoria-especial-saude` e `/aposentadoria-acs-ace` preservadas em200.

Auditoria de links e WhatsApp no domínio oficial: 39rotas em2xx/3xx, 2408referências, 203links de WhatsApp para5544998563465 e destino do WhatsApp confirmado (`wa.me` → `api.whatsapp.com/send`). A nova rota tem3contatos, todos com a mensagem aprovada, e nenhum problema. Restaram apenas3ocorrências do mesmo destino externo que responde403 a requisições automatizadas por proteção antibot, já verificado em navegador real; não são links quebrados. A checagem inicial do sitemap era falso negativo porque o arquivo usa a forma canônica sem www, e a verificação foi corrigida.
