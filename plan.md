# Plano — site de captação Santana Daufenbach Advocacia

Especificação de origem: `/home/ubuntu/advocacia/reformulacao/prompt-handoff-site.md` (aprovada pelo cliente).
Implementação de referência já validada: `/home/ubuntu/advocaciasd-pr` (mesmo escritório, mesma linguagem).

## Objetivo

Site institucional de captação para escritório de Direito Previdenciário em Maringá/PR. Capta quem
está com um problema previdenciário agora — aposentadoria a dar entrada, benefício negado, benefício
cessado, revisão — e transmite segurança de que o escritório sabe **o que precisa ser analisado** no
caso concreto. Regra que orienta tudo: as regras jurídicas são conhecimento básico; os pontos
práticos, as preocupações e os cuidados atraem o cliente.

## Abordagem de implementação

Site **estático** (sem servidor e sem banco: `features.server=false`, `features.database=false`).
O projeto nasce do starter `web-db-user`, mas usamos apenas o cliente Vite/React/Tailwind e o build
estático `pnpm build:static` com saída em `dist/public`.

Conteúdo jurídico e dados do escritório ficam separados da interface:

- `client/src/config/site.ts` — dados do escritório, mensagens do WhatsApp, menu e rodapé. Nenhuma
  página escreve telefone, endereço ou OAB diretamente.
- `client/src/data/servicos.ts` — catálogo de serviços (pergunta, resumo, rota, rótulo de ação, bloco),
  os 3 passos do atendimento, o aviso de documentos e o FAQ sobre o atendimento.
- `client/src/data/previdenciario.ts` — conteúdo jurídico e a data de conferência publicada.
- `client/src/components/site/` — cabeçalho, rodapé, SEO e os blocos reutilizáveis de página de serviço.

Cinco dos oito blocos de uma página de serviço são idênticos em todas as páginas. Isso é o que
permite construir as páginas uma a uma sem refazer o restante: só o título, "o que precisa ser
analisado" e "documentos que ajudam" mudam de serviço para serviço.

Infraestrutura: Manus (preview e publicação). Sem login, sem banco, sem integrações.

## Design

Reaproveita a identidade e a linguagem visual já validadas com o cliente e a referência
ingracio.adv.br — não há escolha de estilo em aberto.

- **Design Movement**: institucional editorial sóbrio, com respiro de revista e densidade de texto
  longa; nada de banco de imagens corporativo, nada de martelo de juiz.
- **Core Principles**: (1) pergunta antes de explicação; (2) blocos fixos reutilizáveis em todas as
  páginas de serviço; (3) cada seção termina em um único próximo passo; (4) nenhum elemento
  decorativo sem função.
- **Color Philosophy**: azul profundo como base institucional e de confiança; ciano como cor de ação
  e atenção, usada em rótulos, bordas de destaque e botões; cinza claro para separar blocos em
  leituras longas. O contraste existe para conduzir o olho ao próximo passo, não para decorar.
- **Layout Paradigm**: coluna editorial de 1280 px, seções alternando fundo branco e cinza-claro,
  grade de três cartões nos blocos de serviço e faixa lateral de atalhos no hero. Nada de layout
  centralizado e simétrico.
- **Signature Elements**: (1) faixa de hero em gradiente azul→ciano com o aviso de documentos;
  (2) cartão de serviço que abre com a pergunta do cliente e fecha com o rótulo de ação;
  (3) bloco "o que fazemos" com filete ciano à esquerda, contraposto a "por que acontece".
- **Interaction Philosophy**: toda página converge para um único próximo passo — WhatsApp com
  mensagem já escrita ou a página de contato. Nenhum formulário longo, nenhuma etapa intermediária.
- **Animation**: mínima e funcional — transição de sombra e cor no hover de cartões e links, subida
  suave do menu. Sem animação de entrada, sem paralaxe, sem movimento que atrase a leitura.
- **Typography System**: Playfair Display nos títulos (autoridade e serifa editorial) e Inter no corpo
  e nas interfaces (legibilidade em tela). Títulos de seção em 30–36 px, corpo em 14–17 px,
  entrelinha 1.6 para leitura longa.
- **Brand Essence**: um escritório previdenciário que mostra o que vai analisar antes de pedir
  qualquer documento. Seguro, direto, sóbrio.
