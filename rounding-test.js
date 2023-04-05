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
      return String(Math.ceil(num));
    } else if (roundingMethod === 'floor') {
      return String(Math.floor(num));
    } else {
      // if round to nearest ties to even
      var d = 0; // decimal places
      var m = Math.pow(10, d);
      var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
      var i = Math.floor(n),
        f = n - i;
      var e = 1e-8; // Allow for rounding errors in f
      var r =
        f > 0.5 - e && f < 0.5 + e ? (i % 2 == 0 ? i : i + 1) : Math.round(n);

      return String(d ? r / m : r);
    }
  }

  return num; // if < 7 length do not edit
}

// main
num = '12345665';
console.log('RESULTS---------');
console.log(ApplyRounding('truncate', num));
console.log(ApplyRounding('ceiling', num));
console.log(ApplyRounding('floor', num));
console.log(ApplyRounding('rtnte', num));
