import { PlayerProps } from './charType'
import { pixel } from '../common'

// character
export class Player {
  c: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  position: {
    x: number,
    y: number
  }
  pressedKey: {
    [key: string]: boolean
  }
  constructor ( { canvas, ctx, position }:PlayerProps ) {
    this.c = canvas
    this.ctx = ctx
    this.position = position
    this.pressedKey = {}
  }

  draw(): void {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
  }
  
  update(): void {
    this.draw();
    if (this.position.x + pixel <= this.c.width - pixel) {
      if (this.pressedKey.ArrowRight) {
        this.position.x += pixel;
        this.pressedKey.ArrowRight = false;
      }
    }
    if (this.position.x > 0) {
      if (this.pressedKey.ArrowLeft) {
        this.position.x -= pixel;
        this.pressedKey.ArrowLeft = false;
      }
    }
    if (this.position.y + pixel <= this.c.height - pixel) {
      if (this.pressedKey.ArrowDown) {
        this.position.y += pixel;
        this.pressedKey.ArrowDown = false;
      }
    }
    if (this.position.y > 0) {
      if (this.pressedKey.ArrowUp) {
        this.position.y -= pixel;
        this.pressedKey.ArrowUp = false;
      }
    }
  }
}