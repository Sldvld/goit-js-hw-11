import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.next-page');

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', nextPage);

let currentPage = 1;
let totalHits = 0;
let searchInfo = '';

let lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

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
      gallery.innerHTML = ``;
      renderCard(response.hits);
      lightbox.refresh();
    }
    if (response.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = ``;
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
        return `
        <div class="photo-card">
        <a href="${largeImageURL}">
        <img class="gallery__image" 
        src="${webformatURL}" 
        alt="${tags}" 
        loading="lazy"/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>
`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function nextPage() {}
