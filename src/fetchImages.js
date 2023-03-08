import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34227071-e179ea07013280bd68b79052b';

async function getImages(themeOfPhoto) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: `dog`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getImages()