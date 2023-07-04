import { Module } from '@nestjs/common';
import { SocketServerModule } from './socket-server/socket-server.module';
import { CharacterMoveModule } from './character-move/character-move.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ SocketServerModule, CharacterMoveModule, ChatModule ]
})
export class SocketModule {}