import { Module } from '@nestjs/common';
import { SocketServerService } from './socket-server.service';
import { ChatModule } from './chat/chat.module';
import { CharacterMoveModule } from './character-move/character-move.module';

@Module({
  imports: [ChatModule, CharacterMoveModule],
  providers: [SocketServerService]
})
export class SocketServerModule {}
