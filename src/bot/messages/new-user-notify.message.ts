import type { User } from '@prisma/client';

export default function newUserNotifyMessage(user: User) {
  return `<b>🆕 Yangi foydalanuvchi ro'yxatdan o'tdi</b>\n\n<b>🆔 ID:</b> <code>${user.chat_id}</code>\n<b>👤 Ism:</b> ${user.first_name} ${user.last_name || ''}\n<b>📛 Username:</b> ${user.username ? '@' + user.username : '—'}\n<b>🔑 Rol:</b> ${user.role}`;
}
