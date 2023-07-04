import { Player } from './character';
import { Socket } from 'socket.io-client';
import { fontSize, pixel } from '../canvas-common';
import { UserCharacterProps } from './charType';
import { MultiplayerUser } from './multiplayer';
import { duration } from '../canvas-common';
import { Field } from '../field/field';

// client User
export class UserCharacter extends Player {
  moveSocket: Socket
  pressedKey: {
    [key: string]: boolean
  }
  onlineUsers: {[nickName: string]: MultiplayerUser}
  isMoveRight: boolean
  isMoveLeft: boolean
  isMoveUp: boolean
  isMoveDown: boolean
  isMove: boolean
  field: Field
  constructor({ canvas, ctx, id, color, field, moveSocket, movement }: UserCharacterProps) {
    super({ canvas, ctx, id, color, field, movement })
    this.moveSocket = moveSocket;
    this.pressedKey = {};
    this.onlineUsers = {};

    // 움직일 수 있을까?
    this.isMoveRight = true;
    this.isMoveLeft = true;
    this.isMoveUp = true;
    this.isMoveDown = true;
    this.isMove = false

    this.field = field
  }
  private positionUpdate(): {id: string, movement: {x: number, y: number}} {
    return {id: this.id, movement: this.movement}
  }

  nickname(): void {
    this.ctx.font = `${pixel * fontSize}px Arial`;
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    const anchorPoint = pixel / 2
    this.ctx.fillText(this.id, this.position.x + anchorPoint, this.position.y - (anchorPoint));
  }

  // move character
  moveRight(): void {
    this.movement.x++;
    this.position.x = this.field.fieldCenter().x + (this.movement.x * pixel)
  }
  moveLeft(): void {
    this.movement.x--;
    this.position.x = this.field.fieldCenter().x + (this.movement.x * pixel)
  }
  moveDown(): void {
    this.movement.y++;
    this.position.y = this.field.fieldCenter().y + (this.movement.y * pixel)
  }
  moveUp(): void {
    this.movement.y--;
    this.position.y = this.field.fieldCenter().y + (this.movement.y * pixel)
  }

  // character bumpering
  checkMove(): boolean {
    let result: boolean = true;
    if (!this.isMove) {
      // Multiplayer's position
      const UsersPosition:MultiplayerUser['position'][] = []
      Object.values(this.onlineUsers).forEach((element: MultiplayerUser) => {
        UsersPosition.push(element.position)
      })
      if (this.pressedKey.ArrowRight) {
        if (UsersPosition.some(item => item.x === this.position.x + pixel && item.y === this.position.y)) {
          result = false;
        }
      }
      if (this.pressedKey.ArrowLeft) {
        if (UsersPosition.some(item => item.x === this.position.x - pixel && item.y === this.position.y)) {
          result = false;
        }
      }
      if (this.pressedKey.ArrowUp) {
        if (UsersPosition.some(item => item.x === this.position.x && item.y === this.position.y - pixel )) {
          result = false;
        }
      }
      if (this.pressedKey.ArrowDown) {
        if (UsersPosition.some(item => item.x === this.position.x && item.y === this.position.y + pixel )) {
          result = false;
        }
      }
    } else {
      result = false;
    }
    return result
  }

  moveCharacter(): void {
    // character move
    if (this.position.x + pixel <= this.field.fieldEnd().x - pixel) {
      if (this.pressedKey.ArrowRight) {
        if (this.checkMove()) {
          this.moveRight();
          this.moveSocket.emit('moveCharacter', this.positionUpdate())
          this.isMove = true;
          // 이동속도 제한
          setTimeout(()=>{
            this.isMove = false;
          }, duration)
        }
      }
    }
    if (this.position.x - pixel >= this.field.fieldStart().x) {
      if (this.pressedKey.ArrowLeft) {
        if (this.checkMove()) {
          this.moveLeft();
          this.moveSocket.emit('moveCharacter', this.positionUpdate())
          this.isMove = true;
          // 이동속도 제한
          setTimeout(()=>{
            this.isMove = false;
          }, duration)
        }
      }
    }
    if (this.position.y + pixel <= this.field.fieldEnd().y - pixel) {
      if (this.pressedKey.ArrowDown) {
        if (this.checkMove()) {
          this.moveDown();
          this.moveSocket.emit('moveCharacter', this.positionUpdate())
          this.isMove = true;
          // 이동속도 제한
          setTimeout(()=>{
            this.isMove = false;
          }, duration)
        }
      }
    }
    if (this.position.y - pixel >= this.field.fieldStart().y) {
      if (this.pressedKey.ArrowUp) {
        if (this.checkMove()) {
          this.moveUp();
          this.moveSocket.emit('moveCharacter', this.positionUpdate())
          this.isMove = true;
          // 이동속도 제한
          setTimeout(()=>{
            this.isMove = false;
          }, duration)
        }
      }
    }
  }

  update(): void {
    super.draw();
    this.nickname();
    this.moveCharacter();
  }
}