const mongoose = require('mongoose')
const { Schema } = mongoose
const ProductSchema = require('./product')

const ShoppingCartSchema = new Schema({
	createTime: { type: Number, required: true, default: new Date() },
	items: [
		new Schema({
			quantity: Number,
			product: ProductSchema
		})
	]
})

mongoose.model('shopping_carts', ShoppingCartSchema)
