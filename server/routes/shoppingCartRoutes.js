const mongoose = require('mongoose')
const ShoppingCart = mongoose.model('shopping_carts')

module.exports = app => {
	app.get('/api/shopping_carts/create', (req, res) => {
		new ShoppingCart().save().then(
			cart => {
				console.log('======== db cart:', cart)
				if (cart) {
					return res.status(200).send(cart)
				}
				res.status(400).send()
			},
			err => {
				res.status(500).send()
			}
		)
	})

	app.get('/api/shopping_carts/:id', (req, res) => {
		let id = req.params.id

		ShoppingCart.findById(id).then(
			cart => {
				console.log('======== db cart:', cart)
				if (cart) {
					return res.status(200).send(cart)
				}
				res.status(400).send()
			},
			err => {
				res.status(500).send()
			}
		)
	})

	app.delete('/api/shopping_carts/delete/:id', (req, res) => {
		let id = req.params.id
		console.log('======== delete shoppingCart')

		ShoppingCart.deleteOne({ _id: id }).then((result, err) => {
			if (result) {
				console.log(result)
				return res.status(200).send()
			}

			res.status(400).send()
		})
	})

	app.put('/api/shopping_carts', (req, res) => {
		let cart = req.body
		console.log('======== req shoppingCart:', cart)

		ShoppingCart.update({ _id: cart._id }, { $set: cart }, function(err, cart) {
			if (err) {
				console.log(err)
				return res.status(400).send()
			}
			res.status(200).send(cart)
		})
	})
}
