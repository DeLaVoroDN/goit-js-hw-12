import axios from 'axios';

export async function buildUrl(query, page) {
  const API_KEY = '42695738-6b8e09c0e47bd53fa68e0735a';
  const URL = 'https://pixabay.com/api/';

  const fetchGallery = await axios.get(URL, {
    params: {
      per_page: 15,
      page: page,
      key: API_KEY,
      q: query,
      IMAGE_TYPE: 'photo',
      SAFESEARCH: 'true',
      ORIENTATION: 'horizontal',
    },
  });

  return fetchGallery.data;
}
