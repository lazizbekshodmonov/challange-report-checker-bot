import { InlineKeyboard } from 'grammy';
import { UserRole } from '../../types/user.js';
import type { User } from '@prisma/client';

export default function (user: User) {
  if (user.role === UserRole.USER) {
    return new InlineKeyboard().text(
      '⭐ Admin huquqini berish',
      `set_role:${user.chat_id}:${UserRole.ADMIN}`
    );
  } else if (user.role === UserRole.ADMIN) {
    return new InlineKeyboard().text(
      '👤 Admin huquqini olib tashlash',
      `set_role:${user.chat_id}:${UserRole.USER}`
    );
  } else {
    return new InlineKeyboard();
  }
}
