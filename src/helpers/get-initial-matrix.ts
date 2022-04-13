import { DIMENTIONS } from "../constants/constants";

export const getInitialMatrix = () => {
  const matrixRow = new Array(DIMENTIONS)
    .fill(0)
    .map((i, index) => (index === 0 || index === DIMENTIONS - 1 ? 1 : 0));
  const matrix = new Array(DIMENTIONS)
    .fill(undefined)
    .map((i, index) =>
      index === 0 || index === DIMENTIONS - 1
        ? [...matrixRow].map(() => 1)
        : [...matrixRow]
    );
  matrix[11][21] = 0;
  matrix[11][0] = 0;
  return matrix;
};
