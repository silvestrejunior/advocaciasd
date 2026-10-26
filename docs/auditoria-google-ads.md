# Varredura do site para as campanhas do Google Ads

Data: 26/10/2026 · Domínio: https://www.advocaciasd.com.br

## 1. Resultado geral

O site está pronto para receber tráfego pago. Todas as 35 rotas publicadas respondem
200, com título, meta descrição, um único H1, canônica correta, dados estruturados e a
tag do Google (AW-17096336975) presente.

## 2. O que foi verificado

| Verificação | Resultado |
| --- | --- |
| 35 rotas publicadas | 200 em todas, sem erro de servidor |
| Título e meta descrição por rota | presentes em 35 de 35 |
| H1 único por página | presente em 35 de 35 |
| Canônica | correta em todas as páginas conferidas |
| Tag do Google (AW-17096336975) | carregada em todas as páginas |
| Conversão no clique do WhatsApp | evento `conversion` com `send_to: AW-17096336975/0KROCN2brKcdEM_Mldg_` |
| Links internos (38 distintos) | nenhum quebrado após as correções |
| Imagens (18 distintas) | todas 200, nenhuma quebrada |
| Páginas inexistentes | devolvem 404 real (não há soft 404) |
| Sitemap e robots.txt | sitemap com 35 rotas, robots liberando a indexação |
| Excesso de largura no celular | 0px em todas as páginas conferidas |
| Tempo de carregamento (build local) | DOM em ~200-250ms; carga completa em 1,4-1,9s |
| Erros de JavaScript no console | nenhum |
| Página interativa /seu-caso | fluxo completo funciona e leva aos serviços certos |

## 3. Ajustes aplicados nesta varredura

1. **Favicon** — acrescentados os tamanhos 48 e 96 pixels (múltiplos de 48, exigidos
   pelo Google), o arquivo `favicon.ico` passou a conter 16, 32 e 48 pixels e todos os
   tamanhos estão declarados no cabeçalho do site. O ícone já era quadrado, com o
   símbolo ocupando cerca de 86% da área e sem fundo.
2. **Nome do site na busca** — incluído o bloco `WebSite` nos dados estruturados, com
   nome, nome alternativo, endereço e idioma, que é o que o Google usa para exibir o
   nome do escritório ao lado do resultado.
3. **Links quebrados** — corrigidas duas ligações que apontavam para rotas que não
   existem mais (`/aposentadoria-inss` e `/aposentadoria-servidor-publico`), na trilha
   visível, nos dados estruturados e no bloco final da página de aposentadoria especial.
   O botão "Sou servidor público" passou a levar à página de servidores públicos.
4. **Área de toque no celular** — ampliada em três links de texto (canal no YouTube e
   "Ver todo o conteúdo"), sem alteração visual.

## 4. Pontos que dependem do proprietário

1. **Favicon na busca**: o Google mostra o ícone quando rastreia a página inicial. Como o
   domínio trocou de site recentemente, vale pedir a indexação no Search Console
   (Inspeção de URL → Solicitar indexação) para acelerar a atualização.
2. **Conversão no Google Ads**: cadastrar a ação de conversão de clique no WhatsApp com o
   rótulo já usado pelo site (`AW-17096336975/0KROCN2brKcdEM_Mldg_`) e marcá-la como
   principal, para as campanhas otimizarem por contato iniciado.
3. **Search Console**: enviar o sitemap e conferir a cobertura das 35 rotas.
4. **Páginas de destino**: para campanhas de aposentadoria especial, usar
   `/aposentadoria-especial`; para perícia, `/pericia-negada`; para tempo rural,
   `/tempo-rural`. As três têm chamada para ação no meio da página e no fim.
5. **Links de toque**: os links de texto do rodapé e das listas de conteúdo têm cerca de
   19px de altura, o que é comum na web, mas fica abaixo dos 48px recomendados para
   toque. Não bloqueia campanha; se quiser, dá para aumentar em uma próxima rodada.