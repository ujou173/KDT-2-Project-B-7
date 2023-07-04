import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid'

export interface ChatOnlineUsers {
  [socketID: string]: string
}

@Injectable()
export class ChatService {
  private onlineUsers: ChatOnlineUsers = {}

  // enter user
  addOnlineUser(userInfo: {socketID: string, nickName: string}): {id: string, msg: string, sender: string} {
    this.onlineUsers[userInfo.socketID] = userInfo.nickName
    return {id: v4(), msg: `[ ${JSON.stringify(userInfo.nickName)} ] 님이 입장 하셨습니다.`, sender: 'server'}
  }
  
  // disconnect user
  deleteOnlineUser(socketID: string): {id: string, msg: string, sender: string} {
    const target = this.onlineUsers[socketID];
    delete this.onlineUsers[socketID];
    return {id: v4(), msg: `[ ${target} ] 님이 퇴장 하셨습니다.`, sender: 'server'}
  }

  // get user
  getOnlineUsers(): string[] {
    return Object.values(this.onlineUsers);
  }
}