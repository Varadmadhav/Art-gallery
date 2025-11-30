import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, user } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.artwork.price * item.quantity,
    0
  );
  const shipping = subtotal > 1500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      // 🔐 Not logged in → send to login, remember that we came from /checkout
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      // ✅ Already logged in → go directly to checkout
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-neutral-400" />
          </div>
          <h2 className="font-serif text-neutral-900 mb-4">Your Cart is Empty</h2>
          <p className="text-neutral-600 mb-8">
            Start exploring our gallery and add artworks to your cart
          </p>
          <Link to="/gallery">
            <Button className="bg-amber-700 hover:bg-amber-800 rounded-lg">
              Explore Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-neutral-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.artwork.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-6">
                  {/* Image */}
                  <Link to={`/artwork/${item.artwork.id}`} className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-neutral-100">
                      <ImageWithFallback
                        src={item.artwork.image}
                        alt={item.artwork.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/artwork/${item.artwork.id}`}>
                      <h3 className="font-serif text-neutral-900 mb-1 hover:text-amber-700 transition-colors">
                        {item.artwork.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-neutral-500 mb-2">
                      {item.artwork.category}
                    </p>
                    <p className="text-sm text-neutral-400 mb-4">
                      {item.artwork.dimensions}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.artwork.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-neutral-700" />
                        </button>
                        <span className="text-neutral-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.artwork.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-neutral-700" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.artwork.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-serif text-neutral-900">
                      ₹{(item.artwork.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-sm text-neutral-500">
                        ₹{item.artwork.price.toLocaleString('en-IN')} each
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-neutral-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>
                    Subtotal ({cart.length}{' '}
                    {cart.length === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-neutral-900">
                    {shipping === 0
                      ? 'FREE'
                      : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                {subtotal < 1500 && (
                  <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">
                    Add ₹{(1500 - subtotal).toLocaleString('en-IN')} more for free
                    shipping
                  </div>
                )}
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-serif text-neutral-900">Total</span>
                    <span className="font-serif text-amber-700">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg py-6 mb-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <Link to="/gallery" className="block">
                <Button variant="outline" className="w-full rounded-lg">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <h3 className="text-sm text-neutral-900 mb-2">Secure Checkout</h3>
                <ul className="text-xs text-neutral-600 space-y-1">
                  <li>• Encrypted payment processing</li>
                  <li>• Certificate of authenticity included</li>
                  <li>• Insured shipping worldwide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
