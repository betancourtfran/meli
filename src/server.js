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
	const { href: url } = new URL(`sites/MLA/search?${concatenatedQuery}&limit=4`, endPointBaseURL);
	axios
		.get(url)
		.then(({ data }) => {
			let items = data.results.map((item) => ({
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id || 'ARS',
					amount: item.price || item.original_price,
					decimals: 0,
				},
				picture: item.thumbnail,
				free_shipping: item.shipping.free_shipping,
				state: item.seller_address.state.name,
				item_condition: item.attributes[1].value_name,
				sold_quantity: item.sold_quantity,
			}));
			let categories = data.filters[0].values[0].path_from_root.map((category) => category);
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
app.get('/api/items/:id/description', (req, res) => {
	const { href: url } = new URL(`items/${req.params.id}/description`, endPointBaseURL);
	axios
		.get(url)
		.then(({ data }) => {
			res.send(data.plain_text);
		})
		.catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
