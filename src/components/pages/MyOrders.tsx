import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Package,
  Download,
  Search,
  X,
  Truck,
  CheckCircle,
  Clock,
  CreditCard
} from "lucide-react";

import { useApp } from "../../context/AppContext";

// --- CSS STYLES ---
const styles = `
  :root {
    --c-slate-50: #f8fafc;
    --c-slate-100: #f1f5f9;
    --c-slate-200: #e2e8f0;
    --c-slate-300: #cbd5e1;
    --c-slate-400: #94a3b8;
    --c-slate-500: #64748b;
    --c-slate-600: #475569;
    --c-slate-700: #334155;
    --c-slate-800: #1e293b;
    --c-slate-900: #0f172a;

    --c-amber-50: #fffbeb;
    --c-amber-100: #fef3c7;
    --c-amber-200: #fde68a;
    --c-amber-600: #d97706;
    --c-amber-700: #b45309;

    --c-emerald-50: #ecfdf5;
    --c-emerald-600: #059669;
    --c-emerald-700: #047857;

    --c-blue-50: #eff6ff;
    --c-blue-700: #1d4ed8;

    --c-rose-50: #fff1f2;
    --c-rose-700: #be123c;

    --font-sans: system-ui, -apple-system, sans-serif;
    --font-serif: Georgia, serif;
  }

  * { box-sizing: border-box; }

  .mo-wrapper {
    min-height: 100vh;
    background-color: var(--c-slate-50);
    font-family: var(--font-sans);
    color: var(--c-slate-600);
    padding-bottom: 6rem;
  }

  /* Header */
  .mo-header-sticky {
    background-color: white;
    border-bottom: 1px solid var(--c-slate-200);
    position: sticky;
    top: 0;
    z-index: 20;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .mo-header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }
  .mo-title {
    font-family: var(--font-serif);
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--c-slate-900);
    margin: 0;
  }
  .mo-subtitle {
    font-size: 0.875rem;
    color: var(--c-slate-500);
    margin-top: 0.25rem;
  }

  /* Controls */
  .mo-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
  .mo-tabs {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    border-bottom: 1px solid var(--c-slate-100);
    padding-bottom: 1px;
  }
  .mo-tab-btn {
    background: none;
    border: none;
    padding: 0 0.25rem 0.75rem 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--c-slate-500);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .mo-tab-btn:hover { color: var(--c-slate-800); }
  .mo-tab-btn.active {
    color: var(--c-amber-700);
    border-bottom-color: var(--c-amber-700);
  }

  .mo-search-box {
    position: relative;
    width: 100%;
    max-width: 300px;
  }
  .mo-search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--c-slate-400);
  }
  .mo-search-input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    background-color: var(--c-slate-100);
    border: 1px solid transparent;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
  }
  .mo-search-input:focus {
    background-color: white;
    border-color: var(--c-amber-200);
    box-shadow: 0 0 0 3px var(--c-amber-50);
  }

  /* Main Content */
  .mo-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }

  /* Order Card */
  .mo-card {
    background-color: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 0.75rem;
    overflow: hidden;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s;
  }
  .mo-card:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

  .mo-card-header {
    background-color: var(--c-slate-50);
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--c-slate-100);
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    font-size: 0.875rem;
    align-items: center;
  }
  .mo-header-group { display: flex; flex-direction: column; }
  .mo-label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-slate-500);
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  .mo-value { color: var(--c-slate-700); font-weight: 500; }
  .mo-value.price { color: var(--c-slate-900); font-weight: 600; }

  .mo-header-right { margin-left: auto; text-align: right; }
  .mo-header-links { display: flex; gap: 0.75rem; margin-top: 0.25rem; font-size: 0.75rem; }
  .mo-link { color: var(--c-amber-700); text-decoration: none; font-weight: 500; cursor: pointer; }
  .mo-link:hover { text-decoration: underline; }

  .mo-card-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
  @media (min-width: 768px) { .mo-card-body { flex-direction: row; } }

  .mo-status-col { min-width: 200px; }
  .mo-status-title { font-weight: 700; color: var(--c-slate-900); margin-bottom: 0.25rem; font-size: 1rem; }
  .mo-status-desc { font-size: 0.875rem; color: var(--c-slate-500); margin-bottom: 0.75rem; }

  .mo-items-col { flex: 1; display: flex; flex-direction: column; gap: 1rem; }
  .mo-item-row { display: flex; gap: 1rem; }
  .mo-item-img-box {
    width: 5rem; height: 5rem;
    background-color: var(--c-slate-100);
    border: 1px solid var(--c-slate-200);
    border-radius: 0.5rem;
    overflow: hidden;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .mo-item-img { width: 100%; height: 100%; object-fit: cover; }
  .mo-item-placeholder { color: var(--c-slate-300); }

  .mo-item-info h4 { font-weight: 600; color: var(--c-amber-700); font-size: 0.95rem; margin: 0 0 0.25rem 0; }
  .mo-item-meta { font-size: 0.75rem; color: var(--c-slate-500); }
  .mo-item-price { font-weight: 500; color: var(--c-slate-900); font-size: 0.875rem; margin-top: 0.5rem; }

  .mo-actions-col {
    display: flex; flex-direction: column; gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--c-slate-100);
  }
  @media (min-width: 768px) {
    .mo-actions-col { border-top: none; border-left: 1px solid var(--c-slate-100); padding-top: 0; padding-left: 1.5rem; width: 200px; }
  }
  .mo-btn {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    border: 1px solid var(--c-slate-300);
    background: white;
    color: var(--c-slate-700);
    transition: all 0.2s;
  }
  .mo-btn:hover { background-color: var(--c-slate-50); }

  /* Badge */
  .mo-badge {
    display: inline-flex; align-items: center; gap: 0.375rem;
    padding: 0.125rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid transparent;
  }
  .mo-badge.processing { background: var(--c-blue-50); color: var(--c-blue-700); border-color: #dbeafe; }
  .mo-badge.shipped { background: var(--c-amber-50); color: var(--c-amber-700); border-color: #fef3c7; }
  .mo-badge.delivered { background: var(--c-emerald-50); color: var(--c-emerald-700); border-color: #d1fae5; }
  .mo-badge.cancelled { background: var(--c-slate-100); color: var(--c-slate-600); border-color: var(--c-slate-200); }

  /* Empty State */
  .mo-empty {
    text-align: center;
    padding: 6rem 2rem;
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--c-slate-200);
  }
  .mo-empty-icon {
    width: 4rem; height: 4rem;
    background: var(--c-slate-50);
    color: var(--c-slate-400);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
  }
  .mo-empty h3 { font-size: 1.125rem; font-weight: 600; color: var(--c-slate-900); margin: 0 0 0.5rem; }
  .mo-empty p { color: var(--c-slate-500); font-size: 0.875rem; margin-bottom: 1.5rem; }
  .mo-empty-btn { color: var(--c-amber-700); font-weight: 500; background: none; border: none; cursor: pointer; }
  .mo-empty-btn:hover { text-decoration: underline; }

  /* Modal */
  .mo-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 50;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
  }
  .mo-modal {
    background: white;
    width: 100%; max-width: 800px;
    max-height: 90vh;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex; flex-direction: column;
    animation: mo-fade-in 0.2s ease-out;
  }
  @keyframes mo-fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

  .mo-modal-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--c-slate-100);
    display: flex; justify-content: space-between; align-items: center;
    background: white;
  }
  .mo-modal-title { font-size: 1.25rem; font-weight: 700; color: var(--c-slate-900); margin: 0; }
  .mo-close-btn { background: none; border: none; color: var(--c-slate-400); cursor: pointer; padding: 0.5rem; border-radius: 50%; }
  .mo-close-btn:hover { background: var(--c-slate-50); color: var(--c-slate-600); }

  .mo-modal-content { padding: 2rem; overflow-y: auto; }
  
  .mo-modal-grid { display: grid; gap: 2rem; margin-top: 2rem; }
  @media (min-width: 768px) { .mo-modal-grid { grid-template-columns: repeat(3, 1fr); } }
  
  .mo-info-block h4 { font-weight: 700; color: var(--c-slate-900); margin: 0 0 0.75rem 0; font-size: 0.875rem; border-bottom: 1px solid var(--c-slate-100); padding-bottom: 0.5rem; }
  .mo-info-text { font-size: 0.875rem; color: var(--c-slate-600); line-height: 1.5; }
  .mo-info-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem; }
  .mo-total-row { display: flex; justify-content: space-between; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--c-slate-100); font-weight: 700; color: var(--c-slate-900); }

  .mo-modal-items { border: 1px solid var(--c-slate-200); border-radius: 0.75rem; overflow: hidden; margin-top: 2rem; }
  .mo-items-header { background: var(--c-slate-50); padding: 0.75rem 1rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--c-slate-500); border-bottom: 1px solid var(--c-slate-200); }
  .mo-modal-item-row { padding: 1rem; display: flex; gap: 1rem; align-items: center; border-bottom: 1px solid var(--c-slate-100); }
  .mo-modal-item-row:last-child { border-bottom: none; }

  /* Loading Spinner */
  .mo-spinner { width: 2rem; height: 2rem; border: 3px solid var(--c-slate-200); border-top-color: var(--c-amber-600); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

// MAIN COMPONENT
export default function MyOrders() {
  const { user } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch from Backend
  useEffect(() => {
    if (user && user._id) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/order/user/${user._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setOrders(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoading(false);
    }
  };

  // Download Invoice
  const downloadInvoice = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/order/${orderId}/invoice`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const tabMatch =
      activeTab === "All"
        ? true
        : activeTab === "Open"
        ? ["PLACED", "CONFIRMED", "SHIPPED"].includes(order.orderStatus)
        : activeTab === "Delivered"
        ? order.orderStatus === "DELIVERED"
        : activeTab === "Cancelled"
        ? order.orderStatus === "CANCELLED"
        : true;

    const searchMatch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((i) =>
        i.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return tabMatch && searchMatch;
  });

  return (
    <>
      <style>{styles}</style>

      <div className="mo-wrapper">
        {/* HEADER */}
        <div className="mo-header-sticky">
          <div className="mo-header-content">
            <h1 className="mo-title">Your Orders</h1>
            <p className="mo-subtitle">
              Check order status, track delivery, and download invoices.
            </p>

            <div className="mo-controls">
              <div className="mo-tabs">
                {["All", "Open", "Delivered", "Cancelled"].map((tab) => (
                  <button
                    key={tab}
                    className={`mo-tab-btn ${
                      activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "Open" ? "Open Orders" : tab}
                  </button>
                ))}
              </div>

              <div className="mo-search-box">
                <Search className="mo-search-icon" size={16} />
                <input
                  type="text"
                  className="mo-search-input"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mo-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem" }}>
              <div className="mo-spinner"></div>
              <p style={{ color: "var(--c-slate-500)" }}>Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="mo-empty">
              <div className="mo-empty-icon">
                <Search size={32} />
              </div>
              <h3>No orders found</h3>
              <p>Try adjusting your filters or search.</p>
              <button
                className="mo-empty-btn"
                onClick={() => {
                  setActiveTab("All");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div>
              {filteredOrders.map((order) => (
                <div key={order._id} className="mo-card">
                  {/* ORDER HEADER */}
                  <div className="mo-card-header">
                    <div className="mo-header-group">
                      <span className="mo-label">Order Placed</span>
                      <span className="mo-value">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mo-header-group">
                      <span className="mo-label">Total</span>
                      <span className="mo-value price">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="mo-header-group">
                      <span className="mo-label">Ship To</span>
                      <span
                        className="mo-value"
                        style={{
                          color: "var(--c-amber-700)",
                          borderBottom: "1px dashed var(--c-amber-200)",
                          cursor: "help",
                        }}
                        title={order.shippingAddress.addressLine1}
                      >
                        {order.shippingAddress.fullName}
                      </span>
                    </div>

                    <div className="mo-header-right">
                      <span className="mo-label">Order #{order.orderId}</span>
                      <div className="mo-header-links">
                        <span
                          className="mo-link"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </span>
                        <span style={{ color: "var(--c-slate-300)" }}>|</span>
                        <span
                          className="mo-link"
                          onClick={() => downloadInvoice(order.orderId)}
                        >
                          Invoice
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER BODY */}
                  <div className="mo-card-body">
                    <div className="mo-status-col">
                      <h4 className="mo-status-title">
                        {order.orderStatus === "DELIVERED"
                          ? "Delivered"
                          : "Arriving Soon"}
                      </h4>

                      <p className="mo-status-desc">
                        {order.orderStatus === "DELIVERED"
                          ? "Package delivered successfully"
                          : "On the way to you"}
                      </p>

                      <span className={`mo-badge ${order.orderStatus.toLowerCase()}`}>
                        {order.orderStatus === "SHIPPED" && (
                          <Truck size={13} />
                        )}
                        {order.orderStatus === "DELIVERED" && (
                          <CheckCircle size={13} />
                        )}
                        {order.orderStatus === "CANCELLED" && (
                          <X size={13} />
                        )}
                        {(order.orderStatus === "PLACED" ||
                          order.orderStatus === "CONFIRMED") && (
                          <Clock size={13} />
                        )}
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="mo-items-col">
                      {order.items.map((item) => (
                        <div key={item._id} className="mo-item-row">
                          <div className="mo-item-img-box">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="mo-item-img"
                              />
                            ) : (
                              <Package className="mo-item-placeholder" />
                            )}
                          </div>

                          <div className="mo-item-info">
                            <h4>{item.title}</h4>
                            <div className="mo-item-meta">
                              Original Artwork
                            </div>
                            <div className="mo-item-price">
                              ₹{item.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mo-actions-col">
                      <button
                        className="mo-btn"
                        onClick={() => alert("Tracking coming soon")}
                      >
                        Track Package
                      </button>
                      <button
                        className="mo-btn"
                        onClick={() => alert("Review feature coming soon")}
                      >
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL */}
        {selectedOrder && (
          <div
            className="mo-modal-overlay"
            onClick={() => setSelectedOrder(null)}
          >
            <div className="mo-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mo-modal-header">
                <h2 className="mo-modal-title">Order Details</h2>
                <button
                  className="mo-close-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mo-modal-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--c-slate-500)" }}>
                      Ordered on{" "}
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <span
                    className="mo-link"
                    onClick={() => downloadInvoice(selectedOrder.orderId)}
                  >
                    <Download size={14} style={{ marginRight: 4 }} />
                    Download Invoice
                  </span>
                </div>

                <div className="mo-modal-grid">
                  {/* Shipping */}
                  <div className="mo-info-block">
                    <h4>Shipping Address</h4>
                    <div className="mo-info-text">
                      <strong>
                        {selectedOrder.shippingAddress.fullName}
                      </strong>
                      <br />
                      {selectedOrder.shippingAddress.addressLine1}
                      <br />
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.postalCode}
                      <br />
                      India
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="mo-info-block">
                    <h4>Payment Method</h4>
                    <div className="mo-info-text">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <CreditCard size={16} /> Razorpay
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--c-slate-400)",
                        }}
                      >
                        ID: {selectedOrder.paymentId}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mo-info-block">
                    <h4>Order Summary</h4>
                    <div className="mo-info-row">
                      <span>Subtotal:</span>
                      <span>
                        ₹{selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="mo-info-row">
                      <span>Shipping:</span>
                      <span style={{ color: "var(--c-emerald-600)" }}>
                        Free
                      </span>
                    </div>

                    <div className="mo-total-row">
                      <span>Total:</span>
                      <span>
                        ₹{selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="mo-modal-items">
                  <div className="mo-items-header">Items in this order</div>

                  {selectedOrder.items.map((item) => (
                    <div key={item._id} className="mo-modal-item-row">
                      <div
                        className="mo-item-img-box"
                        style={{ width: "4rem", height: "4rem" }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="mo-item-img"
                          />
                        ) : (
                          <Package className="mo-item-placeholder" />
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "var(--c-slate-900)",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--c-slate-500)",
                          }}
                        >
                          Qty: {item.quantity}
                        </div>
                      </div>

                      <div style={{ fontWeight: 500 }}>
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
