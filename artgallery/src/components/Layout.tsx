import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Instagram, Facebook, Mail } from 'lucide-react';

// --- 1. MOCKED DEPENDENCIES (To make the Layout run independently) ---

// Mock Button Component (replaces ./ui/button)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}
const Button = ({ className = '', variant = 'default', size = 'default', ...props }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-amber-700 text-white hover:bg-amber-800",
    outline: "border border-neutral-200 bg-transparent hover:bg-neutral-100 text-neutral-900",
    ghost: "hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props} 
    />
  );
};

// Mock AppContext (replaces ../context/AppContext)
interface AppContextType {
  cart: any[];
  wishlist: any[];
  user: { name: string; isAdmin: boolean } | null;
  logout: () => void;
}
const AppContext = createContext<AppContextType>({ cart: [], wishlist: [], user: null, logout: () => {} });
const useApp = () => useContext(AppContext);

// --- 2. LAYOUT COMPONENT (Main Request) ---

function Layout({ children }: { children: React.ReactNode }) {
  const { cart, wishlist, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  // Helper for link classes - Reverted to dark text for light header
  const getLinkClasses = (path: string) => {
    return `text-sm transition-colors ${
      isActive(path) 
        ? 'text-amber-700 font-medium' 
        : 'text-neutral-700 hover:text-amber-700'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header - Reverted to Light/Translucent Style */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center shadow-md group-hover:from-amber-500 group-hover:to-amber-700 transition-all">
                <span className="text-white font-serif font-bold">AH</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-neutral-900 text-lg tracking-wide">Pooja Chauhan</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">Pooja's Art Gallery</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={getLinkClasses('/')}>Home</Link>
              <Link to="/gallery" className={getLinkClasses('/gallery')}>Gallery</Link>
              <Link to="/about" className={getLinkClasses('/about')}>About</Link>
              <Link to="/commission" className={getLinkClasses('/commission')}>Commissions</Link>
              <Link to="/blog" className={getLinkClasses('/blog')}>Blog</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/wishlist" className="relative p-2 text-neutral-700 hover:text-amber-700 transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 text-neutral-700 hover:text-amber-700 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="hidden lg:flex items-center space-x-3">
                  {user.isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="hidden lg:block">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700 hover:text-amber-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Reverted to Light Background */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white absolute w-full left-0 z-50 shadow-xl">
            <nav className="px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Home</Link>
              <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Gallery</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">About</Link>
              <Link to="/commission" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Commissions</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Blog</Link>

              {user ? (
                <>
                  {user.isAdmin && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-700 hover:text-amber-800 font-medium">Admin Dashboard</Link>
                  )}
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-2 text-neutral-700 hover:text-amber-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700 font-medium">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 mt-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* About */}
            <div>
              <div className="font-serif text-white mb-4 text-lg">Pooja Chauhan</div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Contemporary artist specializing in abstract and portrait paintings. Bringing color and emotion to life through canvas.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white mb-4 font-medium">Quick Links</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/gallery" className="hover:text-amber-500 transition-colors">Gallery</Link></li>
                <li><Link to="/about" className="hover:text-amber-500 transition-colors">About</Link></li>
                <li><Link to="/commission" className="hover:text-amber-500 transition-colors">Commissions</Link></li>
                <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <div className="text-white mb-4 font-medium">Customer Service</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shipping-returns" className="hover:text-amber-500 transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-amber-500 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <div className="text-white mb-4 font-medium">Stay Connected</div>
              <p className="text-sm text-neutral-400 mb-4">
                Follow for updates on new artworks and exhibitions.
              </p>

              <div className="flex space-x-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/poojas_creative_palette/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 hover:text-white transition-all transform hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 hover:text-white transition-all transform hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919833325936?text=Hello%2C%20I%20need%20help%20regarding%20an%20artwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all transform hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M16 .3C7.3.3.3 7.3.3 16c0 2.8.7 5.4 2 7.8L0 32l8.4-2.3c2.3 1.2 4.9 1.9 7.6 1.9 8.7 0 15.7-7 15.7-15.7S24.7.3 16 .3zm0 28.6c-2.4 0-4.8-.7-6.8-1.9l-.5-.3-5 1.4 1.4-4.9-.3-.5c-1.3-2.1-2-4.4-2-6.9C2.8 8 8 2.8 16 2.8s13.2 5.2 13.2 13.2-5.2 13.2-13.2 13.2zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.2-.4-.2-.7-.2-1 .2-.3.4-1.2 1.2-1.5 1.5-.3.2-.6.3-1 .1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.3-2.3-2.7-.2-.4 0-.7.2-.9.2-.2.4-.6.6-.8s.2-.4.3-.7c.1-.2 0-.5-.1-.7-.2-.2-1-2.4-1.4-3.3-.4-.9-.8-.8-1.1-.8h-.9c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.2 0 1.9 1.4 3.7 1.6 4 .2.3 2.7 4.1 6.5 5.7 3.8 1.6 3.8 1.1 4.4 1 1-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.1-.4-.2-.8-.4z"/>
                  </svg>
                </a>

                {/* Gmail */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=poojascreativepalette@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 hover:text-white transition-all transform hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>

              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-500">
            © 2025 Pooja Chauhan Fine Art Gallery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- 3. APP ENTRY POINT (Demo) ---

const DummyPage = ({ title }: { title: string }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-3xl font-serif text-neutral-900 mb-6">{title}</h1>
    <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
      <p className="text-neutral-600">
        This is a placeholder for the {title} page. Scroll down to see the sticky header in action.
      </p>
      <div className="h-96"></div>
      <p className="text-neutral-600 mt-8">More content...</p>
      <div className="h-96"></div>
    </div>
  </div>
);

export default function App() {
  // Mock State for Context
  const [user, setUser] = useState<{name: string, isAdmin: boolean} | null>(null);
  
  const mockContextValue = {
    cart: [{ id: 1, quantity: 2 }],
    wishlist: [1, 2, 3],
    user: user,
    logout: () => setUser(null)
  };

  return (
    <AppContext.Provider value={mockContextValue}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DummyPage title="Home" />} />
            <Route path="/gallery" element={<DummyPage title="Art Gallery" />} />
            <Route path="/about" element={<DummyPage title="About the Artist" />} />
            <Route path="/commission" element={<DummyPage title="Commissions" />} />
            <Route path="/blog" element={<DummyPage title="Blog" />} />
            <Route path="/login" element={
              <div className="flex justify-center py-20">
                <Button onClick={() => setUser({ name: 'Demo User', isAdmin: true })}>
                  Simulate Login
                </Button>
              </div>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}