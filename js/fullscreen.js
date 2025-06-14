// fullscreen.js
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

// Переменные для управления комментариями
let currentComments = [];
let commentsShown = 0;
const COMMENTS_PER_PORTION = 5;

const createComment = (commentData) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = `
    <img class="social__picture" src="${commentData.avatar}" alt="${commentData.name}" width="35" height="35">
    <p class="social__text">${commentData.message}</p>
  `;

  return comment;
};

// Функция отрисовки порции комментариев
const renderCommentsPortion = () => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);

  commentsToShow.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  socialComments.appendChild(fragment);
  commentsShown += commentsToShow.length;

  // Обновляем счетчик
  socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  // Скрываем кнопку, если показаны все комментарии
  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// Функция загрузки дополнительных комментариев
const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

// Функция сброса состояния комментариев
const resetComments = () => {
  socialComments.innerHTML = '';
  commentsShown = 0;
  commentsLoader.classList.remove('hidden');
};

// Функция закрытия модального окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

// Функция открытия модального окна
const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  // Сбрасываем состояние комментариев
  resetComments();

  // Конвертируем строки комментариев в объекты
  currentComments = photo.comments.map(commentStr => {
    const parts = commentStr.split(', ').reduce((acc, part) => {
      const [key, value] = part.split(': ');
      acc[key] = value;
      return acc;
    }, {});
    return {
      avatar: parts.avatar,
      name: parts.name,
      message: parts.message
    };
  });

  // Показываем блоки с комментариями
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Рендерим первую порцию комментариев
  renderCommentsPortion();

  // Добавляем обработчики
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);

  // Показываем модальное окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Обработчики закрытия (как в предыдущем коде)
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCloseButtonClick() {
  closeBigPicture();
}

export { openBigPicture };
