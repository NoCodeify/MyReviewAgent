import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DynamicContentProvider } from "@/contexts/DynamicContentContext";
import LandingV1 from "@/landing/v1";
import LandingV1A from "@/landing/v1/indexA";
import LandingV1B from "@/landing/v1/indexB";
// import LandingV2 from "@/landing/v2";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Checkout from "@/pages/Checkout";
import Clarity from '@microsoft/clarity';

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingV1} />
      <Route path="/a" component={LandingV1A} />
      <Route path="/b" component={LandingV1B} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/checkout" component={Checkout} />
      {/* <Route path="/v2" component={LandingV2} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Microsoft Clarity for experiments tracking
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
