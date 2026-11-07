import { lazy, Suspense } from "react";
import { TagGoogle } from "@/components/site/TagGoogle";
import { AvisoCookies } from "@/components/site/AvisoCookies";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

/**
 * Cada página é carregada sob demanda. O HTML pré-renderizado entrega o
 * conteúdo completo para leitores e buscadores; a divisão por rota evita
 * baixar o código das 39 rotas antes da primeira pintura, encurtando a
 * janela em que a montagem do React substitui o conteúdo estático.
 */
const Home = lazy(() => import("./pages/Home"));
const SeuCaso = lazy(() => import("./pages/SeuCaso"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Cuidados = lazy(() => import("./pages/Cuidados"));
const AposentadoriaEspecial = lazy(
  () => import("./pages/AposentadoriaEspecial")
);
const AposentadoriaEspecialSaude = lazy(
  () => import("./pages/AposentadoriaEspecialSaude")
);
const AposentadoriaAcsAce = lazy(() => import("./pages/AposentadoriaAcsAce"));
const ComoPedirAposentadoria = lazy(
  () => import("./pages/ComoPedirAposentadoria")
);
const AposentadoriaNegada = lazy(() => import("./pages/AposentadoriaNegada"));
const PericiaNegada = lazy(() => import("./pages/PericiaNegada"));
const TempoRural = lazy(() => import("./pages/TempoRural"));
const BeneficiosPorIncapacidade = lazy(
  () => import("./pages/BeneficiosPorIncapacidade")
);
const AuxilioAcidente = lazy(() => import("./pages/AuxilioAcidente"));
const ServidoresPublicos = lazy(() => import("./pages/ServidoresPublicos"));
const PlanejamentoDeAposentadoria = lazy(
  () => import("./pages/PlanejamentoDeAposentadoria")
);
const PerdeuOBeneficio = lazy(() => import("./pages/PerdeuOBeneficio"));
const RevisaoDeAposentadoria = lazy(
  () => import("./pages/RevisaoDeAposentadoria")
);
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const CTC = lazy(() => import("./pages/CTC"));
const Privacidade = lazy(() => import("./pages/Privacidade"));
const Blog = lazy(() => import("./pages/Blog"));
const Artigo = lazy(() => import("./pages/Artigo"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/seu-caso"} component={SeuCaso} />
        <Route path={"/servicos"} component={Servicos} />
        <Route path={"/cuidados"} component={Cuidados} />
        <Route
          path={"/aposentadoria-especial"}
          component={AposentadoriaEspecial}
        />
        <Route
          path={"/aposentadoria-especial-saude"}
          component={AposentadoriaEspecialSaude}
        />
        <Route
          path={"/aposentadoria-saude"}
          component={AposentadoriaEspecialSaude}
        />
        <Route
          path={"/aposentadoria-acs-ace"}
          component={AposentadoriaAcsAce}
        />
        <Route
          path={"/como-pedir-aposentadoria"}
          component={ComoPedirAposentadoria}
        />
        <Route path={"/aposentadoria-negada"} component={AposentadoriaNegada} />
        <Route path={"/pericia-negada"} component={PericiaNegada} />
        <Route path={"/tempo-rural"} component={TempoRural} />
        <Route
          path={"/beneficios-por-incapacidade"}
          component={BeneficiosPorIncapacidade}
        />
        <Route path={"/auxilio-acidente"} component={AuxilioAcidente} />
        <Route path={"/servidores-publicos"} component={ServidoresPublicos} />
        <Route
          path={"/planejamento-de-aposentadoria"}
          component={PlanejamentoDeAposentadoria}
        />
        <Route path={"/perdeu-o-beneficio"} component={PerdeuOBeneficio} />
        <Route
          path={"/revisao-de-aposentadoria"}
          component={RevisaoDeAposentadoria}
        />
        <Route path={"/como-funciona"} component={ComoFunciona} />
        <Route path={"/sobre"} component={Sobre} />
        <Route path={"/contato"} component={Contato} />
        <Route path={"/ctc"} component={CTC} />
        <Route path={"/privacidade"} component={Privacidade} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={Artigo} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
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
