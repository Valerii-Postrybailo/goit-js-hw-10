import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box")
console.log(input)

const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');


const deleteMarkup = ref => {
  ref.innerHTML = ''
}

const inputEvtHandler = evt => {
  const textInputValue = evt.target.value.trim();
  console.log(textInputValue)

  if (!textInputValue) {
    deleteMarkup(listEl);
    deleteMarkup(infoEl);
    return;
  }

  fetchCountries(textInputValue)
    .then(data => {
      // console.log(data);
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }
      renderMarkup(data);
    })
    .catch(err => {
      deleteMarkup(listEl);
      deleteMarkup(infoEl);
      Notify.failure('Oops, there is no country with that name');
    });
}

input.addEventListener('input', debounce(inputEvtHandler, DEBOUNCE_DELAY));


const renderMarkup = data => {
  console.log(data)
  if (data.length === 1) {
    deleteMarkup(listEl);
    const markupInfo = creatMurkupWithInfoAboutCountry(data);
    infoEl.innerHTML = markupInfo;
  } else {
    deleteMarkup(infoEl);
    const markupList = createListMarkup(data);
    listEl.innerHTML = markupList;
  }
};

const createListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`,
    )
    .join("");
};

const creatMurkupWithInfoAboutCountry = data => {
  return data.map(
    ({ name, capital,population, flags, languages }) =>
      ` <h1><img src="${flags.svg}" alt="${name.official}" width="40" height="40">${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  )
}