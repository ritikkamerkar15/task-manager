
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import RoleManagementPage from "./pages/RoleManagementPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/todo" element={<Index />} />
          <Route path="/inprogress" element={<Index />} />
          <Route path="/completed" element={<Index />} />
          <Route path="/blocked" element={<Index />} />
          <Route path="/inbox" element={<Index />} />
          <Route path="/calendar" element={<Index />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/roles" element={<RoleManagementPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
