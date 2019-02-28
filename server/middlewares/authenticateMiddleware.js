const { token } = require('./token')

module.exports = (req, res, next) => {
  if (req.get('Authorization') === 'Bearer ' + token) {
    next()
  } else {
    res.status(401).send()
  }
}
