import { refs } from '../main';

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="item">
      <a href="${largeImageURL}" class="gallery">
      <img class='item-img' src="${webformatURL}" alt="${tags}" />
      <div class="item-info">
      <div class="item-info__text">Likes <span>${likes}</span></div>
      <div class="item-info__text">Views <span>${views}</span></div>
      <div class="item-info__text">Comments <span>${comments}</span></div>
      <div class="item-info__text">Downloads <span>${downloads}</span></div>
      </div>
      </a>
      </li>`;
}

function renderImage(array) {
  const markup = array.map(createMarkup).join('');
  refs.imgOut.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup(element) {
  element.innerHTML = ' ';
}

export { createMarkup, clearMarkup, renderImage };
