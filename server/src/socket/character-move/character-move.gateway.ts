import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { serverAddress } from 'common/server-common';
import { Server, Socket } from 'socket.io';
import { SocketServerService } from '../socket-server/socket-server.service';

@WebSocketGateway({
  namespace: 'character-move',
  cors: {
    origin: serverAddress
  }
})
export class CharacterMoveGateway {
  constructor(private readonly socketServerSerice: SocketServerService) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('moveCharacter')
  moveCharacter(client: Socket, payload: {x: number, y: number}): void {
    client.emit('test', this.socketServerSerice.getOnlineUser())
  }
  @SubscribeMessage('outConnect')
  disconnect(client: Socket, payload: string) {
    client.disconnect();
  }
}
