const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/artworks", require("./routes/artwork.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/order", require("./routes/order.routes"));     // NEW AMAZON-STYLE ORDER
app.use("/api/payment", require("./routes/payment.routes")); // NEW RAZORPAY SYSTEM
app.use("/api/blog", require("./routes/blog.routes"));
app.use("/api/commission", require("./routes/commission.routes"));

// ⛔ Removed old checkout route
// app.use("/api/checkout", require("./routes/checkout.routes"));

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("ARTGALLERY backend is running...");
});

// NOT FOUND HANDLER
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
