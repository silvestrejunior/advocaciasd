import { Suspense } from "react";
import { TagGoogle } from "@/components/site/TagGoogle";
import { AvisoCookies } from "@/components/site/AvisoCookies";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PAGINA_NAO_ENCONTRADA, ROTAS, criarPagina } from "@/lib/paginas";

/**
 * Cada página é carregada sob demanda. O HTML pré-renderizado é a primeira
 * pintura; `precarregarRota` (em main.tsx) baixa o módulo da rota antes da
 * montagem, então a página renderiza de forma síncrona e o conteúdo estático
 * não é substituído por uma tela vazia.
 */
const PAGINAS = ROTAS.map(rota => ({
  caminho: rota.caminho,
  Componente: criarPagina(rota.carregar).Pagina,
}));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={null}>
      <Switch>
        {PAGINAS.map(({ caminho, Componente }) => (
          <Route key={caminho} path={caminho} component={Componente} />
        ))}
        {/* Final fallback route */}
        <Route component={PAGINA_NAO_ENCONTRADA.Pagina} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <Router />
        <TagGoogle />
        <AvisoCookies />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
