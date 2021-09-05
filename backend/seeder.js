const mongoose = require('mongoose'); 
const users = require('./data/users'); 
const books = require('./data/books');
const User = require('./models/userModel');
const Book = require('./models/booksModel');
const connectDB = require('./db'); 
const { OrderedBulkOperation } = require('mongodb');

const connection = connectDB(); 

function getRandom(){
	let max = users.length - 1; 
	return Math.floor(Math.random() * max);
}

const importData = async () => {
	try{
		await Book.deleteMany()
		await User.deleteMany()

		const createUsers = await User.insertMany(users); 


		const samapleBooks = books.map((book) => {
			let index = getRandom()
			const mainUser = createUsers[index]._id
			return {...book, user: mainUser}; 
		})

		console.log(samapleBooks[0]); 

		const createBooks = Book.insertMany(samapleBooks);
	}
	catch(error){
		console.log('error in seeder.js: ' + error); 
		process.exit(1); 
	}
}


importData(); 