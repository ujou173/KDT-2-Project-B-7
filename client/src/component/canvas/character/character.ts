import { PlayerProps } from './charType'
import { pixel } from '../canvas-common'
import { Field } from '../field/field'

// character
export class Player {
  readonly c: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly id: string
  readonly color: string
  position: {
    x: number,
    y: number
  }
  movement: {
    x: number,
    y: number
  }
  field: Field
  constructor ( { canvas, ctx, id, color, field, movement }:PlayerProps ) {
    this.c = canvas
    this.ctx = ctx
    this.id = id
    this.color = color
    this.field = field
    this.movement = movement
    this.position = {
      x: field.fieldCenter().x + (this.movement.x * pixel),
      y: field.fieldCenter().y + (this.movement.y * pixel)
    }
  }

  draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position.x, this.position.y, pixel, pixel);
  }
}