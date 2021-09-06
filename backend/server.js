const express = require('express'); 
const app = express()
const connectDB = require('./db')
const { notFound, errorHandler } =  require('./middleware/errorMiddleware.js')
const BookRoutes = require('./routes/bookRoutes'); 
const UserRoutes = require('./routes/userRoutes'); 

connectDB() 
app.use(express.json()); 

app.use('/api/books', BookRoutes);
app.use('/api/user', UserRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(5000, console.log('server is listening on port 5000')); 