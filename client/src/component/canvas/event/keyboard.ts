import { UserCharacter } from '../character/userCharacter'

// keydown event
export function keydownHandler(event: KeyboardEvent ,UserCharacter: UserCharacter): void {
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
  UserCharacter.pressedKey[event.key] = true
}
// keyup event
export function keyupHandler(event: KeyboardEvent, UserCharacter: UserCharacter): void {
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
  UserCharacter.pressedKey[event.key] = false
}