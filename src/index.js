import './sass/main.scss';
import { fetchImages } from './fetchImages';
import { showButton, hideButton } from './showAndHideButton';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

hideButton(refs.loadMoreButton);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.searchQuery.value;

  fetchImages(inputValue).then(images => {
    const imagesArray = images.data.hits;
    console.log(imagesArray);

    if (imagesArray.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    } else {
      renderGallery(imagesArray);
      showButton(refs.loadMoreButton);
    }
  });
}

function onLoadMore() {
  console.log('click');
}

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
          <a href="${image.largeImageURL}">
        <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
        <p class="info-item">
        <b>Likes</b>
        ${image.likes}
        </p>
        <p class="info-item">
        <b>Views</b>
        ${image.views}
        </p>
        <p class="info-item">
        <b>Comments</b>
        ${image.comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
        ${image.downloads}
        </p>
        </div>
        </div>
          </a>`;
    })
    .join('');
  refs.container.innerHTML = markup;
  // refs.container = new SimpleLightbox('.gallery a', { captionDelay: 250, showCounter: false });
}
