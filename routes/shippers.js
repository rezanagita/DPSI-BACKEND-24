const express = require('express');
const router = express.Router();
const {Shipper} = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan shipper baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {

 try {
        const { shipperName, phone } = req.body;
        const newShipper = await Shipper.create({ shipperName, phone });
        res.status(201).json(newShipper);
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan semua Shipper
router.get('/', authenticate, async (req, res, next) => {
 try {
        const shippers = await Shipper.findAll();
        res.json(shippers);
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan shipper berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
 try {
        const shipper = await Shipper.findByPk(req.params.id);
        if (product) {
            res.json(shipper);
        } else {
        res.status(404).json({ message: 'Shipper not found' });
        }
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk memperbarui shipper berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const { shipperName, phone} = req.body;
        const shipper = await Shipper.findByPk(req.params.id);
        if (product) {
            shipper.shipperName = shipperName;
            shipper.phone = phone;
            await shipper.save();
            res.json(shipper);
        } else {
            res.status(404).json({ message: 'Shipper not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus Shipper berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const shipper = await Product.findByPk(req.params.id);
        if (shipper) {
        await shipper.destroy();
        res.json({ message: 'Shipper deleted' });
        } else {
        res.status(404).json({ message: 'Shipper not found' });
    }
     } catch (err) {
        next(err);
     }
});

module.exports = router;