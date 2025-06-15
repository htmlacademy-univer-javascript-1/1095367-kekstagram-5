// main.js
import { getData } from './api.js';
import { openBigPicture } from './fullscreen.js';
import { resetEditor } from './editor.js';
import { showAlert } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RENDER_DELAY = 500;

const picturesContainer = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
let photos = [];

const renderThumbnails = (data) => {
  // Удаляем все текущие миниатюры
  const currentPictures = picturesContainer.querySelectorAll('.picture');
  currentPictures.forEach((picture) => picture.remove());

  // Создаем новые миниатюры
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  data.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const getRandomPhotos = () => {
  const shuffled = [...photos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = () => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filter) => {
  let filteredPhotos = [];

  switch (filter) {
    case 'filter-random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = [...photos];
  }

  renderThumbnails(filteredPhotos);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const debouncedApplyFilter = debounce(applyFilter, RENDER_DELAY);

const setFilters = () => {
  const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      // Удаляем активный класс у всех кнопок
      filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
      // Добавляем активный класс текущей кнопке
      evt.target.classList.add('img-filters__button--active');

      debouncedApplyFilter(evt.target.id);
    });
  });
};

const init = async () => {
  try {
    photos = await getData();
    renderThumbnails(photos);

    // Показываем блок фильтров после загрузки данных
    filtersContainer.classList.remove('img-filters--inactive');
    setFilters();
  } catch (err) {
    showAlert(err.message);
  }
};

init();

// Handle upload form open/close
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');

uploadFile.addEventListener('change', () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetEditor();
});

uploadCancel.addEventListener('click', () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
});
