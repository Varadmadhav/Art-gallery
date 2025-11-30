import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import axios from 'axios';

export function CheckoutPage() {
  const { cart, clearCart, user } = useApp();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const updateForm = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.artwork.price * item.quantity,
    0
  );

  const shipping = subtotal > 1500 ? 0 : 50;
  const total = subtotal + shipping;

  const userId = user?._id;

  // -------------------------------------------------------------
  // Load Razorpay script
  // -------------------------------------------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // -------------------------------------------------------------
  // Create Order in DB
  // -------------------------------------------------------------
  const createOrderInDB = async () => {
    const shippingAddress = {
      fullName: form.firstName + " " + form.lastName,
      phone: form.phone,
      addressLine1: form.address,
      addressLine2: "",
      city: form.city,
      state: form.state,
      postalCode: form.zip,
      country: form.country,
    };

    const items = cart.map((item) => ({
      artwork: item.artwork._id,
      title: item.artwork.title,
      quantity: item.quantity,
      price: item.artwork.price,
    }));

    const res = await axios.post("http://localhost:5000/api/order/create", {
      userId,
      items,
      shippingAddress,
      totalAmount: total,
    });

    return res.data.order;
  };

  // -------------------------------------------------------------
  // Initiate Payment
  // -------------------------------------------------------------
  const initiatePayment = async (orderId: string) => {
    const res = await axios.post("http://localhost:5000/api/payment/initiate", {
      orderId,
    });
    return res.data;
  };

  // -------------------------------------------------------------
  // Open Razorpay (with redirect fix)
  // -------------------------------------------------------------
  const openRazorpay = async (paymentInit: any, orderObj: any) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load Razorpay.");
      return;
    }

    const options = {
      key: paymentInit.key,
      amount: paymentInit.amount * 100,
      currency: "INR",
      name: "ArtGallery",
      description: "Order Payment",
      order_id: paymentInit.razorpayOrder.id,

      handler: async function (response: any) {
        console.log("🔥 HANDLER FIRED");
        console.log("Response:", response);
        console.log("Order Obj:", orderObj);

        try {
          const verify = await axios.post(
            "http://localhost:5000/api/payment/verify",
            response
          );

          console.log("Verification Response:", verify.data);

          if (verify.data.success) {
            toast.success("Payment Successful!");

            localStorage.setItem("lastOrderId", orderObj.orderId);
            clearCart();

            console.log("➡ Redirecting to /order-success");

            // ⭐⭐ FINAL FIX ⭐⭐
            window.location.href = "/order-success";

          } else {
            toast.error("Payment verification failed");
            window.location.href = "/payment-failed";
          }

        } catch (error) {
          console.error("🔥 Handler crashed:", error);
          toast.error("Verification failed");
        }
      },

      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },

      theme: { color: "#FFC107" },
    };

    new (window as any).Razorpay(options).open();
  };

  // -------------------------------------------------------------
  // Handle Submit
  // -------------------------------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      return;
    }

    try {
      const orderObj = await createOrderInDB();
      const paymentInit = await initiatePayment(orderObj.orderId);

      await openRazorpay(paymentInit, orderObj);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong");
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  // -------------------------------------------------------------
  // UI (unchanged)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-neutral-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* SHIPPING */}
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
                    <Label htmlFor="phone">Phone</Label>
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
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP</Label>
                    <Input id="zip" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" required className="rounded-lg mt-2" onChange={updateForm} />
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-neutral-900 mb-6">Payment Method</h2>

                <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-amber-700 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-neutral-900">Razorpay</span>
                </label>

                <div className="flex items-center gap-2 mt-6 text-sm text-neutral-600">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-neutral-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.artwork._id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100">
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
                          ₹{(item.artwork.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="text-neutral-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="text-neutral-900">
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-neutral-200">
                    <span className="font-serif text-neutral-900">Total</span>
                    <span className="font-serif text-amber-700">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg py-6">
                  Place Order
                </Button>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
