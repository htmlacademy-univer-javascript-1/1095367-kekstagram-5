// main.js
import { createPhotos } from './data.js';
import { openBigPicture } from './fullscreen.js';

const photos = createPhotos();
const picturesContainer = document.querySelector('.pictures');

// Render thumbnails
const renderThumbnails = () => {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  photos.forEach((photo) => {
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

renderThumbnails();
