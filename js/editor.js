// editor.js
import noUiSlider from './nouislider-wrapper.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');

let currentEffect = 'none';
let currentScale = 100;

// Scale control
const updateScale = (value) => {
  currentScale = value;
  scaleControl.value = `${value}%`;
  uploadPreview.style.transform = `scale(${value / 100})`;
};

scaleSmaller.addEventListener('click', () => {
  if (currentScale > 25) {
    updateScale(currentScale - 25);
  }
});

scaleBigger.addEventListener('click', () => {
  if (currentScale < 100) {
    updateScale(currentScale + 25);
  }
});

// Effect slider
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

const updateEffect = (effect) => {
  currentEffect = effect;

  // Reset slider visibility and image style
  effectLevelSlider.parentElement.classList.toggle('hidden', effect === 'none');
  uploadPreview.className = '';
  uploadPreview.style.filter = 'none';

  if (effect === 'none') {
    effectLevelSlider.noUiSlider.set(100);
    return;
  }

  // Set slider range based on effect
  const min = 0;
  let max = 100;
  let step = 1;
  let start = 100;

  switch (effect) {
    case 'chrome':
      uploadPreview.classList.add('effects__preview--chrome');
      break;
    case 'sepia':
      uploadPreview.classList.add('effects__preview--sepia');
      break;
    case 'marvin':
      max = 100;
      step = 1;
      start = 100;
      break;
    case 'phobos':
      max = 3;
      step = 0.1;
      start = 3;
      break;
    case 'heat':
      max = 3;
      step = 0.1;
      start = 3;
      break;
  }

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start,
  });
};

effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;

  switch (currentEffect) {
    case 'chrome':
      uploadPreview.style.filter = `grayscale(${value / 100})`;
      break;
    case 'sepia':
      uploadPreview.style.filter = `sepia(${value / 100})`;
      break;
    case 'marvin':
      uploadPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      uploadPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      uploadPreview.style.filter = `brightness(${value})`;
      break;
  }
});

// Effect radio buttons
effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    updateEffect(evt.target.value);
  }
});

// Reset form
const resetEditor = () => {
  updateScale(100);
  updateEffect('none');
  effectsList.querySelector('#effect-none').checked = true;
};

export { resetEditor };
