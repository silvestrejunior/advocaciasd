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

## Página enxuta com chamada para ação — 24/10/2026

- Removidas as seções "O que precisa ser analisado", "O que a decisão do STF mudou", "Os pontos que costumam decidir o caso", "Como conduzimos a análise" e "Documentos/Como começa", junto com a faixa de chamada que repetia a conversão.
- No lugar, uma seção forte de chamada para ação com a frase do escritório "Você não trabalhou a vida inteira pra aposentar de qualquer jeito", os três passos do atendimento, botões de WhatsApp e "Descobrir o meu caso", e o reforço de que nenhum documento é necessário no primeiro contato.
- O cartão do STF na seção de últimas mudanças passou a levar ao WhatsApp, já que a seção detalhada saiu; a âncora #analise continua válida para os links dos cartões de serviço.
- Página reduzida de 767 para 518 linhas, com constantes e ícones sem uso removidos.

## Destaque no título e otimizações de SEO — 24/10/2026

- Palavra-chave "Aposentadoria Especial" destacada em azul no título, no mesmo padrão usado na página inicial.
- Corrigidos os links internos quebrados: a trilha apontava para rotas que não existem mais (/aposentadoria-inss e /aposentadoria-servidor-publico) e agora vai para /servicos.
- A política de privacidade entrou no manifesto de rotas e no sitemap (a página existia, mas não era gerada no build).
- Removida a página de exemplo de componentes, sem uso.
- Textos alternativos das imagens dos cartões passaram a usar o título do artigo, e o do banner ganhou a palavra-chave de exposição.
- Dados estruturados ampliados: WebPage com data de modificação, Service de análise de aposentadoria especial, além do FAQ e da trilha já existentes.
- Bloco "Veja também" com ligações internas para perícia negada, aposentadoria negada, tempo rural, servidores públicos, benefícios por incapacidade e cuidados.
- Título da seção de artigos com a palavra-chave completa.

## Varredura para o Google Ads — 26/10/2026

- Favicon reforçado: tamanhos 48 e 96 pixels, .ico com 16/32/48 e todos declarados no cabeçalho.
- Bloco WebSite nos dados estruturados, para o nome do escritório aparecer na busca.
- Links quebrados da página de aposentadoria especial corrigidos (trilha, dados estruturados e botão final).
- Área de toque ampliada em três links de texto no celular.
- Varredura completa: 35 rotas em 200, tag do Google em todas, conversão do WhatsApp disparando, nenhum link ou imagem quebrada, 404 real para página inexistente, sem erro de JavaScript.
- Relatório em docs/auditoria-google-ads.md.

## Aposentadoria especial na saúde (prévia para aprovação) — 26/10/2026

- [x] Página `/aposentadoria-especial-saude` com os 8 blocos pedidos, mesmo visual da página de aposentadoria especial e topo sem foto.
- [x] Todos os botões de WhatsApp da página com a mensagem "vim pela página de aposentadoria especial na saúde".
- [x] Frase final com link no artigo sobre agentes biológicos e cartão discreto na página de aposentadoria especial.
- [x] Links internos, acordeão, dados estruturados (FAQPage e LegalService com nome e endereço), sitemap e manifesto conferidos.
- [ ] Publicar somente depois da aprovação do usuário.

## Correções de usabilidade e estabilidade — 05/11/2026

- [x] Corrigir a sobreposição entre WhatsApp flutuante e aviso de cookies, especialmente em 768 px, mantendo Recusar e Aceitar acessíveis por toque, teclado e zoom; manter mensagens de WhatsApp e escolhas de consentimento existentes.
- [x] Ajustar contraste dos rótulos ciano e do texto dos botões de WhatsApp para leitura acessível, preservando azul profundo, verde de identificação e conteúdo existente.
- [x] Remover a restrição de zoom em dispositivos móveis; ampliar áreas de toque dos links e controles apontados, com foco visível e nome acessível coerente no WhatsApp.
- [x] Otimizar carregamento de Playfair Display e Inter e reservar dimensões das imagens para eliminar deslocamentos tardios; buscar CLS zero na rota de saúde e registrar a medição real, sem prometer zero em todos os dispositivos/conexões.
- [x] Manter conteúdo, rotas de campanha e canonical existentes; regenerar HTML pré-renderizado e deixar publicação automática desativada. O checkpoint final será identificado pelo commit aceito no histórico de versões, sem publicar a correção automaticamente.
## Campanha `/aposentadoria-acs-ace` (EC 140/2026)

