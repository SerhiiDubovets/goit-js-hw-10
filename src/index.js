import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const debounces = debounce(selectionCountries, DEBOUNCE_DELAY);

refs.inputEl.addEventListener('input', debounces);

function selectionCountries(e) {
  e.preventDefault();
  const name = refs.inputEl.value.toLowerCase().trim();
  if (!name) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    return;
  } else if (name) {
    return fetchCountries(name)
      .then(countries)
      .catch(error => {
        console.log(error);
      });
  }
}

function countries(name) {
  if (name.length === 1) {
    refs.countryList.innerHTML = `<ul style="display: none">sdasd</ul>`;
    creationCountryInfo(name);
    return;
  } else if (name.length > 10) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    console.log('error');
    return;
  } else if (name.status === 404) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    Notiflix.Notify.failure('Oops, there is no country with that name');
  } else {
    refs.countryInfo.innerHTML = '';
    creationCountriesList(name);
  }
}

function creationCountryInfo(names) {
  return (refs.countryInfo.innerHTML = names.map(
    name =>
      `<div class="country-info__block"><img src="${
        name.flags.svg
      }"  width=30 height=20/><h1 class="country-info__name">${name.name.official}</h1></div>
        <p>Capital:<span>${name.capital}</span></p><p>Population:<span>${
        name.population
      }</span></p><p>Languages:<span>${Object.values(name.languages)}</span></p>`,
  ));
}
creationCountryInfo;
function creationCountriesList(names) {
  return (refs.countryList.innerHTML = names
    .map(
      name =>
        `<li class="country-list__item"><img src="${name.flags.svg}"  width=30 height=20/><p>${name.name.official}</p></li>`,
    )
    .join(''));
}
