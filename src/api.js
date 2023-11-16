import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '40620310-2df20b2656f73baff4c7bc1d2';
const per_page = 12;

export const getImages = async (query, page) => {
  const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${page}`,
    per_page: `${per_page}`,
  });
  const response = await axios.get(`?${params}`);
  return response.data;
};