- [x] Página publicada em /aposentadoria-acs-ace com identidade própria: azul-chumbo #32414E, azul médio #0066AD, ciano #00AEEF só em elementos gráficos, fundo #F4F7F9, faixa escura #22303B e WhatsApp #1F8F4E; Sora nos títulos e Source Sans 3 no texto, com no mínimo 17px no texto de leitura, sem fotos de banco de imagens, sem ícones genéricos e sem emojis.
- [x] Cabeçalho com o logo oficial (sem recriar), link para a página inicial e alt text, botão "Falar no WhatsApp" à direita e só o logo no celular; barra fixa no rodapé do celular com o botão de WhatsApp.
- [x] Topo em duas colunas com a chamada "EMENDA CONSTITUCIONAL 140/2026 · ACS E ACE", o H1 definido, os dois botões ("Quero analisar meu caso" no WhatsApp e "Simular minha aposentadoria" para a âncora) e os quatro selos de credibilidade.
- [x] Quadro escuro "Idade mínima na regra de transição" com a tabela de requisitos cumpridos (até 31/12/2030, 2031 a 2035, 2036 a 2040, a partir de 2041), linha de 50/52 destacada e a nota dos 25 anos com a redução de 1 ano por ano excedente.
- [x] Seção "O que mudou" com os três caminhos (idade, pontos e regra definitiva), os números 50/52, 83/86 e 57/60, a linha das idades anteriores riscada e a fonte citada com link em nova aba.
- [x] Simulador em /aposentadoria-acs-ace#simulador com os campos definidos, resultado ao vivo sem botão de calcular, as duas linhas de comparação, o aviso de conta aproximada e o botão que abre o WhatsApp com a mensagem preenchida; nenhum dado é enviado ou guardado.
- [x] Caso de teste do briefing confirmado: mulher, 47 anos, 20 como agente e 22 de contribuição resulta em 2031 pela transição por idade (aos 52) e 2039 pela transição por pontos (aos 60).
- [x] Simulador troca o resultado pela frase de revisão quando o vínculo é "Já sou aposentado" e acrescenta a nota de efetivação até 31/12/2028 no contrato temporário.
- [x] Seções "Quem tem direito" (lista com check e quadro "Tempo que também conta"), "Valor da aposentadoria" (dois quadros e faixa "O que entra no cálculo"), "Afastamento e invalidez", "Vínculo precário", faixa escura "Já aposentado", "Documentos", "Como trabalhamos" em quatro etapas, dúvidas frequentes em acordeão e chamada final com WhatsApp e e-mail.
- [x] Rodapé em #32414E com responsável técnico e OAB, endereço, link da fonte, aviso do Provimento 205/2021, menção à LGPD e link da Política de Privacidade.
- [x] SEO conforme o briefing: title e description definidos, canônica https://advocaciasd.com.br/aposentadoria-acs-ace, um único H1, H2 por seção, palavras-chave distribuídas no texto, Open Graph com pt_BR, geo BR-PR/Maringá, JSON-LD com LegalService (Maringá e Paraná), WebPage e FAQPage, link interno para a página inicial e alt no logo.
- [x] Página testada em 390px sem rolagem lateral, com todos os botões abrindo o WhatsApp certo e os links da fonte abrindo o artigo.
- [x] Sem promessa de resultado, sem "garantido", sem depoimentos, números de casos, preços ou honorários, e sem formulário que colete dados.
- [x] Revisão da EC 140/2026 conferida contra o texto oficial e divergências do briefing registradas em docs/revisao-ec140-2026.md para decisão do advogado.
- [x] Prévia aprovada e canônica ajustada para www a pedido do cliente.
- [x] Banner centrado com as duas categorias destacadas no H1 no azul institucional, quadro das idades movido para "O que mudou", botão de simulação em destaque pulsante.
- [x] Botão flutuante de WhatsApp e rodapé no padrão das outras páginas (a barra fixa própria deixou de existir).
- [x] Quadro "Idade mínima na regra de transição" e trecho riscado da regra antiga removidos da página.
- [x] Assinatura do escritório no cabeçalho igual à do site (logotipo original com escrita em Playfair, visível no celular).
- [x] Banner sem nome e dados pessoais, apenas "Atendemos Servidores Públicos e INSS" e "Atendemos em todo o Brasil" em destaque.
- [x] Mensagem do WhatsApp desta página: "Quero falar com um advogado sobre a aposentadoria do ACS ou ACE.".
- [x] Mensagem do WhatsApp da página da saúde: "Sou da área da saúde e quero falar com um advogado sobre a minha Aposentadoria Especial.".
- [x] Acesso "Conheça nosso escritório!" no cabeçalho fixo, com destaque, medido em doze larguras sem sobreposição nem quebra de espaçamento.
- [x] Publicada em https://www.advocaciasd.com.br/aposentadoria-acs-ace (deploy Vercel confirmado, arquivos e sitemap conferidos).
- [ ] Decisão do advogado sobre os ajustes jurídicos apontados em docs/revisao-ec140-2026.md (insalubridade na base de cálculo, redução da idade, revisão de aposentados, efetivação de temporários e mandato classista).
## Rodada de otimização para busca e desempenho — 06/11/2026

