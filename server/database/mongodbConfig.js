const mongoose = require('mongoose')

// connect to mongodb
const env = process.env.NODE_ENV || 'development'
let mongodbUrl = 'mongodb://oshop_user:google:localhost:28017/oshop'
if (env === 'development') {
  mongodbUrl = 'mongodb://localhost:27017/oshop'
}
mongoose.connect(mongodbUrl, function(err) {
  if (err) {
    console.log('connecting to MongoDB: fail')
  } else {
    console.log('connecting to MongoDB: success')
  }
})
