const bcrypt = require('bcryptjs'); 


const users = [
	{
		name: 'Shynggys KASSEN', 
		email: '18080342d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}
]
module.exports = users;