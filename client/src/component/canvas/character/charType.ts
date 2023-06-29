import { Socket } from 'socket.io-client'
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
  moveSocket: Socket
}
