import { BOX_SIZE } from "../constants/constants";

export const drawFieldBox = (ctx) => {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.moveTo(BOX_SIZE, BOX_SIZE);
  ctx.lineTo(BOX_SIZE, BOX_SIZE * 11);
  ctx.moveTo(BOX_SIZE, BOX_SIZE * 12);
  ctx.lineTo(BOX_SIZE, BOX_SIZE * 21);
  ctx.lineTo(BOX_SIZE * 21, BOX_SIZE * 21);
  ctx.lineTo(BOX_SIZE * 21, BOX_SIZE * 12);
  ctx.moveTo(BOX_SIZE * 21, BOX_SIZE * 11);
  ctx.lineTo(BOX_SIZE * 21, BOX_SIZE);
  ctx.lineTo(BOX_SIZE, BOX_SIZE);
  ctx.stroke();
};
