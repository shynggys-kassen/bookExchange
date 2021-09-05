const express = require('express'); 
const userRouter = express.Router()
const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken'); 
const { validate } = require('../models/userModel');
const secretToken = 'IAmTheSecretTokenForThisServer'
const ErrorHandler = require('express-async-handler'); 


// generate the secret token
const generateToken = (id) => {
	return jwt.sign({id},  secretToken, {
		expiresIn: '30d',
	})
}

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

// Login 
userRouter.post('/login', async (req, res) => {
	const {email, password} = req.body; 
	const user = await User.findOne({email}); 

	if (user && (await user.matchPassword(password))){
		res.json({
			_id: user._id, 
			name: user.name, 
			email: user.email, 
			token: generateToken(user._id), 
		})
	} else{ 
		res.status(401)
		throw new Error('Invalid email or passord');  
	}
})

// authentication is knowing that this user is this user
// autherisation is saving this user
// we can store it in the browser
userRouter.get('/profile', validateToken, async (req, res) => {
	const user = await User.findById(req.user._id)
	if(user){
		res.json({
			_id: user._id, 
			name: user.name, 
			email: user.email, 
			token: generateToken(user._id), 
		})

	} else {
		res.status(404); 
		throw new Error('User not found'); 
	}
})


userRouter.post('/register', ErrorHandler(async (req, res) => {	
	const {name, email, password} = req.body; 
	
	try {
		if(!email.endsWith('@connect.polyu.hk')){
			res.status(400); 
			throw new Error('the email is not correct'); 
		}
	} catch(error){
		res.status(401);  
		throw new Error('The email is not correct')
	}

	const userExist = await User.findOne({email}); 
	if(userExist){
		res.status(400)
		throw new Error('User already exsits'); 
	}

	const user = await User.create({
		name, 
		email, 
		password, 
	})

	if(user){
		res.status(201); 
		res.json({
			_id: user._id, 
			name: user.name, 
			email: user.email, 
			token: generateToken(user._id), 
		}) 
		}else{
			res.status(400); 
		 	throw new Error('Invalid User Data'); 
	} 
}))
 

module.exports = userRouter;