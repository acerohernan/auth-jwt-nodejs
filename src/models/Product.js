const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const productModel = model("product", productSchema);

module.exports = productModel;
