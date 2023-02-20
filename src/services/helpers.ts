export const shufle = (array: any) => {
  let currentIndex = array.length,
    randomIndex,
    copyArray = [...array];

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [copyArray[currentIndex], copyArray[randomIndex]] = [copyArray[randomIndex], copyArray[currentIndex]];
  }

  return copyArray;
};
