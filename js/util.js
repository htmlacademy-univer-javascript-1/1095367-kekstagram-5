// util.js
const getRandomNum = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const showMessage = (templateId, className) => {
  const template = document.querySelector(`#${templateId}`).content;
  const message = template.querySelector(`.${className}`).cloneNode(true);
  document.body.appendChild(message);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (!message.contains(evt.target)) {
      removeMessage();
    }
  }

  message.querySelector(`.${className}__button`).addEventListener('click', removeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccessMessage = () => showMessage('success', 'success');
const showErrorMessage = () => showMessage('error', 'error');

export {
  getRandomNum,
  showAlert,
  showSuccessMessage,
  showErrorMessage
};
