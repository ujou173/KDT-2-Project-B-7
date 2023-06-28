import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketServerService, UserInfo, InputUser } from './socket-server.service';

@WebSocketGateway()
export class SocketServerGateway {
  constructor(private readonly SocketServerService: SocketServerService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, payload: InputUser): void {
    this.SocketServerService.addOnlineUser(payload);
  }
  @SubscribeMessage('getOnline')
  getOnline(client: Socket, payload: string): void {
    const data = this.SocketServerService.getOnlineUser();
    client.emit('getOnline', data)
  }
  @SubscribeMessage('outUser')
  disconnectUser(client: Socket, payload: string): void {
    this.SocketServerService.deleteOnlineUser(payload);
  }
  @SubscribeMessage('checkNickName')
  possible(client: Socket, payload: string): void {
    const result: boolean = this.SocketServerService.checkDuplicationNickName(payload);
    client.emit('checkNickName', result);
  }
}