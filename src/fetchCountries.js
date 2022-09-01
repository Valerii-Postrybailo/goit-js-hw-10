const BACK_END_URL =  'https://restcountries.com/v3.1/name'

function fetchCountries(name) {
  return fetch(`${BACK_END_URL}/${name}?official,capital,population,flags.svg,languages`)
      .then(response => {
        if (response.status === 404) {
          return Promise.reject(new Error());
        }

      return response.json();
  });
}

export {fetchCountries}