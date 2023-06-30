import { Module } from '@nestjs/common';
import { SocketServerService } from './socket-server.service';
import { SocketServerGateway } from './socket-server.gateway';

@Module({
  providers: [SocketServerGateway, SocketServerService],
  exports: [SocketServerService]
})
export class SocketServerModule {}
