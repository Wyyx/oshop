const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true, min: 0 },
	category: { type: String, required: true },
	imageUrl: { type: String, required: true }
})

mongoose.model('products', ProductSchema)
