import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios');

const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSumbit);

function onFormSumbit(event) {
    event.preventDefault();
    
    const inputValue = event.currentTarget.searchQuery.value;

  console.log(inputValue);
}

// console.log(refs.loadMoreButton);
