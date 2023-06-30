import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketServerService } from './socket-server.service';
import { serverAddress } from 'common/server-common';

@WebSocketGateway({
  cors: {
    origin: serverAddress
  }
})
export class SocketServerGateway implements OnGatewayDisconnect {
  constructor(private readonly socketServerService: SocketServerService) {}
  @WebSocketServer()
  server: Server;

  // default event
  handleDisconnect(client: Socket) {
    this.socketServerService.deleteOnlineUser(client.id);
  }

  // event
  @SubscribeMessage('getOnline')
  getOnline(client: Socket, payload: string): void {
    const data = this.socketServerService.getOnlineUser();
    client.emit('getOnline', data)
  }
  @SubscribeMessage('checkNickName')
  possible(client: Socket, payload: string): void {
    const result: boolean = this.socketServerService.checkDuplicationNickName(payload);
    client.emit('checkNickName', result);
  }
  @SubscribeMessage('outConnect')
  disconnectUser(client: Socket, payload: string): void {
    if (payload === 'outCanvas') {
      this.socketServerService.deleteOnlineUser(client.id);
    }
    client.disconnect();
  }
}