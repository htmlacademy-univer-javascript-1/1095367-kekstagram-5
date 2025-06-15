// form.js
import { isLineLengthLessOrEqual } from './functions.js';
import { sendData } from './api.js';
import { showAlert, showSuccessMessage, showErrorMessage } from './util.js';

// Safe element query and verification
const getElement = (parent, selector) => {
  const el = parent ? parent.querySelector(selector) : null;
  if (!el) {
    console.warn(`Element not found: ${selector}`);
  }
  return el;
};

const uploadForm = document.querySelector('.img-upload__form');
if (!uploadForm) {
  throw new Error('Form element not found!');
}

const elements = {
  uploadInput: getElement(uploadForm, '.img-upload__input'),
  uploadOverlay: getElement(uploadForm, '.img-upload__overlay'),
  uploadCancel: getElement(uploadForm, '.img-upload__cancel'),
  hashtagInput: getElement(uploadForm, '.text__hashtags'),
  descriptionInput: getElement(uploadForm, '.text__description'),
  submitButton: getElement(uploadForm, '.img-upload__submit'),
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  if (hashtags.length > 5) {
    return false;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const lowerCaseTags = hashtags.map((t) => t.toLowerCase());

  return hashtags.every((tag) =>
    hashtagRegex.test(tag) &&
    lowerCaseTags.indexOf(tag.toLowerCase()) === lowerCaseTags.lastIndexOf(tag.toLowerCase())
  );
};

if (elements.hashtagInput) {
  pristine.addValidator(
    elements.hashtagInput,
    validateHashtags,
    'Хэш-теги должны начинаться с #, содержать только буквы и цифры (максимум 20 символов), разделяться пробелами (максимум 5 тегов) и не повторяться'
  );
}

if (elements.descriptionInput) {
  pristine.addValidator(
    elements.descriptionInput,
    (value) => isLineLengthLessOrEqual(value, 140),
    'Комментарий не может быть длиннее 140 символов'
  );
}

const blockSubmitButton = () => {
  elements.submitButton.disabled = true;
  elements.submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  elements.submitButton.disabled = false;
  elements.submitButton.textContent = 'Опубликовать';
};

const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    try {
      blockSubmitButton();
      await sendData(new FormData(evt.target));
      onSuccess();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  });
};

const addEvent = (el, type, handler) => el?.addEventListener(type, handler);

[elements.hashtagInput, elements.descriptionInput].forEach((input) => {
  addEvent(input, 'keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
});

addEvent(elements.uploadInput, 'change', () => {
  elements.uploadOverlay?.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const closeUploadForm = () => {
  uploadForm.reset();
  pristine.reset();
  elements.uploadOverlay?.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetEditor();
};

addEvent(elements.uploadCancel, 'click', closeUploadForm);
addEvent(document, 'keydown', (evt) => {
  if (evt.key === 'Escape' && !elements.uploadOverlay?.classList.contains('hidden')) {
    closeUploadForm();
  }
});

setFormSubmit(closeUploadForm);

export { closeUploadForm };
