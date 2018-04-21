const authenticate = require('../middlewares/authenticateMiddleware')

module.exports = app => {
	app.get('/api/categories', (req, res) => {
		res.send([
			{ id: 1, name: 'Bread' },
			{ id: 2, name: 'Dairy' },
			{ id: 3, name: 'Fruits' },
			{ id: 4, name: 'Seasonings and Spices' },
			{ id: 5, name: 'Vegetables' }
		])
	})
}
