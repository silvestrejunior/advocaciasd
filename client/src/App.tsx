import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AposentadoriaINSS from "./pages/AposentadoriaINSS";
import AposentadoriaEspecial from "./pages/AposentadoriaEspecial";
import AposentadoriaServidorPublico from "./pages/AposentadoriaServidorPublico";
import Beneficios from "./pages/Beneficios";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import ISS from "./pages/ISS";
import CTC from "./pages/CTC";

/** Volta ao topo ao trocar de página, respeitando os links com âncora. */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/aposentadoria-inss"} component={AposentadoriaINSS} />
      <Route path={"/aposentadoria-especial"} component={AposentadoriaEspecial} />
      <Route
        path={"/aposentadoria-servidor-publico"}
        component={AposentadoriaServidorPublico}
      />
      <Route path={"/beneficios"} component={Beneficios} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/iss"} component={ISS} />
      <Route path={"/ctc"} component={CTC} />
      <Route path={"/prev"}>
        <Redirect to="/aposentadoria-inss" />
      </Route>
      <Route path={"/previdenciario"}>
        <Redirect to="/aposentadoria-inss" />
      </Route>

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
