function getPointIndex(num) {
  for (i = 0; i < num.length; i++) {
    if (num[i] === '.') {
      return i;
    }
  }

  return -1;
}

function normalize(num) {
  num =
    num.slice(0, getPointIndex(num)) +
    num.slice(getPointIndex(num) + 1, num.length);
  return num;
}

function ApplyRounding(roundingMethod, num) {
  // num is a string

  // only perform rounding if length > 7

  if (num.length > 7) {
    trimmedNumber = num.slice(0, 7);
    remainingNumber = num.slice(7);

    num = trimmedNumber + '.' + remainingNumber;
    num = parseFloat(num);

    if (roundingMethod === 'truncate') {
      return trimmedNumber;
    } else if (roundingMethod === 'ceiling') {
      return Math.ceil(num);
    } else if (roundingMethod === 'floor') {
      return Math.floor(num);
    } else {
      // if round to nearest ties to even
    }

    // TODO should i return a string?
  }
}

// main
num = '12345678';
console.log('RESULTS---------');
console.log(ApplyRounding('truncate', num));
console.log(ApplyRounding('ceiling', num));
console.log(ApplyRounding('floor', num));
// console.log(ApplyRounding('rtnte', num));
