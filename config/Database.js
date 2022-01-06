const mongoose = require('mongoose');
var colors = require('colors');
require('dotenv').config();

class Database {
	constructor() {
		this.connection = null;
	}

	connect() {
		mongoose
			.connect(process.env.MONGO_URL, {
				useNewUrlParser    : true,
				useUnifiedTopology : true
			})
			.then(() => {
				console.log('['.black + '✓'.cyan + '] '.black + 'Connected to the database'.green);
				this.connection = mongoose.connection;
				return this.connection;
			})
			.catch((err) => {
				console.log('['.black + 'x'.red + '] '.black + 'Error connecting to the database'.red + '\n' + err);
				return(err);
			});
	}
}

module.exports = Database;