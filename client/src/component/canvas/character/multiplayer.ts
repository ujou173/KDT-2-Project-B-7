import { Player } from './character';
import { MultiplayerUserProps } from './charType';
import { pixel } from '../canvas-common';
import { fontSize } from '../canvas-common';

// multiplayer user
export class MultiplayerUser extends Player {
  constructor({ canvas, ctx, id, color, field, movement }: MultiplayerUserProps) {
    super({ canvas, ctx, id, color, field, movement })
  }

  positionUpdate(movement: Player["movement"]) {
    this.movement = movement
    this.position = {
      x: this.field.fieldCenter().x + (this.movement.x * pixel),
      y: this.field.fieldCenter().y + (this.movement.y * pixel),
    };
  }

  nickname(): void {
    this.ctx.font = `${pixel * fontSize}px Arial`;
    this.ctx.fillStyle = 'gray';
    this.ctx.textAlign = 'center';
    const anchorPoint = pixel / 2
    this.ctx.fillText(this.id, this.position.x + anchorPoint, this.position.y - (anchorPoint));
  }

  update(): void {
    super.draw();
    this.nickname();
  }
}