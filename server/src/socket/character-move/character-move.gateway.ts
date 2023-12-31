import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { serverAddress } from 'common/server-common';
import { Server, Socket } from 'socket.io';
import { SocketServerService, UserData } from '../socket-server/socket-server.service';

@WebSocketGateway({
  namespace: 'character-move',
  cors: {
    origin: serverAddress
  }
})
export class CharacterMoveGateway implements OnGatewayDisconnect {
  constructor(private readonly socketServerService: SocketServerService) {}
  @WebSocketServer()
  server: Server;

  // default event
  handleDisconnect(client: Socket) {
    const target: string = this.socketServerService.filterUser(client.id);
    this.socketServerService.deleteOnlineUser(client.id);
    this.server.emit('exitUser', target);
  }

  // enter user
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, payload: UserData): void {
    client.emit('prevUsers', this.socketServerService.prevUsers());
    this.socketServerService.addOnlineUser({socketID: client.id, info: payload});
    client.broadcast.emit('enterUser', payload)
  }

  // user's moving
  @SubscribeMessage('moveCharacter')
  moveCharacter(client: Socket, payload: {id: string, movement: {x: number, y: number}}): void {
    this.socketServerService.positionUpdate({socketID: client.id, movement: payload.movement});
    client.broadcast.emit('moveCharacter', {id: payload.id, movement: payload.movement});
  }

  // exit user
  @SubscribeMessage('outConnect')
  disconnect(client: Socket, payload: string) {
    client.disconnect();
  }
}
