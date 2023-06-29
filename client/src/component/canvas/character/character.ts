import { PlayerProps } from './charType'
import { pixel } from '../canvas-common'

// character
export class Player {
  readonly c: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  id: string
  color: string
  position: {
    x: number,
    y: number
  }

  constructor ( { canvas, ctx, id, color, position }:PlayerProps ) {
    this.c = canvas
    this.ctx = ctx
    this.id = id
    this.color = color
    this.position = position
  }

  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
  }
}