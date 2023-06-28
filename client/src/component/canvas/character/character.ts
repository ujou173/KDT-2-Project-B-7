import { PlayerProps } from './charType'
import { pixel } from '../common'
import { Socket } from 'socket.io-client'

// character
export class Player {
  private readonly c: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  color: string
  position: {
    x: number,
    y: number
  }
  pressedKey: {
    [key: string]: boolean
  }
  private readonly moveSocket: Socket
  constructor ( { canvas, ctx, color, position, moveSocket }:PlayerProps ) {
    this.c = canvas
    this.ctx = ctx
    this.color = color
    this.position = position
    this.pressedKey = {}
    this.moveSocket = moveSocket
  }

  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
  }

  private positionUpdate(): {x: number, y: number} {
    return {x: this.position.x, y: this.position.y}
  }

  update(): void {
    this.draw();
    if (this.position.x + pixel <= this.c.width - pixel) {
      if (this.pressedKey.ArrowRight) {
        this.position.x += pixel;
        this.moveSocket.emit('moveCharacter', this.positionUpdate())
        this.pressedKey.ArrowRight = false;
      }
    }
    if (this.position.x > 0) {
      if (this.pressedKey.ArrowLeft) {
        this.position.x -= pixel;
        this.moveSocket.emit('moveCharacter', this.positionUpdate())
        this.pressedKey.ArrowLeft = false;
      }
    }
    if (this.position.y + pixel <= this.c.height - pixel) {
      if (this.pressedKey.ArrowDown) {
        this.position.y += pixel;
        this.moveSocket.emit('moveCharacter', this.positionUpdate())
        this.pressedKey.ArrowDown = false;
      }
    }
    if (this.position.y > 0) {
      if (this.pressedKey.ArrowUp) {
        this.position.y -= pixel;
        this.moveSocket.emit('moveCharacter', this.positionUpdate())
        this.pressedKey.ArrowUp = false;
      }
    }
  }
}