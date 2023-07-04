import { Socket } from 'socket.io-client';
import { Field } from '../field/field';

// character Type
export interface PlayerProps {
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  id: string,
  color: string,
  field: Field,
  movement: {
    x: number,
    y: number
  }
}

// user character Type
export interface UserCharacterProps {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  id: string
  color: string
  moveSocket: Socket
  field: Field
  movement: {
    x: number,
    y: number
  }
}

// multiplayer user Type
export interface MultiplayerUserProps {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  id: string
  color: string
  field: Field
  movement: {
    x: number
    y: number
  }
}

// payload user data
export interface MultiplayerData {
  id: string
  color: string
  movement: {
    x: number
    y: number
  }
}