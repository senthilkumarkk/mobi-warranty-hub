import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";
import RegisterWarranty from "./pages/RegisterWarranty";
import ServiceRequest from "./pages/ServiceRequest";
import ServiceHistory from "./pages/ServiceHistory";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/register-warranty" element={<ProtectedRoute><RegisterWarranty /></ProtectedRoute>} />
          <Route path="/service-request" element={<ProtectedRoute><ServiceRequest /></ProtectedRoute>} />
          <Route path="/service-history" element={<ProtectedRoute><ServiceHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
