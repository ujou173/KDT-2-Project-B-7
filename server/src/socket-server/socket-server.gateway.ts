import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketServerService, UserData } from './socket-server.service';
import { serverAddress } from 'common/server-common';
import * as fs from 'fs';

@WebSocketGateway({
  cors: {
    origin: serverAddress
  }
})
export class SocketServerGateway implements OnGatewayDisconnect {
  constructor(private readonly SocketServerService: SocketServerService) {}
  @WebSocketServer()
  server: Server;

  // default event
  handleDisconnect(client: Socket) {
    this.SocketServerService.deleteOnlineUser(client.id);
  }

  // event
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, payload: UserData): void {
    this.SocketServerService.addOnlineUser({socketID: client.id, info: payload});
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
  @SubscribeMessage('outConnect')
  disconnectUser(client: Socket, payload: string): void {
    if (payload === 'outCanvas') {
      this.SocketServerService.deleteOnlineUser(client.id);
    }
    client.disconnect();
  }
}