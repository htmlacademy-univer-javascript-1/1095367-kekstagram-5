// api.js
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body,
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch {
    throw new Error(errorText);
  }
};

const getData = async () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = async (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
