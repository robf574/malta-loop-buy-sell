import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Sell from "./pages/Sell";
import Wanted from "./pages/Wanted";
import Events from "./pages/Events";
import Services from "./pages/Services";
import Inbox from "./pages/Inbox";
import Account from "./pages/Account";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// GitHub Pages redirect handling
const GitHubPagesRedirect = () => {
  useEffect(() => {
    // Check if we're on GitHub Pages and need to redirect
    if (window.location.pathname.includes('/?/')) {
      const path = window.location.pathname.split('/?/')[1];
      if (path) {
        window.history.replaceState(null, '', '/malta-loop-buy-sell/' + path);
      }
    }
  }, []);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GitHubPagesRedirect />
      <BrowserRouter basename="/malta-loop-buy-sell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/wanted" element={<Wanted />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Services />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account" element={<Account />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
