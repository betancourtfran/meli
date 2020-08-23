import axios from 'axios';

const endPointBaseURL = `https://api.mercadolibre.com/sites/MLA/search​`;

const getItems = query => axios.get(`${endPointBaseURL}?q=${query}`).then(res => res.data.results).catch(err => err);
const getItemDetails = itemId => axios.get(`${endPointBaseURL}/${itemId}`).then(res => res.data).catch(err => err);

export {
    getItems,
    getItemDetails
};

