# Página: aposentadoria especial na saúde

Página criada em 26/10/2026, em prévia para aprovação. **Nada foi publicado.**

## Rota e arquivos

| Item | Caminho |
| --- | --- |
| Página | `client/src/pages/AposentadoriaEspecialSaude.tsx` |
| Rota | `/aposentadoria-especial-saude` (`client/src/App.tsx`) |
| Manifesto e sitemap | `scripts/gerar-conteudo.mjs` (lista `ROTAS_BASE`) |
| Cartão na página irmã | `client/src/pages/AposentadoriaEspecial.tsx` |
| Frase final no artigo | `client/src/data/blog/agentes-biologicos-na-saude-tempo-especial.json` + `client/src/pages/Artigo.tsx` |
| Mensagem própria de WhatsApp | `SiteHeader`, `SiteFooter` e `BotaoWhatsApp` aceitam `mensagem` (opcional, sem mudar as outras páginas) |

## Estrutura (na ordem pedida)

1. Topo só com tipografia: trilha com quatro níveis, selo "Profissionais da saúde", H1, dois parágrafos, dois botões e a linha "Você não precisa enviar documentos neste primeiro contato."
2. "Quem pode ter direito": 8 profissões em cartões (enfermeiro, técnico/auxiliar, médico, dentista, fisioterapeuta, farmacêutico/bioquímico, radiologia, agente de saúde/endemias) e a frase de fecho sobre o que cada período registrado decide.
3. "O setor pesa tanto quanto a profissão": texto + 6 setores em etiquetas.
4. "Últimas mudanças": os dois cartões da página de aposentadoria especial (STF, junho/2026 e TNU, Tema 383, setembro/2026), com o primeiro parágrafo do cartão da TNU trocado pela redação pedida e a nota de referências.
5. "Cada vínculo tem a sua análise": 6 itens, com link no item do PPP para o artigo sobre os campos do PPP.
6. "Como funciona": o bloco de três passos com o texto do passo 1 alterado e os botões desta página.
7. Perguntas frequentes: as 6 perguntas, no acordeão do site.
8. Chamada final em fundo escuro.

Depois: "Veja também" e o rodapé, iguais aos da página de aposentadoria especial.

## Verificações feitas

- Build e pré-renderização das 36 rotas sem erro de tipagem; rota incluída no manifesto e no sitemap.
- Um único H1, oito H2; título, descrição, canônica e dados estruturados (WebPage, LegalService com o nome e o endereço pedidos, FAQPage e BreadcrumbList).
- Sete botões de WhatsApp, todos com a mensagem pedida e o mesmo endereço; as páginas já existentes continuam com as mensagens anteriores.
- Links internos da página e das rotas ligadas (artigos, cuidados, servidores) respondendo 200.
- Clique em botão de WhatsApp disparando a conversão `AW-17096336975/0KROCN2brKcdEM_Mldg_` e o evento `whatsapp_click` com a página de origem.
- Acordeão abrindo e fechando; nenhum erro no console; nenhuma barra de rolagem horizontal em 390 px.

## Para publicar depois da aprovação

1. Salvar a versão (checkpoint) no repositório do projeto.
2. Enviar a `main` do GitHub, que dispara o deploy do domínio `www.advocaciasd.com.br`.