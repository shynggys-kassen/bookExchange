const express = require('express'); 
const products = require('./data/products')
const app = express()

app.get('/api/products', (req, res) => {
	console.log(req.rawHeaders); 
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id == req.params.id)
	res.json(product)
})

app.get('/zarina', (req, res) => {
	console.log('zarina is accessed'); 
	res.send('THIS IS MY OWN WEB SITE. ZARINA IS THE BEST!'); 
})

app.get('/', (req, res)=>{
	res.send('here'); 
})

app.listen(80, console.log('server is listening on port 80')); 