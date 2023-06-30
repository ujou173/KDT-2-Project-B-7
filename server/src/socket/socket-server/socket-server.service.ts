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

@Injectable()
export class SocketServerService {
  private onlineUser: OnlineUser = {};

  // online user nickname
  getOnlineUser(): string[] {
    const result:string[] = Object.values(this.onlineUser).map(element => element.id)
    return result;
  }

  // enter user
  addOnlineUser(userInfo: SocketInfo): void {
    this.onlineUser[userInfo.socketID] = userInfo.info;
  }

  // exit user
  deleteOnlineUser(userID: string): void {
    delete this.onlineUser[userID]
  }

  // user's moving
  positionUpdate(userInfo: {socketID: SocketInfo['socketID'], position: UserData['position']}): void {
    this.onlineUser[userInfo.socketID].position = userInfo.position
  }

  // nickname check
  checkDuplicationNickName(userInfo: string): boolean {
    const result = this.getOnlineUser().includes(userInfo);
    let response: boolean = true;
    if (result === false) {
      return response = false;
    }
    return response;
  }

  // previous user
  prevUsers(): UserData[] {
    return Object.values(this.onlineUser)
  }

  // filter user
  filterUser(socketID: SocketInfo['socketID']): string {
    try {
      return this.onlineUser[socketID].id;
    } catch (e) {
      return 'noneUser';
    }
  }
}