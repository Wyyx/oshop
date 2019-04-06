const authenticate = require('../middlewares/authenticateMiddleware')
const mongoose = require('mongoose')
const Product = mongoose.model('products')
const messages = require('../contants/messages')

module.exports = app => {
  app.post('/api/products', authenticate, (req, res) => {
    const product = req.body
    console.log('======== req product:', product)

    new Product(product).save().then(
      product => {
        if (product) {
          res.status(201).send(messages.SUCCESS)
        } else {
          res.status(200).send(messages.FAILURE)
        }
      },
      err => {
        res.status(200).send(messages.FAILURE)
      }
    )
  })

  app.patch('/api/products', authenticate, (req, res) => {
    const product = req.body
    console.log('======== req product:', product)

    Product.update({ _id: product._id }, { $set: product }, function(err, product) {
      if (err) {
        console.log(err)
        return res.status(200).send({ message: messages.FAILURE })
      }
      return res.status(200).send({ message: messages.SUCCESS })
    })
  })

  app.get('/api/products', (req, res) => {
    Product.find().then(
      products => {
        res.status(200).send(products)
      },
      err => {
        res.status(200).send(messages.FAILURE)
      }
    )
  })

  app.get('/api/products/:id', (req, res) => {
    let id = req.params.id

    Product.findById(id).then(
      product => {
        console.log('======== db product:', product)
        if (product) {
          return res.status(200).send(product)
        }
        res.status(400).send(messages.FAILURE)
      },
      err => {
        res.status(500).send(messages.FAILURE)
      }
    )
  })

  app.delete('/api/products/:id', authenticate, (req, res) => {
    let id = req.params.id

    Product.deleteOne({ _id: id }).then(
      result => {
        if (result) {
          res.status(200).send(messages.SUCCESS)
        }
      },
      err => {
        res.status(200).send(messages.FAILURE)
      }
    )
  })
}
