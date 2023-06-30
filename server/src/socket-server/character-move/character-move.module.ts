import { Module } from '@nestjs/common';
import { CharacterMoveGateway } from './character-move.gateway';
import { SocketServerService } from '../socket-server.service';

@Module({
  providers: [CharacterMoveGateway, SocketServerService]
})
export class CharacterMoveModule {}
