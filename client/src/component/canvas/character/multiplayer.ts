import { Player } from './character';
import { MultiplayerUserProps } from './charType';
import { pixel } from '../canvas-common';
import { fontSize } from '../canvas-common';

// multiplayer user
export class MultiplayerUser extends Player {
  constructor({ canvas, ctx, id, color, position }: MultiplayerUserProps) {
    super({ canvas, ctx, id, color, position })
  }

  positionUpdate(position: Player["position"]) {
    this.position = position;
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