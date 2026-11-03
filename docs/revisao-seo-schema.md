# Revisão de SEO e dados estruturados — aposentadoria especial na saúde

Revisão feita em 26/10/2026 sobre o HTML gerado do build de prévia, antes do deploy.
Rota: `/aposentadoria-especial-saude`.

## 1. Metatags — conferido, sem pendências

| Item | Situação |
| --- | --- |
| `<title>` | "Aposentadoria especial na saúde: enfermagem, médicos e mais" — 59 caracteres |
| `description` | 129 caracteres, com a dúvida do leitor e o PPP |
| `canonical` | `https://www.advocaciasd.com.br/aposentadoria-especial-saude` — igual ao padrão do site (o domínio normaliza barra final e `.html` para essa forma) |
| `robots` | `index, follow, max-image-preview:large, max-snippet:-1` |
| Open Graph | `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:image`, `og:url` |
| Twitter | `summary_large_image` com título, descrição e imagem |
| Hierarquia | 1 H1, 8 H2 (um por bloco) e 21 H3 nos cartões e passos |

## 2. Dados estruturados — o que está no HTML

Bloco `jsonld-pagina`, com cinco nós:

- `WebSite` (`#site`) e `LegalService` (`#escritorio`) — padrão do site, repetidos em todas as páginas;
- `WebPage` — nome, descrição, URL, idioma, `dateModified` 2026-10-26, `isPartOf` e `about`;
- `LegalService` da página — nome, URL, área de atendimento (Brasil) e endereço com CEP 87020-015;
- `FAQPage` — as 6 perguntas, cada uma com `name` e `acceptedAnswer.text`;
- `BreadcrumbList` — os quatro níveis, iguais à trilha visível, todos com URL.

Todos os blocos são JSON válido e conferem com o conteúdo da página.

## 3. Pendências encontradas e resolução na avaliação final

### 3.1 Respostas do acordeão não estavam no HTML — resolvido em 03/11/2026

Antes da correção, só a resposta da primeira pergunta existia no HTML. As outras cinco existiam
apenas dentro do `FAQPage`.

O Google pede que a pergunta e a resposta do `FAQPage` estejam visíveis na página. Do jeito que
está, o schema declara respostas que o HTML não mostra.

Correção aplicada: a resposta agora é sempre montada no HTML e apenas fica recolhida quando
fechada, com `hidden`, `aria-controls`, `aria-labelledby` e IDs estáveis ligando botão e resposta.
O visual e o comportamento do acordeão continuam iguais e a mudança vale para todas as páginas
com perguntas frequentes.

### 3.2 Dois `LegalService` com dados diferentes — resolvido em 03/11/2026

| Campo | Nó global `#escritorio` | Nó da página |
| --- | --- | --- |
| Nome | Santana Daufenbach Advocacia | Santana Daufenbach Advocacia Previdenciária |
| Endereço | Av. João Paulino Vieira Filho, 625, sala 708 - Torre 2 | Avenida João Paulino Vieira Filho, 625, sala 708, torre 2 |
| CEP | ausente | 87020-015 |
| Telefone | +5544998563465 | ausente |

Correção aplicada: permanece um único `LegalService` (`#escritorio`), com o CEP `87020-015` no nó
global. A página usa esse nó como referência por `"provider": {"@id": "...#escritorio"}` e não
cria um segundo negócio.

### 3.3 Detalhes menores — resolvidos em 03/11/2026

- Foram adicionados `og:image:alt`, `og:image:width`, `og:image:height` e `twitter:image:alt`.
- Esta página passou a usar a imagem própria do ambiente hospitalar no compartilhamento social.
- `description` com 129 caracteres: cabem mais 15 a 25 caracteres com uma frase de benefício.
- O `FAQPage` continua válido, mas desde 2023 o Google mostra o resultado enriquecido de perguntas
  apenas para sites de governo e de saúde consolidados. Não é defeito; é expectativa.

## 4. Sugestão de ordem

1. Item 3.1 (respostas no HTML) e item 3.2 (um único `LegalService` com CEP) — são os que mexem de
   verdade em como o Google lê a página.
2. Item 3.3 (alt, dimensões e texto da descrição) — ajustes rápidos no componente de SEO.
3. Imagem de compartilhamento própria — pode ficar para depois do deploy.
