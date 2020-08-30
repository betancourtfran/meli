const express = require('express');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const endPointBaseURL = `https://api.mercadolibre.com/sites/MLA`;

app.get('/api/items*', (req, res) => {
// app.get('/api/items\?q=​:query', (req, res) => {
	console.log(req.params);
	axios
		.get(`/api/items?q=​${req.params.query}`)
		// .get(`${endPointBaseURL}/search?q=${query}`)
		.then((response) => res.json(response.data.results))
		.catch((err) => res.send(err));
	// res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
	console.log(req.body);
	res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
