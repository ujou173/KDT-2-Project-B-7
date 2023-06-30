import { Player } from './character';
import { Socket } from 'socket.io-client';
import { pixel } from '../canvas-common';
import { UserCharacterProps } from './charType';

// client User
export class UserCharacter extends Player {
  moveSocket: Socket
  pressedKey: {
    [key: string]: boolean
  }
  constructor({ canvas, ctx, id, color, position, moveSocket }: UserCharacterProps) {
    super({ canvas, ctx, id, color, position })
    this.moveSocket = moveSocket;
    this.pressedKey = {}
  }
  private positionUpdate(): {id: string, position: {x: number, y: number}} {
    return {id: this.id, position: this.position}
  }

  update(): void {
    super.draw();
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