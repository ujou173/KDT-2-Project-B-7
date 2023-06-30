import { Injectable, Scope } from '@nestjs/common';

//type
// user's data
export interface UserData {
  id: string,
  position: {
    x: number,
    y: number
  },
  color: string
}
// insert user
export interface SocketInfo {
  socketID: string,
  info : UserData
}

// online users type
export interface OnlineUser {
  [key: string] : UserData
}

@Injectable({ scope: Scope.DEFAULT })
export class SocketServerService {
  private onlineUser: OnlineUser = {};

  getOnlineUser(): string[] {
    const result:string[] = Object.values(this.onlineUser).map(element => element.id)
    return result;
  }
  addOnlineUser(userInfo: SocketInfo): void {
    this.onlineUser[userInfo.socketID] = userInfo.info;
  }
  deleteOnlineUser(userID: string): void {
    delete this.onlineUser[userID]
  }
  positionUpdate(userInfo: {id: UserData['id'], position: UserData['position']}): void {
    this.onlineUser[userInfo.id].position = userInfo.position
  }
  checkDuplicationNickName(userInfo: string): boolean {
    const result = this.getOnlineUser().includes(userInfo);
    let response: boolean = true;
    if (result === false) {
      return response = false;
    }
    return response;
  }
}