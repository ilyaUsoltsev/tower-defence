import { updateMoneyLeftBy } from "./../helpers/update-ui";
import { MONEY, TOWER_COST } from "./../constants/constants";
import { soundExplosion, soundHit } from "./../constants/sounds";
import { getEnemySpeed } from "./../helpers/get-enemy-speed";
import {
  isEnemyInBeginning,
  isEnemyReachedCell,
} from "./../helpers/is-enemy-reached-cell";
import { ENEMY_RADIUS, BOX_SIZE, END_CELL } from "../constants/constants";
export class Enemy {
  private color = "purple";
  private radius = ENEMY_RADIUS;
  private healthPoints = 10;

  public speedX = 0;
  public speedY = 0;
  public reachedTheEnd = false;

  constructor(public x: number, public y: number) {}

  public hitByProjectile() {
    this.healthPoints -= 1;
    if (this.healthPoints === 0) {
      updateMoneyLeftBy(TOWER_COST);
      soundExplosion();
    } else {
      soundHit();
    }
  }

  get isDead() {
    return this.healthPoints <= 0;
  }

  setEnemySpeed(pathForEnemies) {
    if (isEnemyReachedCell(this) || isEnemyInBeginning(this)) {
      const currentRow = Math.floor(this.y / BOX_SIZE);
      const currentCol = Math.floor(this.x / BOX_SIZE);
      const currentCell = `${currentRow}_${currentCol}`;
      const pathToString = pathForEnemies.map(
        (item) => `${item[0]}_${item[1]}`
      );
      let currentIndex = pathToString.indexOf(currentCell);
      const nextCell = pathToString[currentIndex + 1];
      const { x, y } = getEnemySpeed(currentCell, nextCell);

      if (currentCell === END_CELL) {
        this.reachedTheEnd = true;
        return;
      }

      this.speedX = x;
      this.speedY = y;
    }
  }

  draw(ctx) {
    if (this.reachedTheEnd) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
