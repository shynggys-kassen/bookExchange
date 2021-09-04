const express = require('express'); 
const products = require('./data/products')
const app = express()
const connectDB = require('./db')

const connection = connectDB()

app.get('/api/products', (req, res) => {
	console.log(req.rawHeaders); 
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id == req.params.id)
	res.json(product)
})


app.listen(80, console.log('server is listening on port 80')); 