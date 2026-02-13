import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner@2.0.3';

export function CheckoutPage() {
  const { cart, clearCart } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  // ⭐ FORM STATE
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  // ⭐ Input Handler
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.artwork.price * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : 50;
  const total = subtotal + shipping;

  // ⭐ UPDATED handleSubmit → Backend Call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      ...form,
      paymentMethod,
      cart: cart.map((item) => ({
        artworkId: item.artwork.id,
        title: item.artwork.title,
        image: item.artwork.image,
        price: item.artwork.price,
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      total
    };

    try {
      const res = await fetch("http://localhost:5000/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        toast.error("Something went wrong!");
      }

    } catch (error) {
      toast.error("Server error!");
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-neutral-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Shipping Information */}
            <div className="lg:col-span-2 space-y-6">

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-neutral-900 mb-6">Shipping Information</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-neutral-900 mb-6">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-amber-700 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-neutral-600" />
                    <span className="text-neutral-900">Credit Card (Stripe)</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-amber-700 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-neutral-900">PayPal</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-amber-700 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-neutral-900">Razorpay</span>
                  </label>
                </div>

                {paymentMethod === 'stripe' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="rounded-lg mt-2" onChange={updateForm} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required className="rounded-lg mt-2" onChange={updateForm} />
                      </div>

                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required className="rounded-lg mt-2" onChange={updateForm} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-6 text-sm text-neutral-600">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-neutral-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.artwork.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img
                          src={item.artwork.image}
                          alt={item.artwork.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-900 truncate">{item.artwork.title}</p>
                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-neutral-900">
                          ${(item.artwork.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="text-neutral-900">${subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="text-neutral-900">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-neutral-200">
                    <span className="font-serif text-neutral-900">Total</span>
                    <span className="font-serif text-amber-700">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg py-6">
                  Place Order
                </Button>

                <p className="text-xs text-neutral-500 text-center mt-4">
                  By placing your order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
