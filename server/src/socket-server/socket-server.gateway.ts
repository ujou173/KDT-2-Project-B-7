import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketServerService, UserInfo, InputUser } from './socket-server.service';
import { serverAddress } from 'common/server-common';

@WebSocketGateway({
  cors: {
    origin: serverAddress
  }
})
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
  @SubscribeMessage('checkNickName')
  possible(client: Socket, payload: string): void {
    const result: boolean = this.SocketServerService.checkDuplicationNickName(payload);
    client.emit('checkNickName', result);
  }
  @SubscribeMessage('disconnect')
  disconnectUser(client: Socket, payload: string): void {
    if (payload === '')
    this.SocketServerService.deleteOnlineUser(payload);
  }
}