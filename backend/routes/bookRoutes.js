const express = require('express'); 
const router = express.Router()
const Product = require('../models/booksModel'); 
const asyncHandler = require('express-async-handler'); 
const ErrorHandler = require('express-async-handler'); 
const jwt = require('jsonwebtoken'); 
const secretToken = 'IAmTheSecretTokenForThisServer'
const User = require('../models/userModel'); 

// validate token form the local storage
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


// list all the books
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


// select book by book id
router.get('/:id', asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);  
	if (product){
		res.json(product); 
	}
	else{
		res.status(404).json({message: 'Product not found'}); 
	}
}))


// create new book
router.post('/', validateToken, asyncHandler(async (req, res) => {
	console.log('create new book'); 
	const product = new Product({
    user: req.user._id,
		title: 'Sample name',
		author: 'Sample', 
    image: '/images/sample.jpg',
		file: '/books/sample.jpg', 
    lessonsCode: 'CSE111111',
    description: 'Message me to get this book',
		rating: 0, 
		numReviews: 0, 
    price: 0,
		reviews: [], 
		format: 'PDF', 
  })

  const createdBook = await product.save()
  res.status(201).json(createdBook)
}))


// update book
router.put('/:id', validateToken, asyncHandler(async (req, res) => {
	const {
		title, 
		author, 
    image, 
		file, 
    lessonsCode, 
    description, 
		rating, 
		numReviews, 
    price,
		format,  
  } = req.body

  const book = await Product.findById(req.params.id)

  if (book) {
    book.title = title
		book.author = author
    book.image = image
		book.file = file
    book.lessonsCode = lessonsCode
    book.description = description
		book.rating = rating
		book.numReviews = numReviews
    book.price = price
		book.format = format

    const updatedProduct = await book.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}))


// create new book
router.delete('/:id', validateToken, asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
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







