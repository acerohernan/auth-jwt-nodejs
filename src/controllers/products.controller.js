const { del } = require("express/lib/application");
const Product = require("../models/Product");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function createProduct(req, res) {
  try {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new Product({ name, category, price, imgUrl });
    const createdProduct = await newProduct.save();
    res.status(201).json({ message: "Successfully created", createdProduct });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateProduct(req, res) {
  try {
    const newProduct = req.body;
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...newProduct,
      },
      { new: true }
    );
    res.json({ message: "Successfully updated", updatedProduct });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(204).json({
      message: "Successfully deleted",
      deletedProduct,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
