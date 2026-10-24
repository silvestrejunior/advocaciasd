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

- [x] Banner escuro com título INSS/servidores, botão de seleção, foto real, apresentação do responsável e CTA de WhatsApp (quadro de atalhos removido).
- [x] Bloco de atuação em benefícios do INSS e aposentadoria de servidores, com a frase do escritório e links para cuidados e seleção guiada.
- [x] Grade de aposentadorias do INSS transferida para a página de cuidados, fora da home.
- [x] Grade de aposentadorias de servidores transferida para a página de cuidados, fora da home.
- [x] "Além da aposentadoria" em grade.
- [x] Quatro etapas removidas da home; a seção de YouTube passa a ocupar esse lugar.
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
- [x] HTML pré-renderizado por rota, resolução estática sem fallback global interceptando páginas e `logoUrl` declarado em `app.config.ts`.
- [x] Verificação: um `<h1>` por página, contraste dos botões conferido no navegador, nenhuma imagem quebrada.

## Próximos passos sugeridos

- [x] Blog com artigos por tema e HTML pré-renderizado entregue.
- [ ] Página própria para pensão por morte, BPC/LOAS, aposentadoria rural e isenção de imposto de renda.
- [ ] Ajustar o numeral do passo na rota `/seu-caso` (hoje discreto demais).
- [x] Site no domínio www.advocaciasd.com.br, pela main do GitHub e Vercel.
## Área de conteúdo (blog) e canais

- [x] Página /blog com os artigos agrupados por tema, cada tema ligado ao serviço correspondente e com link "Ver o serviço".
- [x] Página de artigo (/blog/:slug) com seções, perguntas frequentes, dados estruturados de BlogPosting, BreadcrumbList e FAQPage, CTA de WhatsApp e cartão do serviço relacionado.
- [x] Nove artigos publicados (um por tema), escritos na linguagem de análise do site, sem explicação de regras.
- [x] Script `scripts/gerar-conteudo.mjs`: consolida os artigos e regenera o manifesto de rotas e o sitemap (28 rotas).
- [x] Home com a seção "O que analisar antes de decidir" (três artigos mais recentes) e faixa do canal do YouTube.
- [x] Canal do YouTube em `SITE.youtube`, no rodapé, na faixa da home e nos dados estruturados (sameAs).
- [x] Pré-renderização com rotas aninhadas (/blog/<slug>) gravadas no caminho correto.

## Refinamento da home — 22/10/2026

- [x] Banner: abaixo da foto mostrar “Advogado Especialista há mais de 10 anos atendendo o cliente Previdenciário”, João Luiz Santana Daufenbach, OAB/PR 66.208 e “Atendimento em todo o Brasil”. Preservar a chamada “Me conte um pouco do seu caso” para WhatsApp e o botão de seleção “Descobrir o meu caso”. Foto integrada ao fundo azul, responsiva, sem deformação ou estouro lateral no celular.
- [x] “Como está o seu caso agora?”: melhorar a atração e os caminhos para Perícia negada, Tempo Rural e Tempo Especial, preservando as rotas existentes, os destaques e a linguagem consultiva sem promessa de resultado.
- [x] “Além da aposentadoria”: cards menores e alternando tons da paleta institucional, com somente o nome, uma breve descrição e indicação de clique; retirar o bloco extenso de cuidados da home, preservando a informação nas páginas de destino.
- [x] “Por onde começar”: destacar atuação em benefícios do INSS e aposentadoria de servidores públicos, “Conhecer seu direito é sempre a melhor escolha” e a frase literal “Você não trabalhou a vida inteira pra aposentar de qualquer jeito”. Sem listas de regras de aposentadoria.
- [x] Substituir “Quatro etapas, do histórico à concessão” pela seção do canal no YouTube com player responsivo (9:16 para o Short e 16:9 para vídeos convencionais), link alternativo e vídeo de destaque atualizável manualmente por uma configuração central. Remover o bloco duplicado do canal. Primeiro vídeo confirmado: https://www.youtube.com/shorts/8tRtrJsjv_Q.
- [x] Regenerar HTML pré-renderizado, conferir responsividade, links, diagnóstico e build; preservar o histórico do GitHub e salvar o checkpoint.

## Imagens dos cards de situação — 22/10/2026

- [x] Adicionar fundos individuais: pessoa de muletas em “Perícia negada”, agricultor com enxada em “Tempo Rural” e enfermeiro em ambiente hospitalar em “Tempo Especial”. Imagens ilustrativas com tratamento azul consistente, camada de contraste para leitura, integração com a identidade, hover e foco acessíveis; manter os três destinos e o restante da home.
- [x] Substituir a foto do card “Estou com dificuldades no meu Tempo Especial” por uma enfermeira do sexo feminino, em ambiente hospitalar, mantendo o mesmo enquadramento, o tratamento azul e a legibilidade do texto.

