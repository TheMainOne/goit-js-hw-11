import './sass/main.scss';
import { fetchImages } from './fetchImages';
import { showAndHideButton } from './showButton'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

showAndHideButton(refs.loadMoreButton);

refs.form.addEventListener('submit', onFormSumbit);

function onFormSumbit(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.searchQuery.value;
 
    fetchImages(inputValue).then(images => {
        const imagesArray = images.data.hits;

        renderGallery(imagesArray);
        showAndHideButton(refs.loadMoreButton);
  });
}

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
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
        </div>`;
    })
    .join('');
  refs.container.innerHTML = markup;
}
