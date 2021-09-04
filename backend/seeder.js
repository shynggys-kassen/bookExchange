const mongoose = require('mongoose'); 
const users = require('./data/users'); 
const books = require('./data/books');
const User = require('./models/userModel');
const Book = require('./models/booksModel');
const connectDB = require('./db'); 
const { OrderedBulkOperation } = require('mongodb');

const connection = connectDB(); 

const importData = async () => {
	try{
		await Book.deleteMany()
		await User.deleteMany()

		console.log(users);

		const createUsers = await User.insertMany(users); 
		const mainUser = createUsers[0]._id
		const smapleBooks = books.map((book) => {
			return {...book, user: mainUser}; 
		})
		const createBooks = Book.insertMany(smapleBooks);

	}
	catch(error){
		console.log('error in seeder.js: ' + error); 
		process.exit(1); 
	}
}


importData(); 