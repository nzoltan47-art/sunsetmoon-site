import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import CityPage from "@/pages/city/CityPage";
import Cities from "@/pages/Cities";
import Country from "@/pages/Country";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import CountryPage from "@/pages/country/CountryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/sunset/:city" component={CityPage} />
      <Route path="/moon/:city" component={CityPage} />
      <Route path="/golden-hour/:city" component={CityPage} />

      <Route path="/country/:country" component={CountryPage} />

      <Route path="/cities" component={Cities} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />

          <footer className="text-center text-white/60 text-sm py-8 mt-20">
            <div className="flex justify-center gap-6 flex-wrap">
              <a href="/about" className="hover:text-white">About</a>
              <a href="/privacy" className="hover:text-white">Privacy</a>
              <a href="/terms" className="hover:text-white">Terms</a>
              <a href="/contact" className="hover:text-white">Contact</a>
            </div>
          </footer>

        </WouterRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
