import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { serverAddress } from 'common/server-common';
import { Server, Socket } from 'socket.io';
import { SocketServerService, UserData } from '../socket-server/socket-server.service';

@WebSocketGateway({
  namespace: 'character-move',
  cors: {
    origin: serverAddress
  }
})
export class CharacterMoveGateway {
  constructor(private readonly socketServerService: SocketServerService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, payload: UserData): void {
    client.emit('prevUsers', this.socketServerService.prevUsers());
    this.socketServerService.addOnlineUser({socketID: client.id, info: payload});
    client.broadcast.emit('enterUser', payload)
  }
  @SubscribeMessage('moveCharacter')
  moveCharacter(client: Socket, payload: {id: string, position: {x: number, y: number}}): void {
    this.socketServerService.positionUpdate({socketID: client.id, position: payload.position});
    client.broadcast.emit('moveCharacter', {id: payload.id, position: payload.position});
  }
  @SubscribeMessage('outConnect')
  disconnect(client: Socket, payload: string) {
    client.disconnect();
  }
}
