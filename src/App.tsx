import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";

// Pages
import { HomePage } from "./components/pages/HomePage";
import { GalleryPage } from "./components/pages/GalleryPage";
import { ArtworkDetailPage } from "./components/pages/ArtworkDetailPage";
import { CartPage } from "./components/pages/CartPage";
import { CheckoutPage } from "./components/pages/CheckoutPage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogDetailPage } from "./components/pages/BlogDetailPage";
import { CommissionPage } from "./components/pages/CommissionPage";
import { AboutPage } from "./components/pages/AboutPage";
import { WishlistPage } from "./components/pages/WishlistPage";

import ShippingReturnsPage from "./components/pages/ShippingReturnsPage";
import PrivacyPolicyPage from "./components/pages/PrivacyPolicyPage";
import TncPage from "./components/pages/TncPage";
import ContactPage from "./components/pages/ContactPage";

import { OrderSuccessPage } from "./components/pages/OrderSuccessPage";

// Context
import { AppProvider, useApp } from "./context/AppContext";

// Globals
import { NewsletterPopup } from "./components/NewsletterPopup";
import { Toaster } from "./components/ui/sonner";

// -----------------------------------------------------------------------------
// AUTH GUARDS
// -----------------------------------------------------------------------------
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
}

// -----------------------------------------------------------------------------
// MAIN APP
// -----------------------------------------------------------------------------
export default function App() {
  return (
    <AppProvider>
      <Router>

        <Routes>
          {/* ⭐ Page WITHOUT Layout (no header/footer) */}
          <Route path="/order-success" element={<OrderSuccessPage />} />

          {/* ⭐ All pages WITH Layout */}
          <Route element={<Layout />}>

            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Static Policy Pages */}
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TncPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Cart */}
            <Route path="/cart" element={<CartPage />} />

            {/* ⭐ Auth Required */}
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <CheckoutPage />
                </RequireAuth>
              }
            />

            <Route
              path="/wishlist"
              element={
                <RequireAuth>
                  <WishlistPage />
                </RequireAuth>
              }
            />

            {/* ⭐ Admin */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />

          </Route>
        </Routes>

        {/* Global Components */}
        <NewsletterPopup />
        <Toaster />

      </Router>
    </AppProvider>
  );
}
