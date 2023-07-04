import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { serverAddress } from 'common/server-common';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: serverAddress
  }
})
export class ChatGateway implements OnGatewayDisconnect {
  constructor (private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server

  // default event
  handleDisconnect(client: Socket) {
    const target = this.chatService.deleteOnlineUser(client.id);
    this.server.emit('exitUser', target);
  }

  //event
  // enter user
  @SubscribeMessage('enterUser')
  enterUser(client: Socket, nickName: string) {
    const log = this.chatService.addOnlineUser({socketID: client.id, nickName});
    this.server.emit('enterUser', log);
  }

  // chatting
  @SubscribeMessage('chat')
  chat(client: Socket, data: {id: string, msg: string, sender: string}): void {
    this.server.emit('chat', data);
  }

  // disconnect
  @SubscribeMessage('outConnect')
  outConnect(client: Socket): void {
    client.disconnect();
  }
}
