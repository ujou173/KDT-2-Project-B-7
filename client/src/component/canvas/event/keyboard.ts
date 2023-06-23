import { Player } from '../character/character'
import { pixel, maxVelocity, minVelocity, duration } from '../common'

// keydown event
export function keydownHandler(event: KeyboardEvent ,player: Player): void {
  const start: Player['position'] = {
    x: player.position.x,
    y: player.position.y
  }
  const target: number = pixel
  switch (event.key) {
    case 'ArrowRight' :
      if (player.isMoving) return;
      player.isMoving = true;
      player.position.x += pixel;
      setTimeout(()=>{
        player.isMoving = false
      }, duration);
      break
    case 'ArrowLeft' :
      if (player.velocity.x >= minVelocity) {
        event.preventDefault();
        player.velocity.x -= pixel
      }
      break
    case 'ArrowDown' :
      if (player.velocity.y < maxVelocity) {
        event.preventDefault();
        player.velocity.y += pixel
      }
      break
    case 'ArrowUp' :
      if (player.velocity.y >= minVelocity) {
        event.preventDefault();
        player.velocity.y -= pixel
      }
      break
    default :
      console.log(event.key);
      break
  }
}
// keyup event
export function keyupHandler(event: KeyboardEvent, player: Player): void {
  switch (event.key) {
    case 'ArrowRight' :
      player.velocity.x = 0;
      break
    case 'ArrowLeft' :
      player.velocity.x = 0;
      break
    case 'ArrowDown' :
      player.velocity.y = 0;
      break
    case 'ArrowUp' :
      player.velocity.y = 0;
      break
  }
}