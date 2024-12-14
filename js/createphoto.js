import {getRandomNum} from './util.js';

const createMessage = function (index, messages, names) {
  return {
    id: index,
    avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
    message: messages.at(getRandomNum(0, messages.length - 1)),
    name: names.at(getRandomNum(0, names.length - 1)),
  };
};

const createPhoto = function (index, comments) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: 'Герой Хейдера обаятельный, растерянный, неловкий и очень травмированный человек.',
    likes: getRandomNum(15, 200),
    comments: comments.slice(getRandomNum(0, 30)).map((com) => com.toString()),
  };
};

export {createMessage, createPhoto};
