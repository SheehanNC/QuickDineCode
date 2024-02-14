const express = require('express')
const router =  express.Router()
const Order = require('../models/Orders')

// router.post('/orderData', async (req, res) => {
//     try {
//         const { email, order_data, order_date } = req.body;

//         let existingOrder = await Order.findOne({ email });

//         if (!existingOrder) {
//             // Create a new order if one doesn't exist
//             const newOrder = new Order({
//                 email,
//                 order_data: [{ Order_date: order_date, ...order_data }]
//             });
//             await newOrder.save();
//         } else {
//             // Update existing order by pushing new order data
//             existingOrder.order_data.push({ Order_date: order_date, ...order_data });
//             await existingOrder.save();
//         }

//         res.json({ success: true });
//     } catch (error) {
//         console.error('Error handling order data:', error);
//         res.status(500).json({ error: 'Failed to handle order data' });
//     }
// });

router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        // Check if an order already exists for the user
        const existingOrder = await Order.findOne({ email });

        if (existingOrder) {
            // Update existing order with new order data
            existingOrder.order_data.push({ Order_date: order_date, ...order_data });
            await existingOrder.save();
        } else {
            // Create a new order if one doesn't exist
            const newOrder = new Order({
                email,
                order_data: [{ Order_date: order_date, ...order_data }]
            });
            await newOrder.save();
        }

        res.json({ success: true });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            console.error('Duplicate key error:', error);
            res.status(400).json({ error: 'Duplicate order detected' });
        } else {
            console.error('Error handling order data:', error);
            res.status(500).json({ error: 'Failed to handle order data' });
        }
    }
});
// Fetch orders for a user
router.post('/myOrderData', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const orders = await Order.find({ email: userEmail });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

module.exports = router;