const mongoose = require('mongoose')
const { Schema } = mongoose
const ProductSchema = require('./product')

const OrderSchema = new Schema({
	userId: { type: String, required: true },
	shipping: new Schema({
		name: String,
		address: [ String ],
		city: String
	}),
	items: [
		new Schema({
			quantity: Number,
			product: ProductSchema
		})
	],
	createTime: { type: Number, default: Date.now() }
})

mongoose.model('orders', OrderSchema)

module.exports = OrderSchema
