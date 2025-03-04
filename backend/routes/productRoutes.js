const express = require("express");
const multer = require("multer");
const Product = require("../models/Product.js");
const protect = require("../middleware/authMiddleware.js");

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
        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: path.basename(req.file.path),
            userId: req.user.userId,
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Edit Product
router.put("/:id", protect, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Delete Product
router.delete("/:id", protect, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
