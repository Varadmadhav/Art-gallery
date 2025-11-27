const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const artworkRoutes = require('./routes/artwork.routes')


app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use('/api/artworks', artworkRoutes)



app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
