# Fontes locais — origem e integração

As fontes foram obtidas dos pacotes oficiais Fontsource, que distribuem os arquivos do Google Fonts para auto-hospedagem:

- `@fontsource-variable/playfair-display@5.3.0`, família Google Fonts **Playfair Display**, fonte declarada no pacote como `https://github.com/google/fonts`, licença SIL Open Font License 1.1.
- `@fontsource-variable/inter@5.3.0`, família **Inter**, fonte declarada no pacote como `https://github.com/google/fonts`, licença SIL Open Font License 1.1.
- Documentação Fontsource sobre auto-hospedagem: `https://fontsource.org/docs/getting-started/introduction`.
- Página oficial Playfair Display no Google Fonts: `https://fonts.google.com/specimen/Playfair+Display`.
- Página oficial Inter no Google Fonts: `https://fonts.google.com/specimen/Inter`.
- Texto integral das licenças: `LICENSE-Playfair-Display-OFL-1.1.txt` e `LICENSE-Inter-OFL-1.1.txt` nesta pasta.

Os arquivos são variáveis e normais, sem itálico:

- Playfair Display: eixo `wght` de 400 a 900; portanto cobre os pesos 600, 700 e 800.
- Inter: eixo `wght` de 100 a 900; portanto cobre os pesos 400, 500, 600 e 700.
- Cada família tem uma face `latin` para ASCII e acentos portugueses e uma face complementar `latin-ext`; os `unicode-range` oficiais estão em `client/src/styles/fonts.css`.

## Arquivos entregues

| Arquivo | Bytes | SHA-256 |
| --- | ---: | --- |
| `playfair-display-latin-wght-normal.woff2` | 38.404 | `e0c764a8e9e1cce92163c55bac4b2ad6cd4cf8c696ce2289ab5c41565e65b7e2` |
| `playfair-display-latin-ext-wght-normal.woff2` | 21.140 | `42898ad49a6b23f32b109243e1df596edf831015ed685f429e4dafbb181d599d` |
| `inter-latin-wght-normal.woff2` | 48.256 | `3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62` |
| `inter-latin-ext-wght-normal.woff2` | 85.068 | `34b9c504cab7a73e37b746343a449132e56cf7b5481af2cb81dc74dcff25c956` |

Os quatro arquivos foram lidos com `fontTools 4.66.0`: todos são WOFF2 (`flavor=woff2`) e mantêm o eixo variável `wght`. A face `latin` de cada família contém `ã`, `á`, `ç`, `õ`, `Á`, `Ç`, `é`, `ê`, `í`, `ó`, `ú` e `º`.

## Integração recomendada

Importar uma vez no entrypoint CSS/TS já usado pelo app, sem adicionar dependência:

```css
@import "./styles/fonts.css";
```

ou, se o import for feito no entrypoint TS/TSX:

```ts
import "./styles/fonts.css";
```

O preload crítico para esta rota deve ser somente o Playfair usado no header/H1. Colocar no `<head>` antes da folha de estilos, sem manter o `<link>` remoto do Google Fonts:

```html
<link
  rel="preload"
  href="/fonts/playfair-display-latin-wght-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

A variante `latin` já contém os acentos portugueses; não é necessário pré-carregar a `latin-ext`. O Inter permanece local e com `font-display: optional` para CTC/existentes, mas não é pré-carregado, pois o `body` atual usa o sans padrão do Tailwind e antecipar essa fonte poderia introduzir uma troca/layout extra.

`font-display: optional` foi usado nas faces reais. Não há JavaScript aguardando fonte, conteúdo mascarado, ou fallback com `size-adjust`/métricas artificiais.
