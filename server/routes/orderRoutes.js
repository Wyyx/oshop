const authenticate = require('../middlewares/authenticateMiddleware')
const mongoose = require('mongoose')
const Order = mongoose.model('orders')
const messages = require('../contants/messages')

module.exports = app => {
	app.post('/api/orders', authenticate, (req, res) => {
		const order = req.body
		console.log('======== req order:', order)

		new Order(order).save().then(
			order => {
				if (order) {
					res.status(201).send(order)
				} else {
					res.status(200).send()
				}
			},
			err => {
				res.status(200).send()
			}
		)
	})
}
