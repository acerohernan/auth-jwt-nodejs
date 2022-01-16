const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config");

const { createRoles } = require("./libs/initialSetup");

const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

//MongoDB connection
require("./database");

const app = express();
createRoles();

//settings
app.set("port", config.port);

//midelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
