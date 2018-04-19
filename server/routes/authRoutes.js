const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6dHJ1ZX0.Az8U4HBH7f4Xh25MMYyg58105ZVVXjEOAn1mZuH7wfo'

module.exports = app => {
	app.post('/api/authenticate', (req, res) => {
		const { email, password } = req.body
		console.log('========', req.body)

		if (email === 'gnehcyx@163.com' && password === '1234') {
			res.status(200).send({ token })
		} else {
			res.status(401).send()
		}
	})
}
