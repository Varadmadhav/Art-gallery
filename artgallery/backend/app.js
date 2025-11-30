const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/artworks", require("./routes/artwork.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/blog", require("./routes/blog.routes"));
app.use("/api/commission", require("./routes/commission.routes"));
app.use("/api/checkout", require("./routes/checkout.routes"));
app.use("/api/payment", require("./routes/payment.routes"));

app.get("/", (req, res) => {
  res.send("ARTGALLERY backend is running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
