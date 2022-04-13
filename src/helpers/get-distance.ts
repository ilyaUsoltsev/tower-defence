import { ICoords } from "./../models/models";

export const getDistance = (a: ICoords, b: ICoords) => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};
