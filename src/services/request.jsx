import axios from 'axios';

const getSingleItemEndPointBaseURL = `/api/item`;
const getMultipleItemsEndPointBaseURL = `/api/items`;

const fetchItems = async (query) =>
	await axios
		.get(getMultipleItemsEndPointBaseURL, {
			params: {
				q: query,
			},
		})
		.then(({ data }) => data)
		.catch((err) => err);

const fetchItemDetails = async (itemId) =>
	await axios
		.get(`${getSingleItemEndPointBaseURL}/${itemId}`)
		.then((res) => res.data)
		.catch((err) => err);

const fetchItemDescription = async (itemId) =>
	await axios
		.get(`${getSingleItemEndPointBaseURL}/${itemId}/description`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => err);

export { fetchItems, fetchItemDetails, fetchItemDescription };
