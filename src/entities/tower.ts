import { throttle } from "./../helpers/throttle";
import { getDistance } from "./../helpers/get-distance";
import { Projectile } from "./projectile";
import { BOX_SIZE } from "../constants/constants";
import { Enemy } from "./enemy";

export class Tower {
  radius = BOX_SIZE - 10;
  activeRadius = 100;
  enemy: Enemy;
  shooting = true;
  projectile: Projectile;
  private throttledShoot: () => void;
  constructor(private x: number, private y: number) {
    this.throttledShoot = throttle(this.shoot.bind(this));
  }

  shoot() {
    this.projectile = new Projectile(this.x, this.y, this.enemy);
  }

  draw(ctx, enemies: Enemy[], isGameOn: boolean) {
    this.enemy =
      enemies.filter(
        (e) => getDistance({ x: this.x, y: this.y }, e) < 100
      )[0] || new Enemy(0, 0); //TODO decide what to do when all enemies are gone

    const tan = (this.enemy.x - this.x) / (this.enemy.y - this.y);
    const angleAdjustment = this.y > this.enemy.y ? Math.PI : 0;
    ctx.lineWidth = 3;
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + this.radius * Math.sin(Math.atan(tan) + angleAdjustment),
      this.y + this.radius * Math.cos(Math.atan(tan) + angleAdjustment)
    );
    ctx.stroke();

    if (getDistance({ x: this.x, y: this.y }, this.enemy) < 100 && isGameOn) {
      this.throttledShoot();
    }

    if (
      this.projectile &&
      !this.projectile.hitTarget &&
      getDistance({ x: this.x, y: this.y }, this.enemy) < 100
    ) {
      this.projectile.draw(ctx);
    }
  }
}
