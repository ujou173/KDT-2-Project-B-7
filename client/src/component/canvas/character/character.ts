import { PlayerProps } from './characterType'
import { pixel } from '../canvas'

// character
export class Player {
  c: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  position: {
    x: number,
    y: number
  }
  velocity: {
    x: number,
    y: number
  }
  constructor ( { canvas, ctx, position, velocity }:PlayerProps ) {
    this.c = canvas
    this.ctx = ctx
    this.position = position
    this.velocity = velocity
  }

  draw(): void {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
  }

  update(): void {
    this.draw();
  }
}