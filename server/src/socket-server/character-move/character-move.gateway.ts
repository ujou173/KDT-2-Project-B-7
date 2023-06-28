import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'character-move',
  cors: {
    origin: 'http://localhost:3500'
  }
})
export class CharacterMoveGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, payload: string): void {
    client.emit('yourID', client.id);
  }
  @SubscribeMessage('moveCharacter')
  moveCharacter(client: Socket, payload: {x: number, y: number}): void {
    client.emit('enterUser', `너의 좌표는 x: ${payload.x}, y: ${payload.y}야!`)
  }
}
