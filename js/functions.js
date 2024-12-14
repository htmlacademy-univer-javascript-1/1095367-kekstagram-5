// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить, и максимальную длину
// и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы. Примеры использования функции:

function isLineLengthLessOrEqual(line, maxLength) {
  return line.length <= maxLength;
}

// console.log(isLineLengthLessOrEqual('проверяемая строка', 20)); // true
// console.log(isLineLengthLessOrEqual('проверяемая строка', 18)); // true
// console.log(isLineLengthLessOrEqual('проверяемая строка', 10)); // false


// Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.

function isPalindrome(line) {
  const lowercase = line.toLowerCase().replaceAll(' ', '');

  for (let i = 0; i < lowercase.length / 2 - 1; i++) {
    if (lowercase[i] !== lowercase[i + lowercase.length - 1 - i * 2]) {
      return false;
    }
  }

  return true;
}

// console.log('топот', isPalindrome('топот')); // true
// console.log('ДовОд', isPalindrome('ДовОд')); // true
// console.log('Кекс', isPalindrome('Кекс')); // false
// console.log('12321', isPalindrome('12321')); // true
// console.log('кабак', isPalindrome('КаАбак')); // true
// console.log('Лёша на полке клопа нашёл ', isPalindrome('Лёша на полке клопа нашёл ')); // true


// функция, которая принимает время начала и конца рабочего дня,
// а также время старта и продолжительность встречи в минутах и возвращает true,
// если встреча не выходит за рамки рабочего дня, и false, если выходит.

// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут
// использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному:
// 08:05, 8:5, 08:5 или 8:05.

// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются
// в одни календарные сутки.

const convertH2M = function (timeInHour){
  const timeParts = timeInHour.split(':');
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

const isMeetingIncludedInWorkingDay = function (startDay, endDay, startMeeting, meetingTime) {
  const endMeeting = convertH2M(startMeeting) + meetingTime;
  return (convertH2M(startDay) <= convertH2M(startMeeting) && endMeeting <= convertH2M(endDay));
};

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

console.log(isMeetingIncludedInWorkingDay('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingIncludedInWorkingDay('8:0', '10:0', '8:0', 120)); // true
console.log(isMeetingIncludedInWorkingDay('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingIncludedInWorkingDay('14:00', '17:30', '08:0', 90)); // false
console.log(isMeetingIncludedInWorkingDay('8:00', '17:30', '08:00', 900)); // false
