const getRandomNum = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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
  const comment = {
    id: index,
    avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
    message: messages.at(getRandomNum(0, messages.length - 1)),
    name: names.at(getRandomNum(0, names.length - 1)),
  };
  comment.toString = function() {
    return `id: ${this.id}, name: ${this.name}, avatar: ${this.avatar}, message: ${this.message}`;
  };
  comments.push(comment);
}

const photos = [];
for (let i = 1; i <= 25; i++) {
  const photo = {
    id: i,
    url: `photos/${i}.jpg`,
    description: 'Герой Хейдера обаятельный, растерянный, неловкий и очень травмированный человек.',
    likes: getRandomNum(15, 200),
    comments: comments.slice(getRandomNum(0, 30)).map((com) => com.toString()),
  };
  photos.push(photo);
}

console.log(photos);
