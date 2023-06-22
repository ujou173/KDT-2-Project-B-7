// character Type
export interface PlayerProps {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  position: {
    x: number,
    y: number
  },
  velocity: {
    x: number,
    y: number
  }
}
