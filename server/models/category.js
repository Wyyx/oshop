const mongoose = require('mongoose')
const { Schema } = mongoose

const CategorySchema = new Schema({
	id: Number,
	name: String
})

module.exports = CategorySchema
