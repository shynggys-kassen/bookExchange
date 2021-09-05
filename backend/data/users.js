const bcrypt = require('bcryptjs'); 


const users = [
	{
		name: 'Shynggys KASSEN', 
		email: '18080342d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Shynggys KASSEN', 
		email: '16502132d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Tomiris Korganvay', 
		email: '18020141d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Lula', 
		email: '18020146d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Vincent', 
		email: '18020143d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Johan Setiwan', 
		email: '18020149d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Mia Chan', 
		email: '18020140d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Andrew Ng', 
		email: '18020123d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'Jason Li', 
		email: '18020321d@connect.polyu.hk', 
		password: bcrypt.hashSync('shynggys777'), 
	}, 
	{
		name: 'quest', 
		email: 'quest@connect.polyu.hk', 
		password: bcrypt.hashSync('quest'), 
	}, 
]
module.exports = users;