import { Link, useLocation, Outlet } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState } from "react";
import { Button } from "./ui/button";

export function Layout() {
  const { cart, wishlist, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif">AH</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-neutral-900">Pooja Chauhan</div>
                <div className="text-xs text-neutral-500">Pooja's Art Gallery</div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`text-sm transition-colors ${isActive("/") ? "text-amber-700" : "text-neutral-700 hover:text-amber-700"}`}>Home</Link>
              <Link to="/gallery" className={`text-sm transition-colors ${isActive("/gallery") ? "text-amber-700" : "text-neutral-700 hover:text-amber-700"}`}>Gallery</Link>
              <Link to="/about" className={`text-sm transition-colors ${isActive("/about") ? "text-amber-700" : "text-neutral-700 hover:text-amber-700"}`}>About</Link>
              <Link to="/commission" className={`text-sm transition-colors ${isActive("/commission") ? "text-amber-700" : "text-neutral-700 hover:text-amber-700"}`}>Commissions</Link>
              <Link to="/blog" className={`text-sm transition-colors ${isActive("/blog") ? "text-amber-700" : "text-neutral-700 hover:text-amber-700"}`}>Blog</Link>
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center space-x-4">

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 text-neutral-700 hover:text-amber-700 transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-neutral-700 hover:text-amber-700 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-700 text-white rounded-full flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* USER (⭐ UPDATED PART) */}
              {user ? (
                <div className="hidden lg:flex items-center space-x-3">

                  {/* ADMIN BUTTON */}
                  {user.isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}

                  {/* NORMAL USER BUTTON */}
                  {!user.isAdmin && (
                    <Link to="/orders">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        My Orders
                      </Button>
                    </Link>
                  )}

                  {/* LOGOUT */}
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="hidden lg:block">
                  <Button variant="outline" size="sm" className="rounded-lg">Login</Button>
                </Link>
              )}

              {/* MOBILE MENU TRIGGER */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Home</Link>
              <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Gallery</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">About</Link>
              <Link to="/commission" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Commissions</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">Blog</Link>

              {user ? (
                <>

                  {/* Admin link */}
                  {user.isAdmin && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">
                      Admin Dashboard
                    </Link>
                  )}

                  {/* User link ⭐ */}
                  {!user.isAdmin && (
                    <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">
                      My Orders
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left py-2 text-neutral-700 hover:text-amber-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neutral-700 hover:text-amber-700">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* ABOUT */}
            <div>
              <div className="font-serif text-white mb-4">Pooja Chauhan</div>
              <p className="text-sm text-neutral-400">
                Contemporary artist specializing in abstract and portrait paintings.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <div className="text-white mb-4">Quick Links</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/gallery" className="hover:text-amber-500">Gallery</Link></li>
                <li><Link to="/about" className="hover:text-amber-500">About</Link></li>
                <li><Link to="/commission" className="hover:text-amber-500">Commissions</Link></li>
                <li><Link to="/blog" className="hover:text-amber-500">Blog</Link></li>
              </ul>
            </div>

            {/* CUSTOMER SERVICE */}
            <div>
              <div className="text-white mb-4">Customer Service</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shipping-returns" className="hover:text-amber-500">Shipping & Returns</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-amber-500">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-amber-500">Terms & Conditions</Link></li>
                <li><Link to="/contact" className="hover:text-amber-500">Contact</Link></li>
              </ul>
            </div>

            {/* SOCIAL ICONS */}
            <div>
              <div className="text-white mb-4">Stay Connected</div>
              <p className="text-sm text-neutral-400 mb-4">
                Follow for updates on new artworks.
              </p>

              <div className="flex space-x-3">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/poojas_creative_palette/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919833325936?text=Hello%2C%20I%20need%20help%20regarding%20an%20artwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 32 32"
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
