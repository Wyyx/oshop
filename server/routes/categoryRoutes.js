const authenticate = require('../middlewares/authenticateMiddleware')

module.exports = app => {
	app.get('/api/categories', authenticate, (req, res) => {
		res.send([ 'bread', 'dairy', 'fruits', 'seasonings and Spices', 'vegetables' ])
	})
}
