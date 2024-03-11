const addDateSuffix = date => {
  if (date === 1 || date === 21 || date === 31) {
    return `${date}st`;
  } else if (date === 2 || date === 22) {
    return `${date}nd`;
  } else if (date === 3 || date === 23) {
    return `${date}rd`;
  } else {
    return `${date}th`;
  }
}

module.exports = { addDateSuffix };