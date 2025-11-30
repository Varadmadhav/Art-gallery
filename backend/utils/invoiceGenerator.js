const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = function generateInvoice(order, payment) {

  const doc = new PDFDocument({ margin: 50 });

  let chunks = [];
  let result;

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {
    result = Buffer.concat(chunks);
  });

  // ---------- HEADER ----------
  doc
    .fontSize(24)
    .text("ART GALLERY", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .text("Invoice", { align: "center" })
    .moveDown(1);

  // ---------- ORDER INFO ----------
  doc
    .fontSize(12)
    .text(`Order ID: ${order.orderId}`)
    .text(`Order Date: ${order.createdAt.toDateString()}`)
    .text(`Payment Status: ${order.paymentStatus}`)
    .text(`Order Status: ${order.orderStatus}`)
    .moveDown(1);

  // ---------- CUSTOMER INFO ----------
  doc.fontSize(14).text("Customer Details");
  doc
    .fontSize(12)
    .text(`Name: ${order.shippingAddress.fullName}`)
    .text(`Email: ${order.user.email}`)
    .text(`Phone: ${order.shippingAddress.phone}`)
    .moveDown(1);

  // ---------- SHIPPING ADDRESS ----------
  doc.fontSize(14).text("Shipping Address");
  const a = order.shippingAddress;
  doc
    .fontSize(12)
    .text(a.addressLine1)
    .text(a.city + ", " + a.state)
    .text(a.country)
    .text("PIN: " + a.postalCode)
    .moveDown(1);

  // ---------- ITEMS TABLE ----------
  doc
    .fontSize(14)
    .text("Items", { underline: true })
    .moveDown(0.5);

  order.items.forEach((item) => {
    doc
      .fontSize(12)
      .text(
        `${item.title} — Qty: ${item.quantity} — ₹${item.price * item.quantity}`
      );
  });

  doc.moveDown(1);

  // ---------- PAYMENT INFO ----------
  doc.fontSize(14).text("Payment Details");

  doc
    .fontSize(12)
    .text(`Amount Paid: ₹${payment.amount}`)
    .text(`Razorpay Payment ID: ${payment.razorpayPaymentId}`)
    .text(`Razorpay Order ID: ${payment.razorpayOrderId}`)
    .text(`Payment Method: ${payment.method || "N/A"}`)
    .text(`Bank / Wallet / VPA: ${payment.bank || payment.wallet || payment.vpa || "N/A"}`)
    .moveDown(2);

  // ----------- FOOTER ----------
  doc.fontSize(10).text("Thank you for your purchase!", { align: "center" });
  doc.text("ArtGallery © " + new Date().getFullYear(), { align: "center" });

  doc.end();
  return new Promise((resolve) => {
    doc.on("end", () => resolve(result));
  });
};
