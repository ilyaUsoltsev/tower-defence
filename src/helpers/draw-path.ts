import { BOX_SIZE } from "../constants/constants";

export const drawPath = (ctx, pathForEnemies) => {
  if (Array.isArray(pathForEnemies)) {
    for (const point of pathForEnemies) {
      ctx.fillStyle = "gray";
      ctx.fillRect(
        point[1] * BOX_SIZE,
        point[0] * BOX_SIZE,
        BOX_SIZE,
        BOX_SIZE
      );
    }
  }
};
