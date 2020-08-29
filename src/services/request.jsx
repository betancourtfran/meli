import axios from 'axios';

const endPointBaseURL = `https://api.mercadolibre.com/sites/MLA`;

const fetchItems = (query) =>
	axios
		.get(`${endPointBaseURL}/search?q=${query}`)
		.then((res) => res.data.results)
		.catch((err) => err);
const fetchItemDetails = async (itemId) =>
	await axios
		.get(`${endPointBaseURL}/${itemId}`)
		.then((res) => res.data)
		.catch((err) => err);

export { fetchItems, fetchItemDetails };
