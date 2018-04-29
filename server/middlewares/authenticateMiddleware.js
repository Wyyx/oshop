// admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiV3l5eCIsImFkbWluIjp0cnVlfQ.nJFq7fJwd8V1Gx42njn3vp-S5dGCvpJyYqkeqPVytPU
// not admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiV3l5eCIsImFkbWluIjpmYWxzZX0.ryM1MqYVnIhzGe6sDYy2ZNgqmJZyzI99WzaNhBbPYF4
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiV3l5eCIsImFkbWluIjp0cnVlfQ.nJFq7fJwd8V1Gx42njn3vp-S5dGCvpJyYqkeqPVytPU'

module.exports = (req, res, next) => {
	if (req.get('Authorization') === 'Bearer ' + token) {
		next()
	} else {
		res.status(401).send()
	}
}
