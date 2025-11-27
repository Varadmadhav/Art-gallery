import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/pages/HomePage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ArtworkDetailPage } from './components/pages/ArtworkDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { CommissionPage } from './components/pages/CommissionPage';
import { AboutPage } from './components/pages/AboutPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AppProvider, useApp } from './context/AppContext';
import { NewsletterPopup } from './components/NewsletterPopup';
import { Toaster } from './components/ui/sonner';

// 🔒 LOGIN REQUIRED
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// 🔒 ADMIN ONLY ROUTE
function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>

            {/* 🔓 PUBLIC ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 🔓 CART IS NOW PUBLIC */}
            <Route path="/cart" element={<CartPage />} />

            {/* 🔒 LOGGED-IN USERS ONLY */}
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

            {/* 🔒 ADMIN ONLY */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />

          </Routes>
        </Layout>

        <NewsletterPopup />
        <Toaster />
      </Router>
    </AppProvider>
  );
}
