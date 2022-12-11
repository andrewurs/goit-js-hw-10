import { getRefs } from './getRefs';

const refs = getRefs();

export function hideLoader() {
  refs.loader.classList.add('is-hidden');
  refs.inputEl.disabled = false;
  refs.inputEl.focus();
}

export function showLoader() {
  refs.loader.classList.remove('is-hidden');
  refs.inputEl.blur();
}