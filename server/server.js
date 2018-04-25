const express = require('express')
const bodyParser = require('body-parser')
require('./models/product')
require('./models/shoppingCart')
require('./database/mongodbConfig')

const app = express()

// use middlewares
app.use(bodyParser.json())

// services routes
require('./routes/categoryRoutes')(app)
require('./routes/authRoutes')(app)
require('./routes/productRoutes')(app)
require('./routes/shoppingCartRoutes')(app)

// start app
const PORT = 5000
app.listen(PORT, function() {
	console.log('server is up on port', PORT)
})
