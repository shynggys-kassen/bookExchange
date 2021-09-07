const express = require('express'); 
const router = express.Router()
const Product = require('../models/booksModel'); 
const asyncHandler = require('express-async-handler'); 
const ErrorHandler = require('express-async-handler'); 
const jwt = require('jsonwebtoken'); 
const secretToken = 'IAmTheSecretTokenForThisServer'
const User = require('../models/userModel'); 


const validateToken = ErrorHandler(async (req, res, next) => {
	let token
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		console.log('token found'); 
		try {
			token = req.headers.authorization.split(' ')[1]; 
			const decoded = jwt.verify(token, secretToken); 
			console.log(decoded); 

			req.user = await User.findById(decoded.id).select('-password'); 

		} catch (error) {
			console.log(error); 
			res.status(401);
			throw new Error('Token is failed'); 
		}
	} 

	if (!token){
		throw new Error('Token is not autorized'); 
	}

	next()
})



router.get('/', asyncHandler( async (req, res) => {
	const pageSize = 10
	const page = Number(req.query.pageNumber) || 1; 

	console.log(`page: ${page}`); 

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

		console.log(`books ${books}`); 

		res.json({books, page, pages: Math.ceil(count / pageSize)})
	} catch (error){
		throw new Error(error); 
	}


}))


// select product by prodyct id
router.get('/:id', asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);  
	if (product){
		res.json(product); 
	}
	else{
		res.status(404).json({message: 'Product not found'}); 
	}
}))


// create new review
router.post('/:id/reviews', validateToken, asyncHandler(async(req, res) => {
	const {rating, comment,} = req.body; 
	const product = await Product.findById(req.params.id)

	if(product){
		// check if the user has submitted the review already
		const alreadyReviewed = product.reviews.find(r => r.user.toString() == req.user._id.toString())
		if(alreadyReviewed){ 
			res.status(400); 
			throw new Error('Book already reviewed')
		}

		const review = {
			name: req.user.name, 
			rating: Number(rating), 
			comment, 
			user: req.user._id, 
		}

		product.reviews.push(review); 
		product.numReviews += 1; 
		
		product.rating = rating, 

		await product.save()
		res.status(201).json({message: 'Review added'}); 

	}
}))


module.exports = router;







