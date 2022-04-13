import { DIMENTIONS } from "../constants/constants";

export const outsideField = (col, row) => {
  return col < 1 || row < 1 || col > DIMENTIONS - 1 || row > DIMENTIONS - 1;
};

export const fieldOccupied = (matrix, col, row) => {
  return (
    matrix[col][row] ||
    matrix[col + 1][row] ||
    matrix[col][row + 1] ||
    matrix[col + 1][row + 1]
  );
};

export const setMatrixFieldsForTower = (matrix, col, row, value: number) => {
  matrix[col][row] = value;
  matrix[col + 1][row + 1] = value;
  matrix[col][row + 1] = value;
  matrix[col + 1][row] = value;
};
