import axios from 'axios';
export { fetchImages, resetPage };

const BASE_URL = 'https://pixabay.com/api/';
let page = 1;

async function fetchImages(requestValue) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=24382871-0dfafbe4154b35f3845ecea69&q=${requestValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=${page}`,
    );
    page += 1;
    return response;
  } catch (error) {
    console.log(error);
  }
}

function resetPage() {
  page = 1;
}
