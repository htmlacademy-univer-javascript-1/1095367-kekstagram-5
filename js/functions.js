// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить, и максимальную длину
// и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы. Примеры использования функции:

function isLineLengthLessOrEqual(line, maxLength) {
  return line.length <= maxLength;
}

console.log(isLineLengthLessOrEqual('проверяемая строка', 20)); // true
console.log(isLineLengthLessOrEqual('проверяемая строка', 18)); // true
console.log(isLineLengthLessOrEqual('проверяемая строка', 10)); // false


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

console.log('топот', isPalindrome('топот')); // true
console.log('ДовОд', isPalindrome('ДовОд')); // true
console.log('Кекс', isPalindrome('Кекс')); // false
console.log('12321', isPalindrome('12321')); // true
console.log('кабак', isPalindrome('КаАбак')); // true
console.log('Лёша на полке клопа нашёл ', isPalindrome('Лёша на полке клопа нашёл ')); // true
