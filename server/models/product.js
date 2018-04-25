const mongoose = require('mongoose')
const { Schema } = mongoose
const CategorySchema = require('./category')

const ProductSchema = new Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true, min: 0 },
	category: CategorySchema,
	imageUrl: { type: String, required: true }
})

mongoose.model('products', ProductSchema)

module.exports = ProductSchema
