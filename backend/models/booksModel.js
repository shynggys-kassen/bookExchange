const mongoose = require('mongoose'); 

const reviewSchema = mongoose.Schema({
	name: {type: String, required: true}, 
	rating: {type: Number, required: true}, 
	comment: {type: String, required: true}, 
}, {
	timestamps: true, 
})

const BookSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User', 
	}, 
	title: {
		type: String, 
		required: true,
	}, 
	image: {
		type: String, 
		required: true, 
	}, 
	file: {
		type: String, 
	}, 
	lessonsCode: {
		type: String, 
		required: true, 
	},
	author: {
		type: String,
		required: true, 
	}, 
	description: {
		type: String, 
		required: true, 
	}, 
	rating:{
		type: Number, 
		required: true, 
		default: 0, 
	},
	numReviews: {
		type: Number, 
		required: true, 
		default: 0, 
	}, 
	price: {
		type: Number, 
		required: true, 
		default: 0, 
	},
	reviews: [reviewSchema], 
	format: {
		type: String, 
	}
},{
	timestamps: true, 
})

const Book = mongoose.model('Book', BookSchema);  

module.exports = Book;