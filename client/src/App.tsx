import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ResearchPage from "@/pages/Research";
import PressPage from "@/pages/Press";
import EventPage from "@/pages/Events";
import MediaPage from "@/pages/Media";
import TitleDescNewsletter from "@/pages/TitleDescNewsletter";
import "./i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* List pages */}
      <Route path="/research" component={ResearchPage} />
      <Route path="/press" component={PressPage} />
      <Route path="/events" component={EventPage} />
      <Route path="/media" component={MediaPage} />

      {/* Detail pages (same components handle routing based on :slug) */}
      <Route path="/research/:slug" component={TitleDescNewsletter} />
      <Route path="/press/:slug" component={TitleDescNewsletter} />
      <Route path="/events/:slug" component={TitleDescNewsletter} />
      <Route path="/media/:slug" component={TitleDescNewsletter} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
