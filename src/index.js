import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchCatByBreed, fetchBreeds } from './cat-api';

document.addEventListener('DOMContentLoaded', function () {
  const selectBreed = document.querySelector('.breed-select');
  const divMarkup = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  selectBreed.style.display = 'none';
  loader.style.display = 'block';
  divMarkup.style.display = 'none';
  error.style.display = 'none';
  let mapData;
  function initializationSelect() {
    const slimSelect = new SlimSelect({
      data: mapData,
      select: selectBreed,
      events: {
        afterChange: (info) => {
          const selectId = info[0].value;
          selectBreed.style.display = 'none';
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
              console.error('Fetch Cat Error:', err);
              Notiflix.Notify.failure('Oops! Something went wrong with fetching cat data! Try reloading the page!');
              loader.style.display = 'none';
              error.style.display = 'block';
            });
        },
      },
    
    });
    
  }

  fetchBreeds()
    .then((data) => {
       mapData = data.map((el) => ({ text: el.name, value: el.id }));
     
      
      selectBreed.style.display = 'block';
      loader.style.display = 'none';
      divMarkup.style.display = 'block';
      initializationSelect();
    })
    .catch((err) => {
      console.error('Fetch Breeds Error:', err);
      Notiflix.Notify.failure('Oops! Something went wrong with fetching breeds! Try reloading the page!');
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});
