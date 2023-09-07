import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/`;
const API_KEY = '38295237-6c85638feb63d0e1999c7eac4';

export async function getImages(searchQuery, page) {
  const { data } = await axios.get(
    `?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${searchQuery}&page=${page}&per_page=12`
  );
  return data;
}
