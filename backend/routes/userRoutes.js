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
userRouter.post('/login', ErrorHandler(async (req, res) => {
	console.log('request'); 
	const {email, password} = req.body; 
	console.log(email, password); 
	const user = await User.findOne({email}); 

	try{
		if (user && (await user.matchPassword(password))){
			res.json({
				_id: user._id, 
				name: user.name, 
				email: user.email, 
				token: generateToken(user._id), 
			})
		} else{ 
			res.status(401)
			throw new Error('Invalid email or password');  
		}
	} catch(error) {
		res.status(401); 
		throw new Error('Email or Password is incorrect'); 
	}
}))


// authentication is knowing that this user is this user
// autherisation is saving this user
// we can store it in the browser
userRouter.get('/profile', validateToken, ErrorHandler(async (req, res) => {
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
}))


userRouter.post('/register', ErrorHandler(async (req, res) => {	
	const {name, email, password} = req.body; 
	console.log('name'); 
	console.log(name, email, password); 
	
	try {
		if(!email.endsWith('@connect.polyu.hk')){
			res.status(401); 
			throw new Error('Please enter PolyU email account'); 
		}
	} catch(error){
		res.status(401);  
		throw new Error('Please enter PolyU email account')
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


// PUT PROFILE 
userRouter.put('/profile', validateToken,  ErrorHandler(async (req, res) => {
	const user = await User.findById(req.user._id); 
	
	if(user){
		user.name = req.body.name || user.name; 
		user.email = req.body.email || user.email; 
		
		if(req.body.password){
			user.password = req.body.password; 
		}
		
		const updatedUser = await user.save(); 
		res.json({
			_id: updatedUser._id, 
			name: updatedUser.name, 
			email: updatedUser.email, 
			token: generateToken(updatedUser._id), 
		})
	} else {
		res.status(400); 
		throw new Errpr('User not found');
	}
}))




module.exports = userRouter;