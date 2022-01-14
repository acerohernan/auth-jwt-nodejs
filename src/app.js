const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv");

const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");

//MongoDB connection
require("./database");

const app = express();

//midelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
