// models/CartItem.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    itemId: { type: String, required: true }, // Assuming itemId is a unique identifier for the item
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model('CartItem', cartItemSchema, 'cart_Items');


