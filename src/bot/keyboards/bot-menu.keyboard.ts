import { Keyboard } from 'grammy';

type TKeyboardAction = 'create_topic';

export function botMenuKeyboard(step: TKeyboardAction) {
  const keyboard = new Keyboard();

  switch (step) {
    case 'create_topic':
      keyboard.text("Mavzu qo'shish").row().resized();
  }

  return keyboard;
}
