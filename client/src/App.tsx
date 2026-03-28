import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EveryArticlePage from "@/pages/EveryArticle";
import ResearchPage from "@/pages/Research";
import PressPage from "@/pages/Press";
import EventPage from "@/pages/Events";
import MediaPage from "@/pages/Media";
import TitleDescNewsletter from "@/pages/TitleDescNewsletter";
import Regions from "@/pages/Regions";
import RegionDetail from "@/pages/RegionDetail";
import About from "@/pages/About";
import GetInvolved from "@/pages/GetInvolved";
import ChatBot from "@/components/ui/ChatBot";
import "./i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* List pages */}
      <Route path="/articles" component={EveryArticlePage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/press" component={PressPage} />
      <Route path="/events" component={EventPage} />
      <Route path="/media" component={MediaPage} />

      {/* Regional Focus pages */}
      <Route path="/regions" component={Regions} />
      <Route path="/regions/:region" component={RegionDetail} />

      {/* About pages */}
      <Route path="/about" component={About} />
      <Route path="/about/:section" component={About} />

      {/* Get Involved */}
      <Route path="/get-involved" component={GetInvolved} />

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
        <ChatBot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
