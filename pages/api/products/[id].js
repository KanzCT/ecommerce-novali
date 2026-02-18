'use strict';

const express = require('express');
const router = express.Router();
const products = require('../../data/products'); // Assuming you have product data in this path

// Get product by ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id === productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Update product by ID
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        const updatedProduct = {...products[productIndex], ...req.body};
        products[productIndex] = updatedProduct;
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete product by ID
router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;