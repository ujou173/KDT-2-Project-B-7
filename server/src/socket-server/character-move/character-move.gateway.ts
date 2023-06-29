import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { serverAddress } from 'common/server-common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'character-move',
  cors: {
    origin: serverAddress
  }
})
export class CharacterMoveGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('moveCharacter')
  moveCharacter(client: Socket, payload: {x: number, y: number}): void {
    client.emit('enterUser', `너의 좌표는 x: ${payload.x}, y: ${payload.y}야!`)
  }
  @SubscribeMessage('outConnect')
  disconnect(client: Socket, payload: string) {
    client.disconnect();
  }
}
