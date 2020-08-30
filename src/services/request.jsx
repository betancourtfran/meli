import axios from 'axios';

// const endPointBaseURL = `https://api.mercadolibre.com/sites/MLA`;
// const endPointBaseURL = `http://localhost:5000`;
// axios.defaults.headers.get;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const fetchItems = (query) =>
	axios
		.get(`/api/items?q=​${query}`)
		// .get(`${endPointBaseURL}/search?q=${query}`)
		.then((res) => res.data.results)
		.catch((err) => err);
const fetchItemDetails = async (itemId) =>
	await axios
		.get(`/${itemId}`)
		// .get(`${endPointBaseURL}/${itemId}`)
		.then((res) => res.data)
		.catch((err) => err);

export { fetchItems, fetchItemDetails };
