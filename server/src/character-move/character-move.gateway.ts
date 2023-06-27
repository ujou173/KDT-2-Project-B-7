import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'

@WebSocketGateway({
  namespace: 'character-move'
})
export class CharacterMoveGateway {
  @WebSocketServer()
  server: Server
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
