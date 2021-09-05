const express = require('express'); 
const router = express.Router()
const Product = require('../models/booksModel'); 


router.get('/', (req, res) => {
	const fetchProducts = async () => {
		try{
			const products = await Product.find({}); 
			res.json(products)
		} catch (error){
			console.log(error); 
		}
	}

	fetchProducts()
})

router.get('/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);  
	if (product){
		res.json(product); 
	}
	else{
		res.status(404).json({message: 'Product not found'}); 
	}
})

module.exports = router;
