const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
require('./models/product')
require('./models/shoppingCart')
require('./models/order')
require('./database/mongodbConfig')

const app = express()

// use middlewares
app.use(bodyParser.json())

// services routes
require('./routes/categoryRoutes')(app)
require('./routes/authRoutes')(app)
require('./routes/productRoutes')(app)
require('./routes/shoppingCartRoutes')(app)
require('./routes/orderRoutes')(app)

// static resources
const staticPath = path.join(__dirname, '..', 'dist')
app.use(express.static(staticPath))
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// start app
const PORT = process.env.PORT || 5000
app.listen(PORT, function() {
  console.log('server is up on port', PORT)
})
