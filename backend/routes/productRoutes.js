const express = require("express");
const multer = require("multer");
const Product = require("../models/Product.js");
const protect = require("../middleware/authMiddleware.js");
const path = require("path");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Add Product
router.post("/", protect, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: path.basename(req.file.path),
            userId: req.user.userId,
        });

        res.json(product);
    } catch (error) {
        console.error("Error adding product:", error); // Debugging log
        res.status(500).json({ message: "Server error", error });
    }
});


// Get a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


// Edit Product
router.put("/:id", async (req, res) => {
    try {
      const { title, price } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { title, price },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
// Delete Product
router.delete("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

router.get("/user/:userId", async (req, res) => {
    try {
      const products = await Product.find({ userId: req.params.userId });
      res.json(products);
    } catch (error) {
      console.error("Error fetching user products:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
