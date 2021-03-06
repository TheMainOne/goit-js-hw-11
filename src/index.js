import './sass/main.scss';
import { fetchImages, resetPage } from './fetchImages';
import { showButton, hideButton } from './showAndHideButton';
import { clearGallery } from './clearGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.arrow-btn'),
};
let input = '';
let cardHeight = 0;

hideButton(refs.loadMoreButton);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  input = event.currentTarget.searchQuery.value;

  resetPage();
  hideButton(refs.loadMoreButton);
  fetchImages(input).then(images => {
    const imagesArray = images.data.hits;
    const totalImages = images.data.totalHits;

    if (imagesArray.length === 0) {
      clearGallery(refs.container);
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      clearGallery(refs.container);
      renderGallery(imagesArray);
      new SimpleLightbox('.gallery a', { captionDelay: 250, showCounter: false });
      Notify.success(`Hooray! We found ${totalImages} images.`);
      showButton(refs.loadMoreButton);

      cardHeight = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    }
  });
}

function onLoadMore() {
  fetchImages(input)
    .then(images => {
      const imagesArray = images.data.hits;

      if (imagesArray.length === 0) {
        Notify.failure('We are sorry, but you have reached the end of search results.');
        hideButton(refs.loadMoreButton);
        return;
      }

      renderGallery(imagesArray);
      new SimpleLightbox('.gallery a', { captionDelay: 250, showCounter: false });
      window.scrollBy({
        top: cardHeight.height * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.log(error);
      Notify.failure('We are sorry, but you have reached the end of search results.');
      hideButton(refs.loadMoreButton);
    });
}

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
          <a class="gallery__item" href="${image.largeImageURL}">
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
  refs.container.insertAdjacentHTML('beforeend', markup);
}

