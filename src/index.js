import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;


const input = document.querySelector("#search-box")
console.log(input)

input.addEventListener("input", evt => {
  console.log(evt.currentTarget.value)
})