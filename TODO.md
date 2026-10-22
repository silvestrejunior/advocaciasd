# Entregas — site de captação Santana Daufenbach Advocacia

## Base compartilhada

- [ ] Dados do escritório centralizados em `config/site.ts` (Santana Daufenbach Advocacia; João Luiz Santana Daufenbach, OAB/PR 66.208; Av. João Paulino Vieira Filho, 625, sala 708, Torre 2, Novo Centro, Maringá/PR; segunda a sexta, 9h às 17h; joao@advocaciasd.com.br; WhatsApp (44) 99856-3465), com MENU, RODAPE e mensagens de WhatsApp por intenção.
- [ ] Nenhuma página escreve telefone, endereço ou número de OAB diretamente: a troca de um dado do escritório acontece em um único arquivo.
- [ ] Catálogo de serviços em `data/servicos.ts` com pergunta, resumo, rota, rótulo de ação e bloco; mais os 3 passos do atendimento, o aviso de documentos e o FAQ sobre o atendimento.
- [ ] Blocos reutilizáveis de página de serviço: aviso de documentos, cartão de serviço, passos do atendimento, conheça o escritório, dúvidas antes de contratar, chamada final, hero de serviço, o que precisa ser analisado, pontos de atenção, documentos que ajudam.
- [ ] SEO por rota: título, descrição, canônica, Open Graph e dados estruturados (serviço, FAQ, trilha de navegação).

## Página inicial

- [ ] Abre com "Advocacia para a sua aposentadoria e para os seus benefícios" e a linha de apoio "Quer dar entrada, recebeu uma negativa ou precisa de orientação sobre um benefício? Conheça os serviços do escritório".
- [ ] Deixa claro, no banner, que o escritório trabalha com aposentadorias do INSS e de servidores públicos, com "quase 15 anos" de experiência e atendimento especializado em Direito Previdenciário.
- [ ] Exibe "Você não precisa enviar documentos neste primeiro contato" na primeira tela e repetido ao longo da página.
- [ ] Três blocos de serviços: "Principais serviços" (6 cartões), "Já fez um pedido ou recebe um benefício?" (3 cartões) e "Outras formas de atuação" (5 cartões), cada cartão abrindo com a pergunta do cliente e fechando com o rótulo de ação.
- [ ] Bloco lateral "Por onde começar" com quatro atalhos que abrem o WhatsApp com a mensagem já escrita.
- [ ] Seções "Como começa o atendimento" (3 passos), "Conheça antes de decidir", "Dúvidas antes de entrar em contato" e chamada final "Vamos conversar sobre a sua situação?".

## Hub de serviços

- [ ] `/servicos` reúne os três blocos na íntegra, com a data de conferência do conteúdo publicada e o aviso de documentos no topo.

## Páginas de serviço

- [ ] `/aposentadoria-especial` — análise do trabalho com exposição a agentes nocivos, com o efeito da decisão do STF que afastou a idade mínima e o que permanece exigido.
- [ ] `/aposentadoria-negada` — o que fazer antes de recorrer: motivo da negativa, prazo do recurso, data de início do benefício, novo pedido versus recurso.
- [ ] `/beneficios-por-incapacidade` — auxílio-doença e aposentadoria por invalidez, com os pontos que decidem a perícia.
- [ ] `/auxilio-acidente` — o que pode ser analisado quando a lesão deixa sequela, mesmo com retorno ao trabalho.
- [ ] `/servidores-publicos` — aposentadoria no regime próprio, tempo de serviço público, abono de permanência e averbação de tempo.
- [ ] `/planejamento-de-aposentadoria` — comparação das regras aplicáveis ao histórico do cliente, com datas possíveis.
- [ ] `/perdeu-o-beneficio` — cessação e suspensão: motivo, medidas possíveis e restabelecimento.
- [ ] `/revisao-de-aposentadoria` — conferência de cálculo, documentos e prazos antes de pedir revisão.
- [ ] Cada página de serviço tem os oito blocos: título em forma de serviço, aviso de documentos, o que precisa ser analisado, documentos que ajudam, como começa o atendimento, conheça os profissionais, dúvidas antes de entrar em contato e chamada final.
- [ ] Cada página de serviço inclui o bloco "os pontos que costumam decidir o caso", com "por que acontece" e "o que fazemos" lado a lado.

## Institucional

- [ ] `/como-funciona` explica o passo a passo do atendimento, a diferença entre consulta, planejamento e acompanhamento, o que conferir antes de contratar e o que fazer quem precisa de ajuda com etapas digitais.
- [ ] `/sobre` apresenta o responsável, a OAB, o endereço, o horário e os canais oficiais.
- [ ] `/contato` reúne WhatsApp, e-mail, endereço, horário e o aviso de que documentos e dados de saúde devem ser enviados apenas pelos canais indicados pela equipe.
- [ ] `/ctc` mantém a página de averbação de tempo já existente, dentro da nova navegação.

## Blog

- [ ] `/blog` lista os artigos publicados, e cada artigo tem HTML próprio no build.
- [ ] Cada artigo aponta para a página de serviço correspondente, e cada página de serviço cita dois artigos — o caminho de ida e volta.
- [ ] Primeiros artigos sobre os benefícios do regime geral e sobre aposentadorias de regimes próprios.

## Linguagem e conformidade

- [ ] Nenhuma página promete resultado: o texto usa "pode ser analisado", "depende" e "a análise deve considerar".
- [ ] As perguntas frequentes são sobre o atendimento (primeiro contato não é consulta jurídica, honorários antes da contratação, como confirmar que se está falando com o escritório), e não sobre a lei.
- [ ] Cada página publica a data de conferência do conteúdo.
- [ ] Nenhuma regra previdenciária é escrita de memória: as afirmações jurídicas seguem as fontes conferidas e registradas no documento de especificação.

## Publicação

- [ ] Manifesto de rotas em `public/manus-routes.json` sincronizado com as rotas reais.
- [ ] `sitemap.xml` e `robots.txt` atualizados com as páginas publicadas.
- [ ] Build estático declarado (`build.command`, `outputDirectory = dist/public`) e SPA fallback por `routes`.
- [ ] `logoUrl` declarado em `app.config.ts` com URL HTTPS durável.
- [ ] Verificação final: um `<h1>` por página, dados estruturados válidos, nenhuma imagem quebrada, nenhum erro de console.