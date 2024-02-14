// routes/cartRoutes.js

const express = require('express');
const CartItem = require('../models/UserCart');

const router = express.Router();

// Add item to cart
router.post('/addcart', async (req, res) => {
    try {
        const { id, name, price, qty, size, userEmail } = req.body;
        const cartItem = new CartItem({
            itemId: id,
            name : name,
            price: price,
            quantity: qty,
            size: size,
            userEmail: userEmail
        });

        await cartItem.save();
        res.status(200).json({ success: true, message: 'Item added to cart' });
    } 
    catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }

});

router.get('/cartItems', async (req, res) => {
    try {
        const userEmail = req.query.userEmail;
        // Fetch all cart items from the database
        const cartItems = await CartItem.find({ userEmail: userEmail });
        
        // Send the cart items as the response
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});

router.get('/cartItemCount', async (req, res) => {
    try {
        const userEmail = req.query.userEmail;
        // Count the number of cart items for the user
        const itemCount = await CartItem.countDocuments({ userEmail: userEmail });

        // Send the item count as the response
        res.status(200).json({ count: itemCount });
    } catch (error) {
        console.error('Error fetching cart item count:', error);
        res.status(500).json({ error: 'Failed to fetch cart item count' });
    }
});

router.delete('/deleteItems/:name', async (req, res) => {
    try {
        const itemName = req.params.name;
        const userEmail = req.query.userEmail;
        // Find and delete the cart item by name
        await CartItem.findOneAndDelete({ name: itemName, userEmail: userEmail });
        await CartItem.findOneAndDelete({ name: itemName });
        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ success: false, message: 'Failed to delete item from cart' });
    }
});

router.delete('/deleteAllItems', async (req, res) => {
    try {
        const userEmail = req.query.userEmail;
        // Find and delete all cart items for the user
        await CartItem.deleteMany({ userEmail: userEmail });
        res.status(200).json({ success: true, message: 'All items deleted successfully' });
    } catch (error) {
        console.error('Error deleting items from cart:', error);
        res.status(500).json({ success: false, message: 'Failed to delete items from cart' });
    }
});

module.exports = router;
