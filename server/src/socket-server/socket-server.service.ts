import { Injectable } from '@nestjs/common';

export interface UserInfo {
  id: string,
  info: {
    position: {
      x: number,
      y: number
    }
  }
}

@Injectable()
export class SocketServerService {
  private onlineUser: UserInfo[] = [];

  getOnlineUser(): string[] {
    const result:string[] = this.onlineUser.map((element: UserInfo) => {
      return element.id;
    })
    return result;
  }
  addOnlineUser(userInfo: UserInfo): void {
    this.onlineUser.push(userInfo);
  }
  deleteOnlineUser(userID: UserInfo["id"]): void {
    const removeTarget = this.onlineUser.findIndex((element: UserInfo) => element.id === userID);
    this.onlineUser.splice(removeTarget, 1);
  }
  positionUpdate(userInfo: UserInfo): void {
    const updateTarget = this.onlineUser.findIndex((element: UserInfo) => element.id === userInfo.id)
    this.onlineUser[updateTarget].info.position = userInfo.info.position
  }
}