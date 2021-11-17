import axios from 'axios';
export { fetchImages };

const BASE_URL = 'https://pixabay.com/api/';
let page = 1;

function fetchImages(requestValue) {
  return axios.get(
    `${BASE_URL}?key=24382871-0dfafbe4154b35f3845ecea69&q=${requestValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  );
}
