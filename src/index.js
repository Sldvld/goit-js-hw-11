import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const sentinel = document.querySelector('.wrapper');
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && searchInfo !== '') {
        loadMore();
      }
    });
  },
  {
    rootMargin: '200px',
  }
);
observer.observe(sentinel);

searchForm.addEventListener('submit', onSubmit);

let currentPage = 1;
let totalHits = 0;
let searchInfo = '';

let lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

async function onSubmit(evt) {
  evt.preventDefault();
  searchInfo = evt.currentTarget.searchQuery.value;
  currentPage = 1;

  if (searchInfo === '') {
    return;
  }

  try {
    const response = await fetchImages(searchInfo, currentPage);
    totalHits = response.hits.length;

    if (response.totalHits > 0) {
      gallery.innerHTML = ``;
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      renderCard(response.hits);
      lightbox.refresh();
    }
    if (response.totalHits === 0) {
      gallery.innerHTML = ``;
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
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

async function loadMore() {
  currentPage += 1;
  const response = await fetchImages(searchInfo, currentPage);
  renderCard(response.hits);
  lightbox.refresh();
  totalHits += response.hits.length;
}
