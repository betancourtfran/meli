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
			let items = [];
			for (let i = 0; i < 4; i++) {
				items.push({
					id: data.results[i].id,
					title: data.results[i].title,
					price: {
						currency: data.results[i].currency_id || 'ARS',
						amount: data.results[i].price || data.results[i].original_price,
						decimals: data.results[i].decimals,
					},
					picture: data.results[i].thumbnail,
					free_shipping: data.results[i].shipping.free_shipping,
					state: data.results[i].seller_address.state.name,
					item_condition: data.results[i].attributes[1].value_name,
					sold_quantity: data.results[i].sold_quantity,
				});
			}
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
