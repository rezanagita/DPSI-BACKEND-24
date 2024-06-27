const express = require('express');
const router = express.Router();
const {Order} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan Order baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {

 try {
        const {  customerID, firstName, employeeID, orderDate, shipperID } = req.body;
        const newOrder = await Order.create({customerID, firstName, employeeID, orderDate, shipperID });
        res.status(201).json(newOrder);
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan semua Order
router.get('/', authenticate, async (req, res, next) => {
 try {
        const orders = await Order.findAll();
        res.json(orders);
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan order berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
 try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.json(order);
        } else {
        res.status(404).json({ message: 'order not found' });
        }
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk memperbarui order berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
        const order = await Product.findByPk(req.params.id);
        if (order) {
            order.customerID = customerID;
            order.firstName = firstName;
            order.employeeID = employeeID;
            order.orderDate = orderDate;
            order.shipperID = shipperID;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus order berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
        await order.destroy();
        res.json({ message: 'Order deleted' });
        } else {
        res.status(404).json({ message: 'Order not found' });
    }
     } catch (err) {
        next(err);
     }
});

module.exports = router;