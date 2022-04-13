export const getPath = (testArray) => {
  let foundPath: boolean | string[] = false;
  const maxRowCol = testArray.length - 1;
  const middlePoint = Math.floor(testArray.length / 2);
  const arrayWithVisits = JSON.parse(JSON.stringify(testArray));
  const targetPoint = `${middlePoint}_${maxRowCol}`;
  const directions = [
    [0, 1],
    [0, -1], // TODO try first without this option to speed up algorithm
    [1, 0],
    [-1, 0],
  ];

  //next point e.g. 1_3
  const isNextPointValid = (nextPoint: string, pathLength = 0): boolean => {
    const [row, col] = nextPoint.split("_");
    const nextRow = +row;
    const nextCol = +col;

    if (nextCol < 0 || nextRow < 0) {
      return false;
    }

    if (nextCol > maxRowCol || nextRow > maxRowCol) {
      return false;
    }

    if (arrayWithVisits[row][col] === 1) {
      return false;
    }

    const nextPointLength = arrayWithVisits[nextRow][nextCol]
      ? +arrayWithVisits[nextRow][nextCol].split("?")[2]
      : Infinity;

    if (pathLength >= nextPointLength) {
      return false;
    }

    return true;
  };

  //start '1_0';
  const main = (arr, start: string, path = []) => {
    const [startRow, startCol] = start.split("_");
    const startRowNumber = +startRow;
    const startColNumber = +startCol;

    arrayWithVisits[startRowNumber][
      startColNumber
    ] = `x?${startRowNumber}_${startColNumber}?${path.length}`;
    path.push(`x?${startRowNumber}_${startColNumber}?${path.length}`);

    if (targetPoint === `${startRowNumber}_${startColNumber}`) {
      if (Array.isArray(foundPath)) {
        foundPath = foundPath.length > path.length ? [...path] : foundPath;
      } else {
        foundPath = [...path];
      }
    }

    for (const dir of directions) {
      const [horizontal, vertical] = dir;
      const nextStartPoint = `${startRowNumber + horizontal}_${
        startColNumber + vertical
      }`;

      if (isNextPointValid(nextStartPoint, path.length)) {
        main(JSON.parse(JSON.stringify(arr)), nextStartPoint, [...path]);
      }
    }
  };

  main(testArray, `${middlePoint}_0`);

  if (Array.isArray(foundPath)) {
    return foundPath
      .map((el) => el.split("?")[1].split("_"))
      .map((item) => item.map((j) => +j));
  } else {
    return false;
  }
};
