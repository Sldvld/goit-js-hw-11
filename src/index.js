import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from './fetchImages';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSubmit);
// loadMoreBtn.addEventListener('click', nextPage);

let currentPage = 1;
let totalHits = 0;
let searchInfo = '';

async function onSubmit(evt) {
  evt.preventDefault();
  searchInfo = evt.currentTarget.elements.searchQuery.value;
  currentPage = 1;

  if (searchInfo === '') {
    return;
  }

  const response = await fetchImages(searchInfo, currentPage);
  totalHits = response.hits.length;
  
  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHtml = '';
      renderCard(response.hits);
    }
    if (response.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHtml = '';
    }
  } catch (error) {
    console.log(error);
  }
}

function renderCard(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a class="gallery-item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join();
  gallery.insertAdjacentHTML('beforeend', markup);
}
