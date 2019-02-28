const { token } = require('../middlewares/token')
module.exports = app => {
  app.post('/api/authenticate', (req, res) => {
    const { email, password } = req.body
    console.log('========', req.body)

    if (email === 'gnehcyx@163.com' && password === '123456') {
      res.status(200).send({ token })
    } else {
      res.status(401).send()
    }
  })
}
