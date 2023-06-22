export function field(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  c.width = 1920;
  c.height = 1080;
  ctx.fillRect(0, 0, c.width, c.height);
}