- **Brand Voice**: frases curtas, sem promessa de resultado, explicando o termo técnico no próprio
  texto. Exemplos: "Você não precisa enviar documentos neste primeiro contato." / "Antes de recorrer,
  é preciso ler o motivo da negativa."
- **Wordmark & Logo**: "Santana Daufenbach" em Playfair Display, com filete ciano e o monograma SD
  já existente (`public/images/logo-sd.png` e a variante branca para o hero).
- **Signature Brand Color**: azul profundo `#0B3B6F`, com ciano `#22D3EE` como acento de ação.

## Estrutura do projeto

```
client/
  index.html                 metadados base, fontes e GTM
  public/
    images/                  logo, variante branca, imagens de hero
    sitemap.xml              páginas publicadas
    robots.txt
    manus-routes.json        manifesto de rotas do site
  src/
    config/site.ts           dados do escritório, WhatsApp, MENU, RODAPE
    data/servicos.ts         catálogo de serviços, passos, aviso, FAQ
    data/previdenciario.ts   conteúdo jurídico e REVISAO_CONTEUDO
    components/site/
      Seo.tsx                título, descrição, canônica, OG e dados estruturados
      Sections.tsx           blocos visuais compartilhados
      Servico.tsx            blocos de página de serviço (fixos e variáveis)
      SiteHeader.tsx         cabeçalho com submenu
      SiteFooter.tsx         rodapé
    pages/                   uma página por rota
    App.tsx                  rotas (wouter) e rolagem ao topo
```

## Rotas

```
/                                 página inicial
/servicos                         hub de serviços
/aposentadoria-especial           página de serviço
/aposentadoria-negada             página de serviço
/beneficios-por-incapacidade      página de serviço
/auxilio-acidente                 página de serviço
/servidores-publicos              página de serviço
/planejamento-de-aposentadoria    página de serviço
/perdeu-o-beneficio               página de serviço
/revisao-de-aposentadoria         página de serviço
/como-funciona                    institucional
/sobre                            institucional
/contato                          institucional
/ctc                              averbação de tempo (linha já existente)
/blog                             índice do blog
/blog/<artigo>                    artigos
```

## Publicação

Build estático: `build.command = "pnpm install --frozen-lockfile && pnpm build:static"`,
`outputDirectory = "dist/public"`. Sem `features.server`, sem `deploy`. SPA fallback por
`routes` com `{"path":"/*","target":"static","spaFallback":true}`.

## Refinamento aprovado — 22/10/2026

O domínio definitivo utiliza o GitHub `silvestrejunior/advocaciasd` e o Vercel; o remoto Manus permanece para checkpoints e Preview. Usar o pipeline de pré-renderização existente; não reintroduzir fallback global que intercepta HTML por rota.

Na home, o retrato real sobre o azul será dimensionado com limites responsivos, máscaras suaves nas bordas e base e legenda legível com especialidade, nome, OAB e atendimento nacional. A seção de entrada passa a usar cards editoriais com uma pergunta de identificação, uma preocupação concreta e um CTA específico. O bloco de atuação apresenta INSS e servidores públicos sem listar modalidades/regras e destaca a frase do escritório. Benefícios complementares ficam compactos, alternando azul profundo e azul claro, com título, descrição curta e clique. O vídeo entra no lugar das quatro etapas; haverá somente uma seção do canal e um campo central para sua URL manual, sem atualizar automaticamente o conteúdo. Sem URL definida, apresentar o acesso ao canal sem simular um player.

Componentes: `components/site/HomeAreas.tsx` para blocos de casos, atuação e benefícios; `components/site/YoutubeDestaque.tsx` para vídeo; `config/site.ts` para credenciais públicas e URL manual do vídeo. Preservar as outras seções, contatos, mapa, blog, seleção guiada e SEO.

Vídeo inicial confirmado pelo cliente: https://www.youtube.com/shorts/8tRtrJsjv_Q. Por ser Short, o player será 9:16 (e não 16:9), limitado a 290px de largura. Quando a URL manual for de vídeo convencional, usar 16:9 automaticamente. Sem autoplay; iframe lazy e link externo de alternativa.

O pré-render existente captura `page.content()` do navegador, não HTML de SSR do React. Portanto, a entrada passa a usar montagem normal (`createRoot`) sobre o snapshot; isso preserva o conteúdo HTML inicial para SEO e evita divergências de hidratação por marcadores de texto ausentes (#418).