- [x] Bundle inicial reduzido de 246 KB para 193 KB (gzip), sem o aparato de
      API/autenticação do modelo e sem toast/tooltip que o site não usava.
- [x] Imagens reotimizadas: 1.676 KB → 890 KB, com logotipos leves de 128 px na
      interface e largura/altura declaradas em todas as imagens das 38 rotas.
- [x] CLS da campanha ACS e ACE zerado com `font-display: optional` nas fontes da
      campanha (medição local com rede e CPU lentas: 0,0000).
- [x] Contraste do botão verde da campanha em 5,4:1 (WCAG AA) e nome acessível do
      link da marca alinhado ao texto visível.
- [x] Landmark <main> nas páginas /servicos, /aposentadoria-especial e /ctc.
- [x] Dados estruturados: LegalService único em /aposentadoria-especial e author e
      publisher nos BlogPosting de /blog.
- [x] Título (59) e descrição (135) da campanha ACS e ACE dentro do limite do Google.
- [x] Pré-carregamento do retrato do banner na home (maior elemento da primeira tela).
- [x] Publicado o checkpoint 5b3a6e2 na main (deploy automático na Vercel) e repetida a
      medição no domínio: desempenho celular 76/89/88/87/85/86 nas seis páginas medidas,
      acessibilidade e SEO em 100 e CLS zerado.

## `/como-pedir-aposentadoria`, prévia para aprovação — 06/11/2026

