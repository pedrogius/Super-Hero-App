const express = require('express');
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
	res.send('API is running');
});

app.get(
	'/api/:id',
	asyncHandler(async (req, res) => {
		const { data } = await axios(
			`https://superheroapi.com/api/${process.env.ACCESS_TOKEN}/${req.params.id}`
		);
		if (data.response === 'error') {
			throw createError(404, 'Hero does not exist');
		}
		res.json(data);
	})
);

app.get(
	'/api/search/:hero',
	asyncHandler(async (req, res) => {
		const { data } = await axios(
			`https://superheroapi.com/api/${process.env.ACCESS_TOKEN}/search/${req.params.hero}`
		);
		res.json(data);
	})
);

app.use((err, req, res, next) => {
	res.status(err.status);
	res.json({ error: err.message });
});

app.listen(5000, console.log('Server Running on Port 5000'));
