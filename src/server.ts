import express from 'express'

const app = express();

app.get('/', async (req, res) => {
	res.send('hello Worlds')
})

app.listen(3000, () => {
	console.log('Server running on port 3000')
})
