import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmailLogin } from "./pages/EmailLogin";
import { PasswordLogin } from "./pages/PasswordLogin";
import { LicenseCode } from "./pages/LicenseCode";
import { CreateAccount } from "./pages/CreateAccount";
import { MyProducts } from "./pages/MyProducts";
import { ScanProduct } from "./pages/ScanProduct";
import { ProductDetails } from "./pages/ProductDetails";
import { AddManually } from "./pages/AddManually";
import { Settings } from "./pages/Settings";
import { Share } from "./pages/Share";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmailLogin />} />
          <Route path="/password-login" element={<PasswordLogin />} />
          <Route path="/license-code" element={<LicenseCode />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/add-manually" element={<AddManually />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/share" element={<Share />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
