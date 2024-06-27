var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var {sequelize} = require('./models');

//route 
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var suppliersRouter = require('./routes/suppliers');
var employeesRouter = require('./routes/employees');
var customersRouter = require('./routes/customers');
var orderdetailsRouter = require('./routes/orderdetails');
var ordersRouter = require('./routes/orders');
var shipperRouter = require('./routes/shippers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/suppliers', suppliersRouter);
app.use('/employees', employeesRouter);
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/shippers', shipperRouter);
app.use('/suppliers', suppliersRouter);
app.use('/orderdetails', orderdetailsRouter);


module.exports = app;