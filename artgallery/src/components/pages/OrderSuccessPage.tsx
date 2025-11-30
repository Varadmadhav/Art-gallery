import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CheckCircle,
  Download,
  ArrowRight,
  Calendar,
  CreditCard
} from "lucide-react";

// --- MOCK DATA FOR PREVIEW / ERROR FALLBACK ---
const MOCK_ORDER = {
  orderId: "ORD-2025-8492",
  createdAt: new Date().toISOString(),
  payment: { razorpayPaymentId: "pay_N9s8d7f6g5h4j" },
  shippingAddress: {
    fullName: "Sarah Connor",
    addressLine1: "42, Art Avenue, Bandra West",
    city: "Mumbai",
    postalCode: "400050"
  },
  items: [
    { _id: "1", title: "Abstract Harmony", quantity: 1, price: 12000 },
    { _id: "2", title: "Golden Silence", quantity: 1, price: 3500 }
  ],
  totalAmount: 15500
};

export function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load order immediately
  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId");

    if (!orderId) {
      // No real order, preview fallback
      setOrder(MOCK_ORDER);
      setLoading(false);
      return;
    }

    fetchOrder(orderId);
  }, []);

  // Fetch from backend
  const fetchOrder = async (orderId: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/order/${orderId}`);
      setOrder(res.data);
      setLoading(false);

      // Auto-download PDF if backend is available
      downloadInvoice(orderId);
    } catch (err) {
      console.error("Order fetch failed — using mock UI instead.");
      setOrder(MOCK_ORDER);
      setLoading(false);
    }
  };

  // Download from backend OR fallback to print
  const downloadInvoice = async (orderId: string) => {
    if (orderId === MOCK_ORDER.orderId) {
      window.print();
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/payment/invoice/${orderId}`,
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${orderId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed — falling back to print.");
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-slate-600">
        Loading your order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600 gap-4">
        <div className="text-xl font-bold text-rose-500">Order not found!</div>
        <Link to="/" className="text-sm text-slate-900 underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 py-8 px-4 flex justify-center items-start print:bg-white print:p-0">
      <div className="max-w-3xl w-full mt-8 print:mt-0">

        {/* Success Banner */}
        <div className="text-center mb-8 print:hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full mb-6 shadow-[0_0_0_8px_rgba(16,185,129,0.1)]">
            <CheckCircle size={48} strokeWidth={3} />
          </div>
          <h1 className="font-serif text-4xl font-bold text-slate-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-slate-500">Thank you for your purchase.</p>
        </div>

        {/* Invoice Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm mb-8 print:shadow-none print:border-0">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between border-b pb-8 mb-8">
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-lg flex items-center justify-center font-serif font-bold text-xl mb-3">
                PC
              </div>
              <div className="font-bold text-slate-900 text-lg">
                Pooja's Creative Palette
              </div>
              <div className="text-sm text-slate-500">
                Fine Art & Commissions — Mumbai
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase">Order Number</div>
              <div className="font-mono font-semibold text-slate-900">
                {order.orderId}
              </div>

              <div className="mt-4 text-xs text-slate-400 uppercase">Payment ID</div>
              <div className="font-mono text-sm text-slate-600">
                {order.payment?.razorpayPaymentId}
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold uppercase mb-2">Billed To</h4>
              <p className="font-medium text-slate-900">{order.shippingAddress.fullName}</p>
              <p className="text-slate-500 text-sm">{order.shippingAddress.addressLine1}</p>
              <p className="text-slate-500 text-sm">
                {order.shippingAddress.city} — {order.shippingAddress.postalCode}
              </p>
            </div>

            <div className="text-right">
              <h4 className="text-sm font-bold uppercase mb-2">Date</h4>
              <div className="flex items-center justify-end gap-2 text-slate-600">
                <Calendar size={16} />
                {new Date(order.createdAt).toDateString()}
              </div>

              <div className="flex items-center justify-end gap-2 text-emerald-600 font-semibold mt-2">
                <CreditCard size={16} />
                Paid via Razorpay
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 border-b text-sm">Item</th>
                  <th className="text-left py-4 border-b text-sm">Qty</th>
                  <th className="text-right py-4 border-b text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any) => (
                  <tr key={item._id}>
                    <td className="py-4 font-semibold text-slate-900">{item.title}</td>
                    <td className="py-4 text-slate-600">{item.quantity}</td>
                    <td className="py-4 text-right font-medium">
                      ₹{item.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end mt-6 border-t pt-4">
            <div className="text-right font-bold text-xl text-slate-900">
              Total: ₹{order.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 print:hidden">
          <button
            onClick={() => downloadInvoice(order.orderId)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            <Download size={18} />
            Download Invoice
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 border rounded-lg hover:bg-slate-50"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
