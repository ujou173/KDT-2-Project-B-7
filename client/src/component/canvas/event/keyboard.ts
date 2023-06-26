import { Player } from '../character/character'

// keydown event
export function keydownHandler(event: KeyboardEvent ,player: Player): void {
  switch (event.key) {
    case 'ArrowRight' :
      event.preventDefault();
      break
    case 'ArrowLeft' :
      event.preventDefault();
      break
    case 'ArrowUp' :
      event.preventDefault();
      break
    case 'ArrowDown' :
      event.preventDefault();
      break
  }
  player.pressedKey[event.key] = true
}
// keyup event
export function keyupHandler(event: KeyboardEvent, player: Player): void {
  switch (event.key) {
    case 'ArrowRight' :
      event.preventDefault();
      break
    case 'ArrowLeft' :
      event.preventDefault();
      break
    case 'ArrowUp' :
      event.preventDefault();
      break
    case 'ArrowDown' :
      event.preventDefault();
      break
  }
  player.pressedKey[event.key] = false
}