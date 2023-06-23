import React, { ReactNode } from 'react';
import './canvas.css'
import { Player } from './character/character'
import { field } from './field/field'
import { keydownHandler, keyupHandler } from './event/keyboard'

// component
interface Props {};
const canvasComp: React.FC<Props> = () => {
  // canvas in Ref
  const canvasElement = React.useRef<HTMLCanvasElement>(null);

  // render -> canvas rendering
  React.useEffect(()=>{
    if (canvasElement.current === null) return;
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
    
    addEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, MC)});
    addEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, MC)});

    // unmount clean-code
    return (): void => {
      removeEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, MC)});
      removeEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, MC)});
    }
  }, [])
  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp