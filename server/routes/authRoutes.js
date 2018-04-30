const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiV3l5eCIsImFkbWluIjp0cnVlfQ.TkZdEiMinA_Lh_kS7ZDcxhuxd9ObxYHl0SbckJ-2h6Q'

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
