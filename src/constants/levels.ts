import { Enemy } from "../entities/enemy";
import { BOX_SIZE, SIZE } from "./constants";

const LEVEL_1 = [
  new Enemy(BOX_SIZE / 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE / 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE * 2, SIZE / 2 + BOX_SIZE / 2),
];

const LEVEL_2 = [
  new Enemy(BOX_SIZE / 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE / 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE * 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE * 3, SIZE / 2 + BOX_SIZE / 2),
];

const LEVEL_3 = [
  new Enemy(BOX_SIZE / 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE / 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE * 2, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE * 3, SIZE / 2 + BOX_SIZE / 2),
  new Enemy(-BOX_SIZE * 4, SIZE / 2 + BOX_SIZE / 2),
];

export const levelConfig = { levels: 3, 1: LEVEL_1, 2: LEVEL_2, 3: LEVEL_3 };
