import { Module } from '@nestjs/common';
import { SocketServerModule } from './socket-server/socket-server.module';
import { CharacterMoveModule } from './character-move/character-move.module';

@Module({
  imports: [ SocketServerModule, CharacterMoveModule ]
})
export class SocketModule {}