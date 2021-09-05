const express = require('express'); 
// const products = require('./data/products')
const app = express()
const connectDB = require('./db')
const BookRoutes = require('./routes/bookRoutes'); 
const UserRoutes = require('./routes/userRoutes'); 

connectDB() 
app.use(express.json()); 

app.use('/api/products', BookRoutes);
app.use('/api/user', UserRoutes)

app.listen(5000, console.log('server is listening on port 5000')); 