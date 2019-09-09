const moveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const move = (array, from, to) => {
  const newArray = array.slice();
  moveMutate(newArray, from, to);
  return newArray;
};

export { move };
