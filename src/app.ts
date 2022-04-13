import { updateMoneyLeftBy } from "./helpers/update-ui";
import { levelConfig } from "./constants/levels";
import {
  fieldOccupied,
  outsideField,
  setMatrixFieldsForTower,
} from "./helpers/outside-field";
import { drawPath } from "./helpers/draw-path";
import { Tower } from "./entities/tower";
import {
  BOX_SIZE,
  DIMENTIONS,
  LIVES,
  MONEY,
  TIME_TO_NEXT_LEVEL,
  TOWER_COST,
} from "./constants/constants";
import { getInitialMatrix } from "./helpers/get-initial-matrix";
import { getMousePos } from "./helpers/get-mouse-position";
import { getPath } from "./helpers/get-path";
import { drawFieldBox } from "./helpers/draw-field-box";
import { FutureTower } from "./entities/future-tower";

const matrix = getInitialMatrix();
let pathForEnemies = getPath(JSON.parse(JSON.stringify(matrix)));

const ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext(
  "2d"
);

const towers: Tower[] = [];

let enemies = levelConfig[1];

const futureTower = new FutureTower(0, 0);

//game status vars
let isGameOn = false;

function main() {
  for (let i = 0; i < DIMENTIONS; i++) {
    for (let j = 0; j < DIMENTIONS; j++) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "green";
      ctx.strokeRect(i * BOX_SIZE, j * BOX_SIZE, BOX_SIZE, BOX_SIZE);

      ctx.fillStyle = "white";
      ctx.fillRect(i * BOX_SIZE, j * BOX_SIZE, BOX_SIZE, BOX_SIZE);
    }
  }

  drawPath(ctx, pathForEnemies);

  const aliveOnlyEnemies = enemies.filter((e) => !e.isDead);

  if (aliveOnlyEnemies.length === 0) {
    isGameOn = false;
  }

  if (isGameOn) {
    for (const enemy of aliveOnlyEnemies) {
      enemy.setEnemySpeed(pathForEnemies);
      enemy.draw(ctx);
    }
  }

  drawFieldBox(ctx);

  futureTower.draw(ctx);

  towers.forEach((tower) => {
    tower.draw(ctx, aliveOnlyEnemies, isGameOn);
  });

  const enemiesReachedTheEnd = aliveOnlyEnemies.reduce(
    (acc, cur) => acc + Number(cur.reachedTheEnd),
    0
  );

  if (enemiesReachedTheEnd === LIVES) {
    isGameOn = false;
    return;
  }

  window.requestAnimationFrame(main);
}

const moneyDisplayElement = document.getElementById("money-left");
moneyDisplayElement.textContent = MONEY.amount.toString();

document.getElementById("canvas").addEventListener("mousedown", (e) => {
  const { x, y } = getMousePos(e);
  const row = Math.floor(x / BOX_SIZE);
  const col = Math.floor(y / BOX_SIZE);
  if (outsideField(col, row) || fieldOccupied(matrix, col, row)) {
    return;
  }
  if (MONEY.amount < TOWER_COST) {
    alert("not enough money");
    return;
  }
  setMatrixFieldsForTower(matrix, col, row, 1);
  const result = getPath(JSON.parse(JSON.stringify(matrix)));
  if (!result) {
    alert("BLOCKING");
    setMatrixFieldsForTower(matrix, col, row, 0);
    return;
  }
  pathForEnemies = result;
  towers.push(new Tower((row + 1) * BOX_SIZE, (col + 1) * BOX_SIZE));
  updateMoneyLeftBy(-TOWER_COST);
});

document.getElementById("canvas").addEventListener("mousemove", (e) => {
  const { x, y } = getMousePos(e);
  const row = Math.floor(x / BOX_SIZE);
  const col = Math.floor(y / BOX_SIZE);
  if (outsideField(col, row) || fieldOccupied(matrix, col, row)) {
    futureTower.color = "red";
  } else {
    futureTower.color = "green";
  }
  futureTower.x = row * BOX_SIZE;
  futureTower.y = col * BOX_SIZE;
});

document
  .getElementById("start-game-button")
  .addEventListener("mousedown", (e) => {
    isGameOn = true;
    let counter = 1;
    const intervalId = setInterval(() => {
      counter++;
      if (counter > levelConfig.levels) {
        clearInterval(intervalId);
        return;
      }
      enemies = enemies.concat(levelConfig[counter]);
    }, TIME_TO_NEXT_LEVEL);
  });

window.requestAnimationFrame(main);
