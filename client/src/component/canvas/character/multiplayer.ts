import { Player } from './character';
import { MultiplayerUserProps } from './charType';

// multiplayer user
export class MultiplayerUser extends Player {
  constructor({ canvas, ctx, id, color, position }: MultiplayerUserProps) {
    super({ canvas, ctx, id, color, position })
  }

  positionUpdate(position: Player["position"]) {
    this.position = position;
  }

  update(): void {
    super.draw();
  }
}