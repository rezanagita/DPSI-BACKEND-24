const express = require('express');
const router = express.Router();
const {OrderDetail} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan orderDetail baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {

    try {
           const { orderID, productID, quantity } = req.body;
           const newOrderDetail = await OrderDetail.create
           ({ 
                orderID, 
                productID, 
                quantity
           });
           res.status(201).json(newOrderDetail);
        } catch (err) {
        next(err);
        }
   });
// Endpoint untuk menampilkan semua orderDetail
router.get('/', authenticate, async (req, res, next) => {
 try {
        const  orderDetails = await OrderDetail.findAll();
        res.json(orderDetails);
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan orderDetails berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
 try {
        const orderDetail = await OrderDetail.findByPk(req.params.id);
        if (orderDetail) {
            res.json(orderDetail);
        } else {
        res.status(404).json({ message: 'Order Details not found' });
        }
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk memperbarui orderDetails berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const { orderID, productID, quantity } = req.body;
        const orderDetail = await OrderDetail.findByPk(req.params.id);
        if (orderDetail) {
            orderDetail.orderID = orderID;
            orderDetail.productID = productID;
            orderDetail.quantity = quantity;
            await  orderDetail.save();
            res.json( orderDetail);
        } else {
            res.status(404).json({ message: ' Order Detail not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus  orderDetail berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const orderDetail = await OrderDetail.findByPk(req.params.id);
        if ( orderDetail) {
        await  orderDetail.destroy();
        res.json({ message: ' Order Detail deleted' });
        } else {
        res.status(404).json({ message: 'Order Detail not found' });
    }
     } catch (err) {
        next(err);
     }
});

module.exports = router;