import axios from 'axios';

export default async function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34227071-e179ea07013280bd68b79052b';
  const usersSaerch = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios
    .get(`${BASE_URL}${usersSaerch}`)
    .then(response => response.data);
}

fetchImages();
