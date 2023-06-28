import { Module } from '@nestjs/common';
import { SocketServerService } from './socket-server.service';
import { ChatModule } from './chat/chat.module';
import { CharacterMoveModule } from './character-move/character-move.module';
import { SocketServerGateway } from './socket-server.gateway';

@Module({
  imports: [ChatModule, CharacterMoveModule],
  providers: [SocketServerGateway, SocketServerService]
})
export class SocketServerModule {}
