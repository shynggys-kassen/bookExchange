const path = require('path')
const express = require('express'); 
const app = express()
const connectDB = require('./db')
const { notFound, errorHandler } =  require('./middleware/errorMiddleware.js')
const BookRoutes = require('./routes/bookRoutes'); 
const UserRoutes = require('./routes/userRoutes'); 
const UploadRoutes = require('./routes/uploadRoutes'); 


connectDB() 
app.use(express.json()); 

// static files 
app.use('/uploads', express.static(path.join(path.dirname(__dirname), '/uploads'))) // uploads folder is open for server

// routes
app.use('/api/books', BookRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/upload', UploadRoutes);

// PRODUCTION ROUTES
app.use(express.static(path.join(path.dirname(__dirname), '/frontend/build/')))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.dirname(__dirname), 'frontend', 'build', 'index.html')); 
})



// midlewares
app.use(notFound)
app.use(errorHandler)

const PORT = 80
app.listen(PORT, console.log(`server is listening on port ${PORT}`)); 