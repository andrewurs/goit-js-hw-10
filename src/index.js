import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './js/getRefs';
import { clearMarkup, makeListMarkup, makeInfoMarkup } from './js/renderFunctions';
import { fetchCountries } from './js/fetchCountries';
import { hideLoader, showLoader } from './js/loaderFunctions';

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  clearMarkup();
  showLoader();
  const trimmedValue = e.target.value.trim();
  console.log(trimmedValue);

  if (!trimmedValue) {
    Notify.warning('Please, specify country');
    hideLoader();
  } else {
    fetchCountries(trimmedValue).then(renderMarkup).catch(handleError);
  }
}

function renderMarkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please, enter a more specific name.');
    hideLoader();
  } else if (countries.length > 1) {
    refs.listEl.innerHTML = makeListMarkup(countries);
    hideLoader();
    renderCountry(countries);
  } else {
    refs.listEl.innerHTML = makeInfoMarkup(countries);
    hideLoader();
  }
}

function handleError() {
  Notify.failure('Oops, there is no country with that name');
  hideLoader();
}

function renderCountry(arr) {
  const countriesItems = document.querySelectorAll('.list-item');
  countriesItems.forEach(country => country.addEventListener('click', onClick));
  hideLoader();
  Notify.info('Choose a country from the list or keep printing');

  function onClick({ currentTarget }) {
    showLoader();
    const filteredCountry = arr.filter(
      country => currentTarget.dataset.name === country.name.official
    );
    refs.listEl.innerHTML = makeInfoMarkup(filteredCountry);
    refs.inputEl.value = '';
    hideLoader();
    countriesItems.forEach(country => country.removeEventListener('click', onClick));
  }
}
