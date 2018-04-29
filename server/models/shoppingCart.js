const mongoose = require('mongoose')
const { Schema } = mongoose
const ProductSchema = require('./product')

const ShoppingCartSchema = new Schema({
	userId: String,
	createTime: { type: Number, required: true, default: new Date().getTime() },
	items: [
		new Schema({
			quantity: Number,
			product: ProductSchema
		})
	]
})

mongoose.model('shopping_carts', ShoppingCartSchema)
