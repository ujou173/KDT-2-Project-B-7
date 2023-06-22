import React from 'react';
import './canvas.css'

// function
function drawGrid(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pixelSize: number): void {
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
}

// component
interface Props {};
type canvasComp = (props: Props) => JSX.Element;
const canvasComp: canvasComp = () => {
  // canvas in Ref
  const canvasElement = React.useRef<HTMLCanvasElement>(null);

  // render -> canvas rendering
  React.useEffect(()=>{
    if (canvasElement.current) {
      // ctx = context
      const ctx = canvasElement.current.getContext('2d');
      if (ctx === null) return;
      drawGrid(canvasElement.current, ctx, 15)
    }
  }, [])
  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp