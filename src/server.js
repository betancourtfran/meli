'use strict';
const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 3001;

const endPointBaseURL = `https://api.mercadolibre.com`;

//constructs a new object with wanted props
const parseData = (data) => {
	if (data.length > 0) {
		return data.map((item) => ({
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
			item_condition: item.attributes.filter((attr) => attr.id === 'ITEM_CONDITION')[0].value_name,
			sold_quantity: item.sold_quantity,
		}));
	} else {
		return {
			id: data.id,
			title: data.title,
			price: {
				currency: data.currency_id || 'ARS',
				amount: data.price || data.original_price,
				decimals: 0,
			},
			picture: data.thumbnail,
			free_shipping: data.shipping.free_shipping,
			state: data.seller_address.state.name,
			item_condition: data.attributes.filter((attr) => attr.id === 'ITEM_CONDITION')[0].value_name,
			sold_quantity: data.sold_quantity,
		};
	}
};

//defines route for items fetching based on query
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
			let items = parseData(data.results);
			let categories = data.filters[0].values[0].path_from_root.map((category) => category);
			let mergedResponse = {
				author: {
					name: 'Francisco',
					lastname: 'Betancourt',
				},
				categories: [...categories],
				items: [...items],
			};
			res.send(mergedResponse);
		})
		.catch((err) => res.send(err));
});

//defines route to fetch specific item based on id
app.get('/api/item/:id', (req, res) => {
	const { href: url } = new URL(`items/${req.params.id}`, endPointBaseURL);
	axios
		.get(url)
		.then(({ data }) => {
			let item = parseData(data);
			res.send(item);
		})
		.catch((err) => res.send(err));
});

//defines route to fetch specific item description based on id
app.get('/api/item/:id/description', (req, res) => {
	const { href: url } = new URL(`items/${req.params.id}/description`, endPointBaseURL);
	axios
		.get(url)
		.then(({ data }) => {
			res.send(data.plain_text);
		})
		.catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
