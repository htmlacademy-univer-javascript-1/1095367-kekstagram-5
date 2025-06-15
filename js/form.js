// form.js
import { isLineLengthLessOrEqual } from './functions.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Validate hashtags
const validateHashtags = (value) => {
  if (value === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  // Check for maximum 5 hashtags
  if (hashtags.length > 5) {
    return false;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (const tag of hashtags) {
    // Check hashtag format
    if (!hashtagRegex.test(tag)) {
      return false;
    }

    // Check for duplicates (case insensitive)
    const lowerCaseTags = hashtags.map((t) => t.toLowerCase());
    if (lowerCaseTags.indexOf(tag.toLowerCase()) !== lowerCaseTags.lastIndexOf(tag.toLowerCase())) {
      return false;
    }
  }

  return true;
};

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Хэш-теги должны начинаться с #, содержать только буквы и цифры (максимум 20 символов), разделяться пробелами (максимум 5 тегов) и не повторяться'
);

// Validate description
pristine.addValidator(
  descriptionInput,
  (value) => isLineLengthLessOrEqual(value, 140),
  'Комментарий не может быть длиннее 140 символов'
);

// Prevent Esc propagation when inputs are focused
[hashtagInput, descriptionInput].forEach((input) => {
  input.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
});

// Show upload overlay when file is selected
uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// Close upload form
const closeUploadForm = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

uploadCancel.addEventListener('click', closeUploadForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    closeUploadForm();
  }
});

// Form submit handler
uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { closeUploadForm };

