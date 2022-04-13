import { BOX_SIZE, ENEMY_RADIUS } from "../constants/constants";

export class FutureTower {
  public color = "red";
  constructor(public x: number, public y: number) {}
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, BOX_SIZE * 2, BOX_SIZE * 2);
  }
}
