import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { Button } from './ui/button';

export function Layout({ children }: { children: React.ReactNode }) {
  const { cart, wishlist, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif">AH</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-neutral-900">Pooja Chauhan</div>
                <div className="text-xs text-neutral-500">Pooja's Art Gallery</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm transition-colors ${
                  isActive('/') ? 'text-amber-700' : 'text-neutral-700 hover:text-amber-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/gallery"
                className={`text-sm transition-colors ${
                  isActive('/gallery') ? 'text-amber-700' : 'text-neutral-700 hover:text-amber-700'
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className={`text-sm transition-colors ${
                  isActive('/about') ? 'text-amber-700' : 'text-neutral-700 hover:text-amber-700'
                }`}
              >
                About
              </Link>
              <Link
                to="/commission"
                className={`text-sm transition-colors ${
                  isActive('/commission') ? 'text-amber-700' : 'text-neutral-700 hover:text-amber-700'
                }`}
              >
                Commissions
              </Link>
              <Link
                to="/blog"
                className={`text-sm transition-colors ${
                  isActive('/blog') ? 'text-amber-700' : 'text-neutral-700 hover:text-amber-700'
                }`}
              >
                Blog
              </Link>
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
                  <Button variant="ghost" size="sm" onClick={logout}>
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-neutral-700 hover:text-amber-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/gallery"
                className="block py-2 text-neutral-700 hover:text-amber-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="block py-2 text-neutral-700 hover:text-amber-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/commission"
                className="block py-2 text-neutral-700 hover:text-amber-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Commissions
              </Link>
              <Link
                to="/blog"
                className="block py-2 text-neutral-700 hover:text-amber-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              {user ? (
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block py-2 text-neutral-700 hover:text-amber-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-neutral-700 hover:text-amber-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 text-neutral-700 hover:text-amber-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
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
      <footer className="bg-neutral-900 text-neutral-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="font-serif text-white mb-4">Pooja Chauhan</div>
              <p className="text-sm text-neutral-400">
                Contemporary artist specializing in abstract and portrait paintings. Creating meaningful art that resonates with collectors worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white mb-4">Quick Links</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/gallery" className="hover:text-amber-500 transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-amber-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/commission" className="hover:text-amber-500 transition-colors">
                    Commissions
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-amber-500 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <div className="text-white mb-4">Customer Service</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="text-white mb-4">Stay Connected</div>
              <p className="text-sm text-neutral-400 mb-4">
                Subscribe to receive updates on new artworks and exhibitions.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/poojas_creative_palette/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                
                {/* Updated: Direct Gmail Compose Link */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=poojascreativepalette@gmail.com"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
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