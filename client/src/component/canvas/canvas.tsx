import React, { ReactNode } from 'react';
import './canvas.css'
import { Player } from './character/character'
import { field } from './field/field'

// common variable
export const pixel: number = 50;

// component
interface Props {};
const canvasComp: React.FC<Props> = () => {
  // canvas in Ref
  const canvasElement = React.useRef<HTMLCanvasElement>(null);

  // Event handler
  function keydownHandler(event: KeyboardEvent): void {
    console.log(event.key);
  }
  function keyupHandler(event: KeyboardEvent): void {
    console.log(event.key);
  }
  
  // render -> canvas rendering
  React.useEffect(()=>{
    if (canvasElement.current) {
      // ctx = context
      const ctx = canvasElement.current.getContext('2d');
      if (ctx === null) return;
      field(canvasElement.current, ctx);
      
      // new Player
      const MC: Player = new Player({
        canvas: canvasElement.current,
        ctx,
        position: {
          x: 0,
          y: 0
        },
        velocity: {
          x: 0,
          y: 0
        }
      })

      MC.draw();

      // animation
      function animation(): void {
        window.requestAnimationFrame(animation);
        if (canvasElement.current === null) return;
        if (ctx === null) return;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasElement.current.width, canvasElement.current.height);
        MC.update();
      }
      animation();

      addEventListener('keydown', keydownHandler);
      addEventListener('keyup', keydownHandler);
    }
    return (): void => {
      removeEventListener('keydown', keydownHandler);
      removeEventListener('keyup', keydownHandler);
    }
  }, [])
  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp