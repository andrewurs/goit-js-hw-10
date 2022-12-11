import { getRefs } from './getRefs';

const refs = getRefs();

export function clearMarkup() {
  refs.listEl.innerHTML = '';
  refs.infoEl.innerHTML = '';
}

export function makeListMarkup(countriesArr) {
  return countriesArr
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="list-item" data-name="${official}">
      <img class = "list-item__image" src="${svg}" alt="flag of ${official} width="15px"/>
      <p class = "list-item__name">${official}</p></li>`;
    })
    .join('');
}

export function makeInfoMarkup(countriesArr) {
  return countriesArr
    .map(({ name: { official }, flags: { svg }, capital, population, languages }) => {
      const langs = Object.values(languages).join(', ');
      return `<div class="country-info__header">
      <img class="country-info__image" src="${svg}" alt="flag of ${official}" width="30px"/>
      <h2 class="country-info__name">${official}</h2></div>
      <p class="country-info__title"><span>Capital: </span>${capital}</p>
      <p class="country-info__title"><span>Population: </span>${population}</p>
      <p class="country-info__title"><span>Languages: </span>${langs}</p>`;
    })
    .join('');
}