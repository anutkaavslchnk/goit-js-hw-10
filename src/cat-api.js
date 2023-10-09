import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] = 'live_HbIFh9cbhKGfdMHg6tnGBwIXK2jpKe6m7EWJh4gG7bkVCjxfoLmvZbLjHkFABpGf';
const breedSelect = new SlimSelect({
  select: document.querySelector('.breed-select'),
});


export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const catData = {
        name: response.data[0].breeds[0].name,
        description: response.data[0].breeds[0].description,
        temperament: response.data[0].breeds[0].temperament,
        url: response.data[0].url,
      };

      return catData;
    })
    .catch((error) => {
      Notiflix.Notify.failure('Failed to fetch cat information');
      throw new Error('Failed to fetch cat information');
    });
}

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => {
      breedSelect.setData(response.data.map((el) => ({ text: el.name, value: el.id })));
      return response.data;
    })
    .catch((error) => {
      Notiflix.Notify.failure('Failed to fetch cat breeds');
      throw new Error('Failed to fetch cat breeds');
    });
}
