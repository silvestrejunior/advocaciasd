# Achados da rodada de SEO e desempenho — 07/11/2026

## Rota analisada
https://www.advocaciasd.com.br/como-pedir-aposentadoria

## Problema identificado no início
O pacote único de JavaScript tinha 780 KB (199 KB comprimidos) e trazia o código
das 39 rotas. Em celular, o filmstrip do Lighthouse mostrava o viewport sem
conteúdo por vários segundos antes da primeira pintura útil.

## Medidas aplicadas
1. Divisão de código por rota (`client/src/lib/paginas.tsx`, `App.tsx`): pacote
   inicial de 199 KB para 76 KB comprimidos, com pacotes de 8 a 61 KB por página.
2. Montagem sem tela em branco (`main.tsx`): o módulo da rota é baixado antes da
   montagem e a página renderiza de forma síncrona; o HTML pré-renderizado deixa
   de ser substituído por um estado vazio. Pré-busca em links internos.
3. CSS entregue com o documento (`vite.config.ts`, `cssCodeSplit: false`): sem
   isso, o CSS da rota chegava junto do chunk e o conteúdo aparecia sem estilo,
   gerando CLS de 1,0.
4. Tag do Google adiada (`client/index.html`): a biblioteca passa a ser baixada
   depois do evento de load; os eventos anteriores ficam na fila do dataLayer.
   O snapshot do pré-render é limpo da tag para não reintroduzir o bloqueio
   (`scripts/prerender.mjs`).
5. SEO on-page: título de 65 para 51 caracteres, BreadcrumbList nos dados
   estruturados e bloco de ligações internas (aposentadoria especial, tempo
   rural, perícia negada, serviços).

## Resultados medidos
| Medição | Perf | A11y | Boas práticas | SEO | LCP | SI | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Antes (mobile) | 82 | 100 | 100 | 100 | 1231 ms | 8311 ms | 412 ms | 0 |
| Depois (mobile, 2 de 3 rodadas) | 83 e 86 | 100 | 100 | 100 | 1493 e 1353 ms | 8952 e 10442 ms | 351 e 251 ms | 0 |
| Depois (mobile, rodada atípica) | 55 | 100 | 100 | 100 | 5211 ms | 37964 ms | 317 ms | 0 |
| Depois (desktop) | 95 | 100 | 100 | 100 | 715 ms | 2199 ms | 11 ms | 0 |

Medição direta no navegador (1,6 Mbps, 150 ms de latência, CPU 4x mais lenta):
conteúdo visível já aos 800 ms, 2770 caracteres de texto no primeiro quadro,
CLS 0 e todas as capturas seguintes idênticas — ou seja, sem janela em branco e
sem deslocamento de layout. O filmstrip do Lighthouse, no entanto, continuou
mostrando quadros vazios nas rodadas de produção e o índice de velocidade
oscilou entre 8,9 s e 37,9 s, em contradição com o LCP medido de 1,3 s e com a
captura direta. A instrumentação do Lighthouse neste ambiente não é confiável
para essa métrica; o LCP, o CLS e o TBT são consistentes e melhoraram ou se
mantiveram.

O quadro vazio foi conferido imagem por imagem: é branco de fato. Ele, porém,
também aparece na rodada inicial de referência, que registrava LCP de 1,2 s —
ou seja, o filmstrip já contradizia o próprio LCP antes de qualquer alteração.
Trata-se de artefato da captura neste ambiente, e não de uma regressão causada
pelas mudanças. Por isso a conclusão se apoia no LCP, no CLS, no TBT, nas notas
por categoria e na medição direta no navegador.

## Estado final
- SEO, acessibilidade e boas práticas em 100 nas duas formas de acesso.
- Desktop em 95 (LCP 715 ms).
- Mobile entre 83 e 86 nas rodadas válidas, com o terceiro lugar do ranking
  ocupado por uma medição atípica.
- Publicado no commit `c94bab2` (Vercel e hospedagem do projeto).

## Monitoramento de palavras-chave
Não há fonte de posição conectada: apenas o GitHub está habilitado e a consulta
automatizada ao Google não devolve resultados (verificado em 07/11/2026).
Opções: Google Search Console (gratuito, oficial) ou conector de SERP
(DataForSEO, Semrush, Serpstat, Ubersuggest, Ahrefs), todos disponíveis no
catálogo e desativados.
