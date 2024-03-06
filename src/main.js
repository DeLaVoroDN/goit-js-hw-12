'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { buildUrl } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import Error from './img/octagon.svg';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.list'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.btn-more'),
};

let currentPage = 1;
let searchQuery = null;

hideLoader();
hideBtn();

async function checkForSending(event) {
  event.preventDefault();

  searchQuery = refs.form.elements.query.value.trim();

  currentPage = 1;
  refs.gallery.innerHTML = '';

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      messageColor: 'black',
      backgroundColor: '#ffac26',
      position: 'topRight',
      pauseOnHover: false,
      progressBarColor: 'black',
      timeout: 3000,
    });

    return;
  }

  showLoader();

  buildUrl(searchQuery, currentPage)
    .then(data => {
      const images = data.hits;

      refs.gallery.innerHTML = renderGallery(images);

      if (images.length < 15) {
        hideBtn();
      } else {
        showBtn();
      }

      lightbox.refresh();
    })
    .catch(error =>
      iziToast.error({
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: Error,
        pauseOnHover: false,
        progressBarColor: '#b51b1b',
        timeout: 3000,
      })
    )
    .finally(() => {
      hideLoader();

      refs.form.reset();
    });
}

refs.form.addEventListener('submit', checkForSending);
refs.loadMoreBtn.addEventListener('click', async () => {
  try {
    showLoader();

    const res = await buildUrl(searchQuery, ++currentPage);

    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(res.hits));

    lightbox.refresh();

    if (res.hits.length < 15) {
      hideBtn();

      iziToast.info({
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#ffffff',
        backgroundColor: '#1f79ff',
        position: 'topRight',
        pauseOnHover: false,
        progressBarColor: 'black',
        timeout: 3000,
      });
    }

    const itemHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollTo({
      top: itemHeight * 2 + window.pageYOffset,
      behavior: 'smooth',
    });
  } catch {
    iziToast.error({
      theme: 'dark',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      iconUrl: Error,
      pauseOnHover: false,
      progressBarColor: '#b51b1b',
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});

function showBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}
