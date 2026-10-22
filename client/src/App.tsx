import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SeuCaso from "./pages/SeuCaso";
import Servicos from "./pages/Servicos";
import Cuidados from "./pages/Cuidados";
import AposentadoriaEspecial from "./pages/AposentadoriaEspecial";
import AposentadoriaNegada from "./pages/AposentadoriaNegada";
import PericiaNegada from "@/pages/PericiaNegada";
import TempoRural from "@/pages/TempoRural";
import BeneficiosPorIncapacidade from "./pages/BeneficiosPorIncapacidade";
import AuxilioAcidente from "./pages/AuxilioAcidente";
import ServidoresPublicos from "./pages/ServidoresPublicos";
import PlanejamentoDeAposentadoria from "./pages/PlanejamentoDeAposentadoria";
import PerdeuOBeneficio from "./pages/PerdeuOBeneficio";
import RevisaoDeAposentadoria from "./pages/RevisaoDeAposentadoria";
import ComoFunciona from "./pages/ComoFunciona";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import CTC from "./pages/CTC";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/seu-caso"} component={SeuCaso} />
      <Route path={"/servicos"} component={Servicos} />
      <Route path={"/cuidados"} component={Cuidados} />
      <Route path={"/aposentadoria-especial"} component={AposentadoriaEspecial} />
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
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
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
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
