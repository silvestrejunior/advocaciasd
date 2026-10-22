# Entregas — site de captação Santana Daufenbach Advocacia

## Base compartilhada

- [x] Dados do escritório centralizados em `config/site.ts` (Santana Daufenbach Advocacia; João Luiz Santana Daufenbach, OAB/PR 66.208; Av. João Paulino Vieira Filho, 625, sala 708, Torre 2, Novo Centro, Maringá/PR; segunda a sexta, 9h às 17h; joao@advocaciasd.com.br; WhatsApp (44) 99856-3465), com MENU, RODAPE e mensagens de WhatsApp por intenção.
- [x] Nenhuma página escreve telefone, endereço ou número de OAB diretamente.
- [x] Paleta de azul profundo institucional (brand 600 a 950) aplicada em todo o site, com ciano apenas como acento e ação.
- [x] SEO por rota: título, descrição, canônica, Open Graph e dados estruturados.
- [x] Manifesto de rotas, sitemap e robots atualizados.

## Conteúdo por regime (`data/regimes.ts`)

- [x] Aposentadorias do INSS: seis benefícios, cada um com "o que é" e o cuidado prático correspondente.
- [x] Aposentadorias de servidores públicos: sete benefícios com o mesmo formato.
- [x] Além da aposentadoria: oito benefícios com o mesmo formato.
- [x] Nenhum item explica regras de aposentadoria (sem idade mínima, pontos, pedágio ou artigos de lei).
- [x] Quatro alertas que atravessam todos os casos (extrato de contribuições, momento de dar entrada, documentos do trabalho e "contar tempo não é calcular").
- [x] Quatro etapas do atendimento e as perguntas frequentes da página inicial.

## Página inicial (formato do esboço aprovado)

- [x] Hero escuro em duas colunas: título "Aposentadoria no INSS e para servidores públicos", linha de experiência, aviso de que não é preciso enviar documentos, e painel "Converse por WhatsApp" com cinco atalhos de intenção.
- [x] Seção "Você se aposenta pelo INSS ou é servidor público?" com os dois cartões de entrada, ligados à rota de seleção com a resposta pré-marcada.
- [x] "Aposentadorias do INSS" em grade, com o cuidado em destaque em cada cartão.
- [x] "Aposentadorias de servidores públicos" em grade, em fundo alternado.
- [x] "Além da aposentadoria" em grade.
- [x] "Quatro etapas, do histórico à concessão".
- [x] Faixa escura "Entenda antes de pedir" com os quatro alertas.
- [x] Perguntas frequentes e chamada final "Vamos analisar o seu caso".

## Rota de seleção `/seu-caso`

- [x] Primeira pergunta: servidor público ou INSS.
- [x] Segunda pergunta: já é aposentado ou ainda vai se aposentar.
- [x] Cada resposta rola suavemente até a etapa seguinte, e o passo seguinte fica desabilitado até a pergunta anterior ser respondida.
- [x] Resultado por combinação das respostas, com os cuidados do perfil e a grade de benefícios correspondente.
- [x] Resposta escolhida pode ser alterada, com limpeza das etapas seguintes.
- [x] Pré-seleção por `?regime=inss` ou `?regime=servidor`, usada pelos cartões da página inicial.

## Páginas de serviço

- [x] `/servicos` e oito páginas de serviço: aposentadoria especial, aposentadoria negada, benefícios por incapacidade, auxílio-acidente, servidores públicos, planejamento de aposentadoria, perdeu o benefício e revisão de aposentadoria.
- [x] Cada página com os blocos fixos, pontos de atenção no formato pergunta/problema/o que fazemos, documentos que ajudam e dúvidas antes de contratar.
- [x] Data de conferência do conteúdo publicada em cada página.

## Institucional

- [x] `/como-funciona`, `/sobre`, `/contato` e `/ctc`.
- [x] Menu e rodapé reorganizados, com link para a rota de seleção.

## Publicação

- [x] Build estático declarado (`pnpm install --frozen-lockfile && pnpm build:static`, saída em `dist/public`).
- [x] SPA fallback por `routes` e `logoUrl` declarado em `app.config.ts`.
- [x] Verificação: um `<h1>` por página, contraste dos botões conferido no navegador, nenhuma imagem quebrada.

## Próximos passos sugeridos

- [ ] Blog com artigos por tipo de benefício e pré-renderização, para ranqueamento orgânico.
- [ ] Página própria para pensão por morte, BPC/LOAS, aposentadoria rural e isenção de imposto de renda.
- [ ] Ajustar o numeral do passo na rota `/seu-caso` (hoje discreto demais).
- [ ] Ligar o site definitivo ao domínio `advocaciasd.com.br` quando o conteúdo for aprovado.
## Área de conteúdo (blog) e canais

- [x] Página /blog com os artigos agrupados por tema, cada tema ligado ao serviço correspondente e com link "Ver o serviço".
- [x] Página de artigo (/blog/:slug) com seções, perguntas frequentes, dados estruturados de BlogPosting, BreadcrumbList e FAQPage, CTA de WhatsApp e cartão do serviço relacionado.
- [x] Nove artigos publicados (um por tema), escritos na linguagem de análise do site, sem explicação de regras.
- [x] Script `scripts/gerar-conteudo.mjs`: consolida os artigos e regenera o manifesto de rotas e o sitemap (28 rotas).
- [x] Home com a seção "O que analisar antes de decidir" (três artigos mais recentes) e faixa do canal do YouTube.
- [x] Canal do YouTube em `SITE.youtube`, no rodapé, na faixa da home e nos dados estruturados (sameAs).
- [x] Pré-renderização com rotas aninhadas (/blog/<slug>) gravadas no caminho correto.
