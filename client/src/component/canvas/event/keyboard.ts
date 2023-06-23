import { Player } from '../character/character'
import { pixel, maxVelocity, minVelocity } from '../canvas'

// keydown event
export function keydownHandler(event: KeyboardEvent ,player: Player): void {
  switch (event.key) {
    case 'ArrowRight' :
      if (player.velocity.x < maxVelocity) {
        event.preventDefault();
        player.velocity.x += pixel
      }
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