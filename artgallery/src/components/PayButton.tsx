import axios from "axios";

export default function PayButton({ amount }: { amount: number }) {
  const payNow = async () => {
    const order = await axios.post("http://localhost:5000/api/payment/create-order", {
      amount
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: "INR",
      name: "ArtGallery",
      order_id: order.data.id,
      handler: async (response: any) => {
        await axios.post("http://localhost:5000/api/payment/verify-payment", response);
        alert("Payment Successful");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={payNow}>
      Pay Now
    </button>
  );
}
