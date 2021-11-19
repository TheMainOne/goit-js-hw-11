import './sass/main.scss';
import { fetchImages, resetPage } from './fetchImages';
import { showButton, hideButton } from './showAndHideButton';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};
let input = '';

hideButton(refs.loadMoreButton);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  input = event.currentTarget.searchQuery.value;

  resetPage();
  fetchImages(input).then(images => {
    const imagesArray = images.data.hits;
    const totalImages = images.data.totalHits;

    if (imagesArray.length === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      clearGallery();
      renderGallery(imagesArray);
      Notify.success(`Hooray! We found ${totalImages} images.`);
      showButton(refs.loadMoreButton);
    }
  });
}

function onLoadMore() {
  fetchImages(input).then(images => {
    const imagesArray = images.data.hits;

    renderGallery(imagesArray);
  }).catch (() => {
    Notify.failure('We are sorry, but you have reached the end of search results.');
    hideButton(refs.loadMoreButton);
  });
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
  refs.container.insertAdjacentHTML('beforeend', markup)
  // refs.container = new SimpleLightbox('.gallery a', { captionDelay: 250, showCounter: false });
}

function clearGallery() {
    refs.container.innerHTML = '';
}