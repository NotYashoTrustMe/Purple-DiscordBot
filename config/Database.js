const mongoose = require('mongoose');
require('dotenv').config();

class Database {
	constructor() {
		this.connection = null;
	}
	
	connect() {
		console.log('\u001B[33m' + 'Connecting to the database...' + '\u001B[0m');
		mongoose
			.connect(process.env.MONGO_URL, {
				useNewUrlParser    : true,
				useUnifiedTopology : true
			})
			.then(() => {
				console.log('\u001B[32m' + 'Success: Connected to the database!' + '\u001B[0m');
				this.connection = mongoose.connection;
			})
			.catch((err) => {
				console.error('\u001B[31m' + 'Error connecting to the database: ' + '\u001B[0m', err);
			});
	}
}

module.exports = Database;
