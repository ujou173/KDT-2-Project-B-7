import { Module } from '@nestjs/common';
import { CharacterMoveGateway } from './character-move.gateway';
import { SocketServerModule } from '../socket-server/socket-server.module';

@Module({
  imports: [SocketServerModule],
  providers: [CharacterMoveGateway]
})
export class CharacterMoveModule {}
