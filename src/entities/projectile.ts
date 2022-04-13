import { getDistance } from "./../helpers/get-distance";
import { Enemy } from "./enemy";
export class Projectile {
  private radius = 5;
  private color = "red";
  private speedX: number;
  private speedY: number;
  private speed = 8;
  public hitTarget = false;

  constructor(public x: number, public y: number, public enemy: Enemy) {
    const tan = (this.enemy.x - this.x) / (this.enemy.y - this.y);
    const angleAdjustment = this.y > this.enemy.y ? Math.PI : 0;
    this.speedX = Math.sin(Math.atan(tan) + angleAdjustment) * this.speed;
    this.speedY = Math.cos(Math.atan(tan) + angleAdjustment) * this.speed;
  }

  detectCollision() {
    if (getDistance(this, this.enemy) < 15) {
      this.hitTarget = true;
      this.enemy.hitByProjectile();
    }
  }

  draw(ctx) {
    this.detectCollision();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
