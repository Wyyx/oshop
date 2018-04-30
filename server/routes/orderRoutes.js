const jwt = require('jsonwebtoken')
const authenticate = require('../middlewares/authenticateMiddleware')
const mongoose = require('mongoose')
const Order = mongoose.model('orders')
const messages = require('../contants/messages')

module.exports = app => {
	app.post('/api/orders', authenticate, (req, res) => {
		const order = req.body
		console.log('======== req order:', order)
		order.createTime = new Date()

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

	app.get('/api/orders', authenticate, (req, res) => {
		// let token = req.get('Authorization').substring(6)
		// console.log(token)

		let token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiV3l5eCIsImFkbWluIjp0cnVlfQ.TkZdEiMinA_Lh_kS7ZDcxhuxd9ObxYHl0SbckJ-2h6Q'
		let payload = jwt.decode(token)

		console.log('payload', payload)

		Order.find({ userId: payload.id }).then(orders => {
			if (orders) {
				res.status(200).send(orders)
			}
		})
	})

	app.get('/api/orders/:id', authenticate, (req, res) => {
		let id = req.params.id

		Order.findById(id).then(
			order => {
				console.log('======== db order:', order)
				if (order) {
					res.status(200).send(order)
				}
				res.status(400).send(messages.FAILURE)
			},
			err => {
				res.status(500).send(messages.FAILURE)
			}
		)
	})
}
