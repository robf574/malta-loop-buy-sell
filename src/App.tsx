import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { PageLoadingSpinner } from "@/components/ui/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { errorMonitor } from "@/lib/analytics";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load heavy components
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Sell = lazy(() => import("./pages/Sell"));
const Wanted = lazy(() => import("./pages/Wanted"));
const Events = lazy(() => import("./pages/Events"));
const Services = lazy(() => import("./pages/Services"));
const LeavingIsland = lazy(() => import("./pages/LeavingIsland"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Account = lazy(() => import("./pages/Account"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ListingDetail = lazy(() => import("./pages/ListingDetail"));

const queryClient = new QueryClient();

// Initialize error monitoring
errorMonitor.init();

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
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <GitHubPagesRedirect />
          <BrowserRouter basename="/malta-loop-buy-sell">
            <Suspense fallback={<PageLoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/wanted" element={<Wanted />} />
                <Route path="/events" element={<Events />} />
                <Route path="/services" element={<Services />} />
                <Route path="/leaving-island" element={<LeavingIsland />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/account" element={<Account />} />
                <Route path="/listing/:id" element={<ListingDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
