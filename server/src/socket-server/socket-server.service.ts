import { Injectable } from '@nestjs/common';

export interface UserInfo {
  [key: string] : {
    position: {
      x: number,
      y: number
    }
  }
}

export interface InputUser {
  id: string
  info: {
    position: {
      x: number,
      y: number
    }
  }
}

@Injectable()
export class SocketServerService {
  private onlineUser: UserInfo = {};

  getOnlineUser(): string[] {
    const result:string[] = Object.keys(this.onlineUser)
    return result;
  }
  addOnlineUser(userInfo: InputUser): void {
    this.onlineUser[userInfo.id] = userInfo.info;
  }
  deleteOnlineUser(userID: string): void {
    delete this.onlineUser.userID
  }
  positionUpdate(userInfo: {id: string, position: {x:number, y:number}}): void {
    this.onlineUser[userInfo.id].position = userInfo.position
  }
  checkDuplicationNickName(userInfo: string): boolean {
    const result = Object.keys(this.onlineUser).includes(userInfo);
    let response: boolean = true;
    if (result === false) {
      return response = false
    }
    return response;
  }
}