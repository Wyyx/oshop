const mongoose = require('mongoose')

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/oshop', function(err) {
	if (err) {
		console.log('connect to MongoDB: failed')
	} else {
		console.log('connect to MongoDB: succeeded')
	}
})
