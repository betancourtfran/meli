'use strict';
const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 3001;

const endPointBaseURL = `https://api.mercadolibre.com`;

app.get('/api/items', (req, res) => {
	let query = [];
	let concatenatedQuery;
	for (const [key, val] of Object.entries(req.query)) {
		query.push(`${key}=${val}`);
		concatenatedQuery = query.join('&');
	}
	const { href: url } = new URL(`sites/MLA/search?${concatenatedQuery}`, endPointBaseURL);
	axios
		.get(url)
		.then(({ data }) => {
			let items = data.results.map((item) => ({
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id || 'ARS',
					amount: item.price || item.original_price,
					decimals: item.decimals,
				},
				picture: item.thumbnail,
				condition: item.condition,
				free_shipping: item.shipping.free_shipping,
				state: item.seller_address.state.name
			}));

			let categories = data.available_filters[0].values.map((category) => category.name);
			let sanitizedResponse = {
				author: {
					name: 'Francisco',
					lastname: 'Betancourt',
				},
				categories: [...categories],
				items: [...items],
			};
			res.send(sanitizedResponse);
		})
		.catch((err) => res.send(err));
});
app.post('/api/world', (req, res) => {
	console.log(req.body);
	res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
