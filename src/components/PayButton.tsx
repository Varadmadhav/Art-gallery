handler: async (response: any) => {

  // 1️⃣ First verify payment
  await axios.post("http://localhost:5000/api/payment/verify-payment", response);

  // 2️⃣ Then send checkout details to database
  await axios.post("http://localhost:5000/api/checkout/create", {
    name: checkoutForm.name,
    email: checkoutForm.email,
    phone: checkoutForm.phone,
    address: checkoutForm.address,
    city: checkoutForm.city,
    zip: checkoutForm.zip,

    amount,
    paymentId: response.razorpay_payment_id,
    orderId: response.razorpay_order_id,
    signature: response.razorpay_signature,

    status: "PAID",
  });

  alert("Order Placed Successfully!");
}
