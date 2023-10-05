
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';


import {fetchCatByBreed} from './cat-api';

const refs = {
  selectBreed: document.querySelector('.breed-select'),
  divMarkup: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  option: document.createElement('option'),
};
new SlimSelect({
  select: '.breed-select'
})

function createBreed() {
  fetchBreeds()
    .then((data) => {
      data.forEach((el) => {
        const option = document.createElement('option');

        option.value = el.id;
        option.text = el.name;
        refs.selectBreed.appendChild(option);
      });
    })
    .catch((err) => (Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')))
    .finally(() => (refs.loader.style.display = 'none'));
}


refs.selectBreed.addEventListener('change', newBreed);

function newBreed(event) {
  refs.loader.style.display = 'block';
  refs.error.style.display = 'none';
  fetchCatByBreed(event.currentTarget.value)
    .then((data) => {
      refs.divMarkup.innerHTML = createMarkup(data.breed);
    })
    .catch((err) => {
      refs.error.style.display = 'block';
    })
    .finally(() => {
      refs.loader.style.display = 'none';
    });
}

function createMarkup(arr) {
  return arr
    .map(({ url, alt_names, about: { name, description, temperament } }) => `
      <img src="${url}" alt="${alt_names}" class="breed-icon" />
      <h2 class="name-breed">${name}</h2>
      <p class="desc-breed">${description}</p>
      <p class="personality-breed">${temperament}</p>
    `)
    .join('');
}



