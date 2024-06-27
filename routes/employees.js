const express = require('express');
const router = express.Router();
const { Employee }= require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan employee baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {

 try {
        const { lastName, firstName, birthDate, photo, notes } = req.body;
        const newEmployee = await Employee.create({ lastName, firstName, birthDate, photo, notes });
        res.status(201).json(newEmployee);
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan semua Employee
router.get('/', authenticate, async (req, res, next) => {
 try {
        const employees = await Employee.findAll();
        res.json(employees );
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk menampilkan employee berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
 try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
        res.status(404).json({ message: 'Employee not found' });
        }
     } catch (err) {
     next(err);
     }
});

// Endpoint untuk memperbarui Employee berdasarkan ID
router.put('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const { lastName, firstName, birthDate, photo, notes } = req.body;
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            employee.lastName = lastName;
            employee.firstName = firstName;
            employee.birthDate = birthDate;
            employee.photo = photo;
            employee.notes = notes;
            await employee.save();
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus employee berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
        await employee.destroy();
        res.json({ message: 'Employee deleted' });
        } else {
        res.status(404).json({ message: 'Employee not found' });
    }
     } catch (err) {
        next(err);
     }
});

module.exports = router;