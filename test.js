function ApplyRounding(roundingMethod, num) {
  // num is a string
  if (roundingMethod === 'truncate') {
    Math.round(num, 7);
  } else if (roundingMethod === 'ceiling') {
  } else if (roundingMethod === 'floor') {
  } else {
    // if round to nearest ties to even
  }
}

// main
