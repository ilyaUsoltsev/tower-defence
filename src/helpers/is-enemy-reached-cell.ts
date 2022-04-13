import { Enemy } from "./../entities/enemy";
import { ENEMY_RADIUS, BOX_SIZE } from "../constants/constants";

export const isEnemyReachedCell = (enemy: Enemy) => {
  const INCREMENT_TO_CENTER_ENEMY = ENEMY_RADIUS + 6;
  return (
    Math.floor((enemy.y + INCREMENT_TO_CENTER_ENEMY) / BOX_SIZE) ===
      Math.floor(enemy.y / BOX_SIZE) &&
    Math.floor((enemy.y - INCREMENT_TO_CENTER_ENEMY) / BOX_SIZE) ===
      Math.floor(enemy.y / BOX_SIZE) &&
    Math.floor((enemy.x + INCREMENT_TO_CENTER_ENEMY) / BOX_SIZE) ===
      Math.floor(enemy.x / BOX_SIZE) &&
    Math.floor((enemy.x - INCREMENT_TO_CENTER_ENEMY) / BOX_SIZE) ===
      Math.floor(enemy.x / BOX_SIZE)
  );
};

export const isEnemyInBeginning = (enemy: Enemy) =>
  Math.floor(enemy.x / BOX_SIZE) <= 0;
