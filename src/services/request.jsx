import axios from 'axios';

const endPointBaseURL = `/api/items`;

const fetchItems = async (query) =>
	await axios
		.get(endPointBaseURL, {
			params: {
				q: query,
			},
		})
		.then(({ data: { items } }) => items)
		.catch((err) => err);

const fetchItemDetails = async (itemId) =>
	await axios
		.get(`${endPointBaseURL}/${itemId}`)
		.then((res) => res)
		.catch((err) => err);

const fetchItemDescription = async (itemId) =>
	await axios
		.get(`${endPointBaseURL}/${itemId}/description`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => err);

export { fetchItems, fetchItemDetails, fetchItemDescription };