- [x] Página curta voltada a pessoas de 45 a 65 anos de Maringá e região: vídeo, seleção rápida de contato, frase do escritório e rodapé. Preservar os textos do briefing, sem juridiquês, travessões, promessas de resultado, garantido, 100%, depoimentos, números de casos, preços ou honorários. Usar apenas o logo oficial já fornecido, sem recriá-lo, fotos de banco ou ícones genéricos/emojis. Sora nos títulos e Source Sans 3 no corpo, texto >=17px, botões >=48px. Paleta literal #32414E (texto), #0066AD (links), #00AEEF (gráfico, nunca texto sobre branco), #F4F7F9 e branco (fundos), #22303B (faixa), #1F8F4E (WhatsApp).
- [x] Navbar fixa no topo: logo original à esquerda com link inicial e alt; botão à direita Conheça o escritório com contorno azul-chumbo para https://advocaciasd.com.br/. No celular, logo e botão menores na mesma linha, sem sobreposição. Hero em duas colunas no computador e empilhado no celular, chamada APOSENTADORIA COM ASSESSORIA, único H1 Antes de pedir sua aposentadoria, conheça o seu direito; parágrafo literal sobre regra escolhida/data/períodos do INSS, três pontos literais Consciência do direito, Escolha com segurança e Documentos em ordem com filete ciano; botões Assistir ao vídeo e Falar no WhatsApp; linha Dr. João Luiz Santana Daufenbach · OAB/PR 66.208 · Atendimento em Maringá e online.
- [x] Vídeo à direita e após texto no celular, título Por que pedir a aposentadoria com assessoria e legenda Dr. João Luiz explica as vantagens e a importância de contar com um advogado antes do pedido. URL ainda pendente de confirmação; depois de recebida, capa do vídeo com play e player youtube-nocookie.com carregado só no clique, formato16:9 arredondado, sem autoplay; Assistir ao vídeo rola até a mídia no celular, abre o player no computador. Nunca simular vídeo confirmado ou metadados de upload desconhecidos.
- [x] Seleção rápida id=comece, fundo branco, chamada COMECE POR AQUI, H2 Conte um pouco sobre você, texto Responda três perguntas e envie pelo WhatsApp. A conversa já começa com essas informações. Idades18..80 com Selecione inicial; rural Sim/Não e ajuda literal sobre roça/família/boia-fria/empregado sem registro; insalubridade Sim/Não/Não sei e ajuda literal com ruído/calor/químicos/poeira/eletricidade/doenças. Nenhum formulário envia/guarda dados. Idade obrigatória com foco/erro Selecione sua idade; perguntas sem resposta são omitidas. Aos58, ruralSim, insalubridadeNão sei: Olá! Vi a página sobre como pedir a aposentadoria. Tenho 58 anos, já trabalhei no meio rural e não sei se trabalhei com insalubridade. Gostaria de orientação para o meu pedido. Botão Enviar pelo WhatsApp verde, largura total no celular; abaixo Nada é gravado nesta página. Suas respostas vão direto para o WhatsApp do escritório, só se você tocar no botão.
- [x] Faixa escura #22303B com filete ciano e H2 Sora grande/branco/centralizado Você não trabalhou a vida inteira pra aposentar de qualquer jeito. e Santana Daufenbach Advocacia Previdenciária abaixo. Rodapé #32414E com responsável João Luiz Santana Daufenbach · OAB/PR66.208, endereço Av. João Paulino Vieira Filho625,sala708,torre2,Maringá/PR,CEP87020-015, telefone e e-mail copiáveis e links início/privacidade. Aviso literal Conteúdo informativo, de acordo com o Provimento nº 205/2021 do Conselho Federal da OAB. As informações desta página não substituem a análise individual do caso. Dados pessoais enviados pelo WhatsApp são usados apenas para o atendimento, nos termos da LGPD.
- [x] Todos os contatos usam44 99856-3465/wa.me5544998563465 e conversão única existente Clique no WhatsApp AW-17096336975; links padrão e flutuante: Olá! Vi a página sobre como pedir a aposentadoria e gostaria de conversar sobre o meu caso. Flutuante redondoverde com símboloWhatsApp e aria-label Falar no WhatsApp, canto inferior direito em todas as telas, sem cobrir envio ou texto do rodapé/cookies, espaço inferior reservado. Não enviar respostas da seleção a analytics.
- [x] SEO literal: title Como pedir a aposentadoria com segurança | Advogado em Maringá-PR; description Vai pedir sua aposentadoria? Conheça seu direito antes de dar entrada no INSS. Assista ao vídeo e fale com advogado previdenciário em Maringá.; canonical https://advocaciasd.com.br/como-pedir-aposentadoria; palavras-chave naturais como pedir aposentadoria/como dar entrada na aposentadoria/documentos para aposentadoria/assessoria para aposentadoria/advogado previdenciário Maringá/aposentadoria rural/aposentadoria especial/insalubridade. Um único H1, H2 nas seções de seleção e frase; OG/title/description/url/pt_BR e geoBR-PR/Maringá. LegalService único com endereço/telefone/e-mail,Maringá e Paraná,advogado/OAB, WebPage e VideoObject somente quando vídeo/metadados confirmados. HTML pré-renderizado, manifesto/sitemap coerentes sem alterar canônicas existentes.
- [ ] Prévia em390px sem scroll horizontal, link inicial e WhatsApp corretos, caso58/Sim/Não sei e omissões testados, vídeo sem player/requisições atéclique. Não publicar, não enviar nova página à mainGitHubVercel nem chamarPublish; checkpoint no Manus somente se auto_publishfalse for confirmado. Informar lacunas do vídeo/addon sem prometer conclusão automática.

