const express = require('express'); 
const router = express.Router()
const Product = require('../models/booksModel'); 
const asyncHandler = require('express-async-handler'); 



router.get('/', asyncHandler( async (req, res) => {
	const pageSize = 2
	const page = Number(req.query.pageNumber) || 1; 

	const keyword = req.query.keyword ? {
		// regex
		title: {
			$regex: req.query.keyword, 
			$options: 'i', // case-insensative
		}
	} : {}

	
	
	try{
		// paginated products
		// limit is used to limit array length
		// skip is the skip the beginning elements in the array (page - 1) as page starts with 1
		const count = await Product.countDocuments({...keyword}); 
		const books = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));   

		res.json({books, page, pages: Math.ceil(count / pageSize)})
	} catch (error){
		throw new Error(error); 
	}


}))

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
