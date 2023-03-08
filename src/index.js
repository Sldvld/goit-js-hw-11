import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetchImages';

const searchForm = document.querySelector('.search-form');
console.log(searchForm);
searchForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const searcInfo = evt.currentTarget.elements.searchQuery.value.trim();
}
