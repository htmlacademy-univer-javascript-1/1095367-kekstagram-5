//модуль, который создаёт данные.

import { createMessage, createPhoto } from './createphoto.js';


const names = ['Максим', 'Даша', 'Костя', 'Ярослава', 'Лена', 'Лиза'];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const comments = [];
for (let index = 1; index <= 30; index++) {
  const comment = createMessage(index, messages, names);
  comment.toString = function() {
    return `id: ${this.id}, name: ${this.name}, avatar: ${this.avatar}, message: ${this.message}`;
  };
  comments.push(comment);
}

const createPhotos = function() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    const photo = createPhoto(i, comments);
    photos.push(photo);
  }
  return photos;
};

export {createPhotos};
