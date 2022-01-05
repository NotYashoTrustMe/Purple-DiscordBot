const mongoose = require('mongoose');
var colors = require('colors');
require('dotenv').config();

class Database {
	constructor() {
		this.connection = null;
	}

	connect() {
		// print in purple color the message
		console.log('['.black + '.'.cyan + '] '.black + 'Connecting to the database...');
		mongoose
			.connect(process.env.MONGO_URL, {
				useNewUrlParser    : true,
				useUnifiedTopology : true
			})
			.then(() => {
				console.log('['.black + '✓'.cyan + '] '.black + 'Connected to the database'.green);
				this.connection = mongoose.connection;
			})
			.catch((err) => {
				console.log('['.black + 'x'.red + '] '.black + 'Error connecting to the database'.red + '\n' + err);
				process.exit(1);
			});
	}
}

module.exports = Database;