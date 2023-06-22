import React from 'react';
import './canvas.css'

// function
function drawGrid(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pixelSize: number): void {
  canvas.width = 1920;
  canvas.height = 1080;
  let width = canvas.width;
  let height = canvas.height;
  for (let x = 0; x <= width; x += pixelSize) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += pixelSize) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }
  context.strokeStyle = '#000';
  context.stroke();
  context.lineWidth = 1
}
function draw(canvas: HTMLCanvasElement, ctx:CanvasRenderingContext2D): void {
  canvas.width = 1920;
  canvas.height = 1080;

  ctx.fillRect(0,0, canvas.width, canvas.height)
}

// component
interface Props {};
type CanvasComp = (props: Props) => JSX.Element;
const canvasComp: CanvasComp = () => {
  // canvas in Ref
  const canvasElement = React.useRef<HTMLCanvasElement>(null);

  // render -> canvas rendering
  React.useEffect(()=>{
    if (canvasElement.current) {
      // ctx = context
      const ctx = canvasElement.current.getContext('2d');
      if (ctx === null) return;
      drawGrid(canvasElement.current, ctx, 50)
      // draw(canvasElement.current, ctx);
    }
  }, [])
  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp