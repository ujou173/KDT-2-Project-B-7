export class Field {
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  size: {
    x: number,
    y: number
  }

  constructor(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size: {x: number, y: number}) {
    this.c = c;
    this.ctx = ctx;
    this.size = size;
  }

  // draw center of canvas
  fieldStart(): {x: number, y: number} {
    return {
      x: (this.c.width / 2) - (this.size.x / 2),
      y: (this.c.height / 2) - (this.size.y / 2)
    }
  }
  
  // end field position
  fieldEnd(): {x: number, y: number} {
    return {
      x: this.fieldStart().x + this.size.x,
      y: this.fieldStart().y + this.size.y
    }
  }

  // field's center
  fieldCenter(): {x: number, y:number} {
    return {
      x: this.fieldStart().x + (this.size.x / 2),
      y: this.fieldStart().y + (this.size.y / 2)
    }
  }

  // draw field
  drawField(): void {
    this.ctx.fillStyle = '#11264f';
    this.ctx.fillRect(this.fieldStart().x, this.fieldStart().y, this.size.x, this.size.y);
  }
}