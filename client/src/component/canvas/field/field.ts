export function field(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  c.width = 3840;
  c.height = 2160;
  ctx.fillRect(0, 0, c.width, c.height);
}