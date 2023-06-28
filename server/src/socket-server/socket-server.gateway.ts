import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketServerService, UserInfo } from './socket-server.service';

@WebSocketGateway()
export class SocketServerGateway {
  constructor(private readonly SocketServerService: SocketServerService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, payload: string): void {
    client.emit('yourID', client.id)
  }
}