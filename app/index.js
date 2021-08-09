require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
 


// Databases
require('./db/sequelize');


app.use(cors())

// parse application/json
app.use(bodyParser.json())

const CustomerService = require('./services/CustomerService')

const ProductService = require('./services/ProductService')

const InvoiceService = require('./services/InvoiceService')

app.route('/').get(async (req, res) => {
	try {
		res.json({status:true,
			message:"Welcome to Aviyel invoicing"
		});
	} catch (e) {
		throw e;
	}
});


app.route('/customers').get(async (req, res) => {
	try {
		const customers = await CustomerService.findAll()
	
		res.json(customers);
	} catch (e) {
		throw e;
	}
});

app.route('/customers/:user_id').get(async (req, res) => {
	try {
		const params = req.params
		const customer = await CustomerService.findOne(params)
	
		res.json(customer);
	} catch (e) {
		throw e;
	}
});


app.route('/customers').post(async (req, res) => {
	try {

		let data = req.body

		const user = await CustomerService.create(data)
		res.json(user);
	} catch (e) {
		throw e;
	}
});


app.route('/products').get(async (req, res) => {
	try {
		const customers = await ProductService.findAll()
	
		res.json(customers);
	} catch (e) {
		throw e;
	}
});

app.route('/products/:product_id').get(async (req, res) => {
	try {
		const params = req.params
		const customer = await ProductService.findOne(params)
	
		res.json(customer);
	} catch (e) {
		throw e;
	}
});


app.route('/products/search').get(async (req, res) => {
	try {

		const query = req.query
		const products = await ProductService.search(query)
	
		res.json(products);
	} catch (e) {
		throw e;
	}
});

app.route('/products').post(async (req, res) => {
	try {

		let data = req.body

		const user = await ProductService.create(data)
		res.json(user);
	} catch (e) {
		throw e;
	}
});



app.route('/invoices/:invoice_id').get(async (req, res) => {
	try {
		const params = req.params
		const customer = await InvoiceService.findOne(params)
	
		res.json(customer);
	} catch (e) {
		throw e;
	}
});


app.route('/invoices').get(async (req, res) => {
	try {
		const invoices = await InvoiceService.findAll()
	
		res.json(invoices);
	} catch (e) {
		throw e;
	}
});

app.route('/invoices').post(async (req, res) => {
	try {
		
		const data = req.body
		const invoices = await InvoiceService.create(data)
	
		res.json(invoices);
	} catch (e) {
		throw e;
	}
});



const port = process.env.NODEJS_LOCAL_PORT || 3000;
app.listen(port, () => {
	console.log(`Worker: process ${process.pid} is up on port ${port}`);
});
