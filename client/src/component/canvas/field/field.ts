export function field(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D, container: HTMLElement): void {
  c.width = container.clientWidth;
  c.height = container.clientHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, c.width, c.height);
}