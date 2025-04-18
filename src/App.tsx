
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import ChatWithDoctor from "./pages/ChatWithDoctor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/medications" 
            element={
              <AppLayout>
                <Medications />
              </AppLayout>
            } 
          />
          <Route 
            path="/appointments" 
            element={
              <AppLayout>
                <Appointments />
              </AppLayout>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <AppLayout>
                <ChatWithDoctor />
              </AppLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
