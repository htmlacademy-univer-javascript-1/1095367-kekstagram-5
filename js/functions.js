// functions.js
export function isLineLengthLessOrEqual(line, maxLength) {
  return line.length <= maxLength;
}

export function isPalindrome(line) {
  const lowercase = line.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < lowercase.length / 2 - 1; i++) {
    if (lowercase[i] !== lowercase[i + lowercase.length - 1 - i * 2]) {
      return false;
    }
  }
  return true;
}

export const convertH2M = function(timeInHour) {
  const timeParts = timeInHour.split(':');
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

export const isMeetingIncludedInWorkingDay = function(startDay, endDay, startMeeting, meetingTime) {
  const endMeeting = convertH2M(startMeeting) + meetingTime;
  return (convertH2M(startDay) <= convertH2M(startMeeting) && endMeeting <= convertH2M(endDay));
};