Prévia visual e testes concluídos, vídeo confirmado KNg-vQ7uo3k, data24/03/2025. O último item permanece aberto apenas quanto à prévia interativa/checkpoint remoto: addon Manus ainda em recuperação e auto_publish indisponível. Não publicar nem avançar GitHub/Vercel. Versão preservada no Git local; aprovação da prévia pendente.

## Revisão final e publicação condicionada de `/como-pedir-aposentadoria` — 06/11/2026

- [x] Revisar o texto principal e as chamadas para ação mantendo o H1, os rótulos aprovados, a frase do escritório, as mensagens prontas e a identidade visual. Esclarecer a influência dos fatores na análise e que a seleção prepara uma mensagem, sem enviá-la automaticamente.
- [x] Publicar a versão revisada quando o addon Manus estiver normalizado, conforme autorização do usuário em 06/11/2026 às 15:11. Essa autorização substitui a etapa anterior de prévia sem publicação, mas não permite antecipar a publicação enquanto a condição não for satisfeita. Preservar histórico e conferir a nova rota no domínio oficial após o deploy.

Estado atual: addon permanece em recuperação. Não há evento nativo disponível para retomada automática; não foi configurado monitoramento e nenhuma publicação antecipada foi executada. Nova autorização registrada para concluir a publicação na retomada assim que a condição for confirmada.

Addon normalizado em 07/11/2026 (configuração revisão 7, publicação automática desativada). Revisão mobile em 8 larguras, auditoria de links das 39 rotas e deploy executados. Publicada em https://www.advocaciasd.com.br/como-pedir-aposentadoria (commit 57456fe), com a hospedagem do projeto na mesma versão.

## Otimização de desempenho e SEO da campanha (07/11/2026)

- [x] Pacote inicial reduzido de 199 KB para 76 KB comprimidos, com divisão de
      código por rota e pacotes de 8 a 61 KB por página.
- [x] Página monta sem tela em branco: o módulo da rota é baixado antes da
      montagem e a página renderiza de forma síncrona sobre o HTML pré-renderizado.
- [x] CSS entregue junto do documento (`cssCodeSplit: false`): CLS de 1,0 para 0.
- [x] Tag do Google baixada depois do evento de load, com os eventos anteriores
      preservados na fila do dataLayer e o snapshot do pré-render limpo da tag.
- [x] SEO on-page: título da campanha com 51 caracteres, BreadcrumbList nos dados
      estruturados e bloco de ligações internas para os temas relacionados.
- [x] As 39 rotas revalidadas com conteúdo, título, H1 e canônica íntegros.
- [x] Publicado nos dois endereços (Vercel e hospedagem do projeto) no commit
      c94bab2.
- [ ] Monitoramento de posições de palavras-chave: depende de uma fonte de dados
      (Google Search Console ou conector de SERP). Nenhuma está conectada.
