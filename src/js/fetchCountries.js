const API_URL_BY_NAME = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export function fetchCountries(name) {
  const url = `${API_URL_BY_NAME}${name}?${searchParams}`;
  return fetch(url).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}