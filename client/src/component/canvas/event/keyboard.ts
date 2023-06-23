import { Player } from '../character/character'
import { pixel } from '../canvas'

// keydown event
export function keydownHandler(event: KeyboardEvent ,player: Player): void {
  switch (event.key) {
    case 'ArrowRight' :
      player.velocity.x += pixel
      console.log(player.velocity.x)
      break
  }
}
// keyup event
export function keyupHandler(event: KeyboardEvent, player: Player): void {
  switch (event.key) {
    case 'ArrowRight' :
      player.velocity.x = 0;
      console.log(player.velocity.x)
      break
  }
}