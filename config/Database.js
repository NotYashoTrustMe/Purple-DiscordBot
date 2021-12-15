const mongoose = require('mongoose');
require('dotenv').config();

class Database {
	constructor() {
		this.connection = null;
	}
	
	connect() {
		console.log('\u001B[32m' + '[.] Connecting to the database' + '\u001B[0m');
		mongoose
			.connect(process.env.MONGO_URL, {
				useNewUrlParser    : true,
				useUnifiedTopology : true
			})
			.then(() => {
				console.log('\u001B[36m' + '[✓] Success: Connected to the database!' + '\u001B[0m');
				this.connection = mongoose.connection;
			})
			.catch((err) => {
				console.error('\r\u001B[31m' + '[x] Error connecting to the database: ' + '\u001B[0m', err);
			});
	}
}

module.exports = Database;
