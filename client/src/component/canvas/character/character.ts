import { PlayerProps } from './charType'
import { pixel } from '../canvas-common'

// character
export class Player {
  readonly c: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly id: string
  readonly color: string
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

  nickname(): void {
    this.ctx.font = `${pixel * 0.8}px Arial`;
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    const anchorPoint = pixel / 2
    this.ctx.fillText(this.id, this.position.x + anchorPoint, this.position.y - (anchorPoint));
  }

  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
    this.nickname();
  }
}