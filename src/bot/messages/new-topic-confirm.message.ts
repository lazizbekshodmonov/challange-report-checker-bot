import type { Topic } from '@prisma/client';

export default function (topic: Topic, removeKeyboard: boolean = false) {
  let message = `<b>🆕 Yangi mavzu yaratildi!</b>\n\n` + `📌 <b>Mavzu:</b> ${topic.title}\n\n`;
  if (!removeKeyboard) {
    message = message + `<i>Ushbu mavzuni guruhga yuborishni xohlaysizmi?</i>`;
  }

  return message;
}
