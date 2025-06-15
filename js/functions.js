// functions.js - Using only named exports

function isLineLengthLessOrEqual(line, maxLength) {
  return line.length <= maxLength;
}

function isPalindrome(line) {
  const lowercase = line.toLowerCase().replaceAll(' ', '');

  for (let i = 0; i < lowercase.length / 2; i++) {
    if (lowercase[i] !== lowercase[lowercase.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function convertH2M(timeInHour) {
  const timeParts = timeInHour.split(':');
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

function isMeetingIncludedInWorkingDay(startDay, endDay, startMeeting, meetingTime) {
  const endMeeting = convertH2M(startMeeting) + meetingTime;
  return (
    convertH2M(startDay) <= convertH2M(startMeeting) &&
    endMeeting <= convertH2M(endDay)
  );
}

// Single export point
export {
  isLineLengthLessOrEqual,
  isPalindrome,
  isMeetingIncludedInWorkingDay
};