## Conferência de SEO e busca no Google — 22/10/2026

- [x] Títulos entre 30 e 60 caracteres em todas as 28 rotas, com o nome do escritório saindo quando o título já é longo.
- [x] Meta descrições entre 50 e 160 caracteres, incluindo a correção da página Sobre.
- [x] Palavras-chave por rota (3 a 8 termos) nas páginas principais e de serviço.
- [x] Canônica, og:url e og:image apontando para www.advocaciasd.com.br, inclusive na base HTML.
- [x] Imagem de compartilhamento própria nas páginas de perícia negada, tempo rural e tempo especial.
- [x] Dados estruturados com logo e identificador do escritório, além de BlogPosting, FAQPage e BreadcrumbList por página.
- [x] Favicon com a logo sem fundo (.ico, 32, 192 e 512), ícone de toque e maskable em azul, e manifesto do site.
- [x] Imagens convertidas para WebP e arquivos sem uso removidos: pasta de imagens de 3,4 MB para 1,6 MB.
- [x] Pré-carregamento da imagem do banner e limpeza dos marcadores de edição no HTML publicado.
- [x] Conferência publicada: 28 rotas com status 200, título, descrição, canônica, palavras-chave, um único H1 e conteúdo no HTML sem JavaScript.

## Tag do Google (Google Ads) — 23/10/2026

- [x] Tag do Google (AW-17096336975) instalada no `<head>` de todas as páginas, antes do fechamento da tag.
- [x] As 28 rotas do site saem do build com a tag; as três páginas de redirecionamento antigas ficam sem, de propósito.
- [x] Visualização registrada a cada troca de página interna (o site navega sem recarregar), com caminho, endereço e título corretos.
- [x] A pré-renderização do build bloqueia as requisições de medição, para não sujar as métricas do Google Ads com acessos do próprio build.
- [x] Conferido no navegador: biblioteca carregada, `gtag` disponível, uma visualização por rota e sem duplicidade.

## Conversão do WhatsApp e LGPD — 23/10/2026 (aguardando aprovação)

- [ ] Conversão "Clique no WhatsApp" (AW-17096336975/0KROCN2brKcdEM_Mldg_) disparada por função única, com proteção contra disparo duplo de 1 segundo.
- [ ] Links para o WhatsApp medidos por um ouvinte global de clique, em todas as páginas e componentes.
- [ ] Aberturas por JavaScript (formulários da /ctc e da /contato) medidas antes de abrir o WhatsApp.
- [ ] Aviso de cookies no rodapé da tela, com escolha guardada em localStorage (sd_cookies) e consentimento negado antes da tag quando já houve recusa.
- [ ] Página /privacidade publicada na navegação, no rodapé, no manifesto de rotas e no sitemap.
- [ ] Testes na prévia: uma conversão por clique, aviso some após a escolha e não volta ao recarregar.
- [ ] Publicar somente após a resposta "aprovado".

## Página de aposentadoria especial — 24/10/2026

- Banner principal com a chamada "Aposentadoria Especial: o que você precisa saber antes de pedir.", informação direta sobre o direito (15, 20 ou 25 anos de exposição e ausência de idade mínima após a decisão do Supremo em 2026) e foto de profissional de saúde de 50 anos em ambiente hospitalar.
- Bloco de conteúdo logo abaixo do banner, no formato de blog, com os principais artigos sobre o direito (seis cartões: agentes biológicos, empresa fechada, EPI eficaz, campos do PPP, ruído e conversão de tempo especial), todos ligados às páginas de artigo.
- Faixa de chamada com a segunda imagem hospitalar, ligando a exposição que não aparece no papel ao contato pelo WhatsApp.
- Seis artigos novos publicados no tema, com resumo, palavras-chave e perguntas: agentes biológicos na saúde, EPI eficaz, campos do PPP, ruído, empresa fechada e conversão de tempo especial.
- Metadados de busca da página atualizados (título, descrição e palavras-chave), manifesto de rotas e sitemap regerados.

## Imagens nos cartões e seção de últimas mudanças — 24/10/2026

- Sete imagens próprias para os cartões dos artigos de tempo especial (agentes biológicos, empresa fechada, EPI, PPP, ruído, conversão e documentos), exibidas nos cartões da página, do índice do blog e da página inicial quando o artigo tem imagem.
- Seção "Últimas mudanças" logo abaixo do banner principal, com as decisões que alteraram a análise do tempo especial: STF (junho de 2026, fim da idade mínima, ADI 6309) e TNU Tema 383 (setembro de 2026, EPI eficaz em setores críticos), cada uma com o que muda na prática e link para o detalhamento.
