import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

//type
export interface UserInfo {
  [key: string] : {
    id: string,
    position: {
      x: number,
      y: number
    }
  }
}
export interface InputUser {
  socketID: string,
  info : {
    id: string
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
    const result:string[] = Object.values(this.onlineUser).map(element => element.id)
    return result;
  }
  addOnlineUser(userInfo: InputUser): void {
    this.onlineUser[userInfo.socketID] = userInfo.info;
  }
  deleteOnlineUser(userID: string): void {
    delete this.onlineUser[userID]
  }
  positionUpdate(userInfo: {id: string, position: {x:number, y:number}}): void {
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