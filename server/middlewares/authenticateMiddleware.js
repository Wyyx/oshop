// admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6dHJ1ZX0.Az8U4HBH7f4Xh25MMYyg58105ZVVXjEOAn1mZuH7wfo
// not admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6ZmFsc2V9.77je6FjlslNxGswq5fLGpD4kMSDSzpKjc8wKJNDJe8o
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ild5eXgiLCJhZG1pbiI6dHJ1ZX0.Az8U4HBH7f4Xh25MMYyg58105ZVVXjEOAn1mZuH7wfo'

module.exports = (req, res, next) => {
	if (req.get('Authorization') === 'Bearer ' + token) {
		next()
	} else {
		res.status(401).send()
	}
}
