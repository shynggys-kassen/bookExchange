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

// static middleware
app.use('/uploads', express.static(path.join(path.dirname(__dirname), '/uploads'))) // uploads folder is open for server
console.log('here')
console.log(path.join(path.dirname(__dirname), '/uploads')) 
// const dirname = path.resolve()
// app.use('/uploads', express.static(path.join(dirname, '/uploads')))

console.log('resolve'); 
console.log(path.resolve())

app.use('/api/books', BookRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/upload', UploadRoutes);

// console.log('__dirname')
// console.log(__dirname); 


// midlewares
app.use(notFound)
app.use(errorHandler)

app.listen(5000, console.log('server is listening on port 5000')); 