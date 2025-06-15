// fullscreen.js
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialFooter = bigPicture.querySelector('.social__footer');

const renderComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    socialComments.appendChild(commentElement);
  });
};

const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  // Convert comment strings back to objects for rendering
  const comments = photo.comments.map((commentStr) => {
    const parts = commentStr.split(', ').reduce((acc, part) => {
      const [key, value] = part.split(': ');
      acc[key] = value;
      return acc;
    }, {});
    return {
      id: parts.id,
      avatar: parts.avatar,
      name: parts.name,
      message: parts.message
    };
  });

  renderComments(comments);

  // Update comments count
  const commentsCount = bigPicture.querySelector('.comments-count');
  commentsCount.textContent = comments.length;

  // Hide comment count and loader as per requirements
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  socialFooter.classList.add('hidden');

  // Show the big picture and add modal class to body
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeBigPicture();
  }
});

export { openBigPicture };
