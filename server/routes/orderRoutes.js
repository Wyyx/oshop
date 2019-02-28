const jwt = require('jsonwebtoken')
const authenticate = require('../middlewares/authenticateMiddleware')
const mongoose = require('mongoose')
const Order = mongoose.model('orders')
const messages = require('../contants/messages')

module.exports = app => {
  app.post('/api/orders', authenticate, async (req, res) => {
    const order = req.body
    console.log('======== req order:', order)
    order.createTime = new Date()

    try {
      const order = await new Order(order).save()
      order ? res.status(201).send(order) : res.status(200).send()
    } catch (error) {
      res.status(200).send()
    }
  })

  app.get('/api/orders', authenticate, async (req, res) => {
    // remove Bearer and one space
    let token = req.get('Authorization').substring(7)
    console.log('token', token)

    let payload = jwt.decode(token)
    console.log('payload', payload)

    const orders = await Order.find(payload.admin ? {} : { userId: payload.id })
    if (orders) {
      res.status(200).send(orders)
    }
  })

  app.get('/api/orders/:id', authenticate, async (req, res) => {
    let id = req.params.id

    try {
      const order = await Order.findById(id)
      order ? res.status(200).send(order) : res.status(400).send(messages.FAILURE)
    } catch (error) {
      res.status(500).send(messages.FAILURE)
    }
  })
}
