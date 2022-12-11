export function getRefs() {
  return {
    inputEl: document.querySelector('#search-box'),
    listEl: document.querySelector('ul.country-list'),
    infoEl: document.querySelector('div.country-info'),
    loader: document.querySelector('.loader'),
  };
}