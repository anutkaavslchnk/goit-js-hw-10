import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchCatByBreed, fetchBreeds } from './cat-api';

document.addEventListener('DOMContentLoaded', function () {
  const divMarkup = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');

  loader.style.display = 'block';
  divMarkup.style.display = 'none';
  error.style.display = 'none';

       const slimSelect = new SlimSelect({
        data: [],
        select: '.select-breed',
        events: {
          afterChange: (info) => {
            const selectId = info.value;
            
            loader.style.display = 'block';
            divMarkup.style.display = 'none';
            error.style.display = 'none';

            fetchCatByBreed(selectId)
              .then(function (catData) {
                console.log('Cat data:', catData);
                divMarkup.innerHTML = `<img src="${catData.url}" alt="${catData.name}" class="breed-icon" width="500" height="auto" />
                  <h2 class="name-breed">${catData.name}</h2>
                  <p class="desc-breed">${catData.description}</p>
                  <p class="personality-breed"><span style="font-weight:700">Temperament: </span>${catData.temperament}</p>
                `;

                loader.style.display = 'none';
                divMarkup.style.display = 'block';
              })
              .catch((err) => {
                Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
                loader.style.display = 'none';
                error.style.display = 'block';
              });
          },
        },
      });

      fetchBreeds(slimSelect)
      .then((data) => {
      loader.style.display = 'none';
      divMarkup.style.display = 'block';
    })
    .catch((err) => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      loader.style.display = 'none';
      error.style.display = 'block';
    });
  
});

