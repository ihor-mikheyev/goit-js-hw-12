import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  currentPage,
  perPage,
  resetPage,
  searchImages,
} from './js/pixabay-api';
import { renderImage, clearMarkup } from './js/render-functions';

export const refs = {
  form: document.querySelector('.form-request'),
  imgOut: document.getElementById('img-output'),
  loader: document.querySelector('.loader'),
  moreBtn: document.querySelector('.action__button'),
};

refs.form.addEventListener('submit', handlerSubmit);
refs.moreBtn.addEventListener('click', handlerOnClickMore);

const instance = new SimpleLightbox('.list a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let userRequest = null;

async function handlerSubmit(event) {
  event.preventDefault();
  userRequest = event.target.searchQuery.value.trim();
  if (!userRequest) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  try {
    resetPage();
    const response = await searchImages(userRequest);
    clearMarkup(refs.imgOut);
    renderImage(response.hits);
    scrollDown();
    showLoadMoreBtn();
  } catch (error) {
    console.error(error);
  } finally {
    refs.form.reset();
    refs.loader.style.display = 'none';
    instance.refresh();
  }
}

async function handlerOnClickMore() {
  refs.loader.style.display = 'block';
  try {
    const { hits, totalHits } = await searchImages(userRequest);
    renderImage(hits);

    if (currentPage * perPage >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreBtn();
    }
    scrollDown();
  } catch {
    console.error(error);
  } finally {
    refs.loader.style.display = 'none';
    instance.refresh();
  }
}

function showLoadMoreBtn() {
  refs.moreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  refs.moreBtn.style.display = 'none';
}

function scrollDown() {
  const item = document.querySelector('.list');
  console.log(item);
  if (item) {
    const cardHeight = item.getBoundingClientRect().height;
    console.log(cardHeight);
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
