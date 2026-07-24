import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ISS from "./pages/ISS";
import Previdenciario from "./pages/Previdenciario";
import CTC from "./pages/CTC";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/iss"} component={ISS} />
      <Route path={"/prev"} component={Previdenciario} />
      <Route path={"/previdenciario"} component={Previdenciario} />
      <Route path={"/ctc"} component={CTC} />

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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
