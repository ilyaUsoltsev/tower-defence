import { BALL_SPEED } from "../constants/constants";

export const getEnemySpeed = (currentCell, nextCell) => {
  if (!nextCell) return { y: 0, x: 0 };
  const [ccRow, ccCol] = currentCell.split("_");
  const [ncRow, ncCol] = nextCell.split("_");
  if (+ccRow > +ncRow) {
    return { y: -BALL_SPEED, x: 0 };
  }
  if (+ccRow < +ncRow) {
    return { y: BALL_SPEED, x: 0 };
  }
  if (+ccCol > +ncCol) {
    return { y: 0, x: -BALL_SPEED };
  }
  if (+ccCol < +ncCol) {
    return { y: 0, x: BALL_SPEED };
  }
};
