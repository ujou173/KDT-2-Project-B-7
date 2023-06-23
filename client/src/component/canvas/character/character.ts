import { PlayerProps } from './charType'
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
  isMoving: boolean
  constructor ( { canvas, ctx, position, velocity }:PlayerProps ) {
    this.c = canvas
    this.ctx = ctx
    this.position = position
    this.velocity = velocity
    this.isMoving = false
  }

  draw(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
  }

  update(): void {
    this.draw();
  }
}