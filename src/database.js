const { connect } = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

connect(URI)
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));
