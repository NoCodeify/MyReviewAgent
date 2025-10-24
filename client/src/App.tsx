import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DynamicContentProvider } from "@/contexts/DynamicContentContext";
import LandingV1 from "@/landing/v1";
import NotFound from "@/pages/not-found";
import Clarity from '@microsoft/clarity';

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingV1} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Microsoft Clarity for analytics
  Clarity.init('ta73lpsqxt');

  return (
    <QueryClientProvider client={queryClient}>
      <DynamicContentProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </DynamicContentProvider>
    </QueryClientProvider>
  );
}

export default App;
