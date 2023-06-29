import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { serverAddress } from 'common/server-common';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: serverAddress
  }
})
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
