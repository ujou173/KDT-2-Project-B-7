import { Module } from '@nestjs/common';
import { CharacterMoveGateway } from './character-move.gateway';

@Module({
  providers: [CharacterMoveGateway]
})
export class CharacterMoveModule {}
