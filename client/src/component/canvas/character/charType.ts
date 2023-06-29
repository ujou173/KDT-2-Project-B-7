import { Socket } from 'socket.io-client';

// character Type
export interface PlayerProps {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  id: string,
  color: string
  position: {
    x: number,
    y: number
  },
}

// user character Type
export interface UserCharacterProps {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  id: string
  color: string
  position: {
    x: number,
    y: number
  },
  moveSocket: Socket
}

// multiplayer user Type
export interface MultiplayerUserProps {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  id: string,
  color: string
  position: {
    x: number,
    y: number
  },
}

// payload user data
export interface MultiplayerData {
  id: string,
  color: string,
  position: {
    x: number,
    y: number
  }
}