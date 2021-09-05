const mongoose =  require('mongoose'); 
const url = 'mongodb+srv://shynggys:zdY2Uv3v1StYmP4B@cluster0.letiv.mongodb.net/main?retryWrites=true&w=majority'


const connectDB = async () => {
	try {
		const conn = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
		console.log(`MongoDB is connected ${conn.connection.host}`)
		return conn
	} catch (error) {
		console.log(`Error: ${error}`);
		process.exit(1);  
	}
}

module.exports = connectDB; 