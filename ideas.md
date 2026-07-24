# Ideias de Design — Santana Daufenbach

Site focado em recuperação e isenção de ISS em obras de saneamento básico para construtoras.

---

<response>
<idea>
**Design Movement:** Corporate Brutalism Refinado — solidez estrutural com tipografia assertiva e espaços brancos estratégicos

**Core Principles:**
1. Autoridade visual através de blocos de cor sólidos e tipografia pesada
2. Assimetria deliberada: colunas desiguais e seções que "quebram" o grid
3. Dados e números em destaque como elementos visuais primários
4. Contraste extremo entre fundos escuros e texto branco

**Color Philosophy:** Azul royal profundo (#1E5FA8) como cor dominante, transmitindo confiança institucional. Ciano (#29ABE2) como acento de energia e modernidade. Cinza escuro (#2D3748) para seções alternadas. O branco puro cria respiração entre os blocos densos.

**Layout Paradigm:** Seções em blocos de largura total com divisórias diagonais (clip-path). Hero com texto à esquerda ocupando 60% e elemento visual à direita. Cards de serviço em layout 3-colunas com borda esquerda colorida.

**Signature Elements:**
1. Linhas diagonais de corte entre seções (clip-path polygon)
2. Números grandes em destaque (ex: "5 anos", "R$ milhões recuperados")
3. Ícones lineares em azul ciano sobre fundo escuro

**Interaction Philosophy:** Scroll suave com fade-in das seções. Hover nos cards eleva levemente com sombra. CTA de WhatsApp flutuante sempre visível.

**Animation:** Entrada das seções com translateY(30px) → 0 + opacity 0 → 1 em 0.6s. Números contam de 0 ao valor final ao entrar na viewport.

**Typography System:** Títulos em Barlow Condensed Bold (impacto industrial), corpo em Source Sans Pro Regular (legibilidade corporativa). Subtítulos em caixa alta com letter-spacing amplo.
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement:** Corporate Modernismo Limpo — elegância jurídica com toque tecnológico

**Core Principles:**
1. Hierarquia visual clara com espaçamento generoso entre elementos
2. Tipografia serif para títulos (autoridade) + sans-serif para corpo (clareza)
3. Paleta restrita: azul, branco e cinza com ciano apenas para destaques
4. Credibilidade através de layout estruturado e profissional

**Color Philosophy:** Fundo branco puro para seções principais, transmitindo transparência e clareza. Azul royal (#1E5FA8) para header e seções de destaque. Ciano (#29ABE2) exclusivamente para CTAs e elementos interativos. Cinza claro (#F7F9FC) para seções alternadas.

**Layout Paradigm:** Navegação fixa no topo com logo à esquerda. Hero com fundo azul royal, texto centralizado e imagem de obra de saneamento ao fundo com overlay. Seções alternando fundo branco e cinza claro. Cards em grid 3 colunas com sombra suave.

**Signature Elements:**
1. Linha horizontal azul ciano como separador de seções
2. Cards com canto superior esquerdo cortado (clip-path) em azul
3. Citação legal em destaque com borda esquerda ciano

**Interaction Philosophy:** Transições suaves e discretas. Hover em links com sublinhado deslizante. Botão WhatsApp pulsante no canto inferior direito.

**Animation:** Fade-in simples ao scroll. Parallax leve no hero. Hover nos cards com border-color transition.

**Typography System:** Títulos em Playfair Display Bold (autoridade jurídica), corpo em Nunito Regular (acessibilidade), labels em Nunito SemiBold caixa alta.
</idea>
<probability>0.07</probability>
</response>

<response>
<idea>
**Design Movement:** Engenharia Financeira — precisão técnica com linguagem de infraestrutura

**Core Principles:**
1. Linguagem visual que conecta direito tributário + engenharia civil
2. Dados financeiros como elementos de design (gráficos, porcentagens, valores)
3. Layout assimétrico com sidebar de navegação vertical
4. Texturas sutis evocando plantas de engenharia (grid fino, linhas técnicas)

**Color Philosophy:** Fundo off-white levemente azulado (#F0F4F8) para o corpo, remetendo a papel técnico. Azul escuro (#1A365D) para elementos de autoridade. Ciano vibrante (#00AEEF) para CTAs e destaques financeiros. Cinza médio (#4A5568) para texto secundário.

**Layout Paradigm:** Hero dividido verticalmente: lado esquerdo com fundo azul escuro e texto, lado direito com imagem de obra com overlay técnico (grid lines). Seções com layout de 2 colunas assimétricas (40/60). Timeline horizontal para o processo de atuação.

**Signature Elements:**
1. Grid técnico fino como textura de fundo em seções claras
2. Badges de "Aprovado pelo STJ" / "Jurisprudência consolidada" em verde
3. Gráfico de barras animado mostrando economia tributária

**Interaction Philosophy:** Hover revela detalhes técnicos. Tooltips com explicações jurídicas. Scroll horizontal na timeline do processo.

**Animation:** Contagem animada de valores financeiros. Barras de progresso preenchendo ao entrar na viewport. Linhas do grid se desenhando progressivamente.

**Typography System:** Títulos em Space Grotesk Bold (técnico-moderno), corpo em IBM Plex Sans Regular (precisão técnica), números em Space Mono (dados financeiros).
</idea>
<probability>0.06</probability>
</response>

---

## Decisão

**Escolhida: Opção 2 — Corporate Modernismo Limpo**

Justificativa: Para um escritório de advocacia que precisa transmitir credibilidade e confiança a construtoras, o design limpo e profissional com tipografia de autoridade é o mais adequado. A paleta fiel à identidade visual do escritório (azul royal + ciano) garante consistência de marca. O layout estruturado facilita a leitura e navegação para o público-alvo (gestores e diretores de construtoras).
