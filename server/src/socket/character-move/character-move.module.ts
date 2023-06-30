import { Module } from '@nestjs/common';
import { CharacterMoveGateway } from './character-move.gateway';
import { SocketServerService } from '../socket-server/socket-server.service';
import { SocketServerModule } from '../socket-server/socket-server.module';

@Module({
  imports: [SocketServerModule],
  providers: [CharacterMoveGateway, SocketServerService]
})
export class CharacterMoveModule {}
