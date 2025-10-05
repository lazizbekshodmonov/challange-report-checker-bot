import type { MyChatMemberUpdate } from '../../types/chat.js';

export default function getBotChatMemberMessage(chatMember: MyChatMemberUpdate): string | null {
  const { chat, from, old_chat_member, new_chat_member } = chatMember;

  // Actor (harakatni bajargan foydalanuvchi)
  const actor = from.username
    ? `<a href="https://t.me/${from.username}">${from.first_name}${from.last_name ? ' ' + from.last_name : ''}</a>`
    : `<b>${from.first_name}${from.last_name ? ' ' + from.last_name : ''}</b>`;

  // Guruh linki (agar username bo‘lsa)
  const group = chat.username
    ? `<a href="https://t.me/${chat.username}">${chat.title}</a>`
    : `<b>${chat.title}</b>`;

  // Guruh ID
  const groupId = `<code>${chat.id}</code>`;

  // Bot guruhga qo‘shildi
  if (
    (old_chat_member.status === 'left' || old_chat_member.status === 'kicked') &&
    (new_chat_member.status === 'member' || new_chat_member.status === 'administrator')
  ) {
    return `✅ ${actor} botni ${group} guruhiga <b>qo‘shdi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  // Huquqlari o‘zgardi (admin huquqi berildi)
  if (old_chat_member.status === 'member' && new_chat_member.status === 'administrator') {
    return `🔑 ${actor} botga ${group} guruhida <b>admin huquqi berdi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  // Huquqlari pasaytirildi (adminlik olib tashlandi)
  if (old_chat_member.status === 'administrator' && new_chat_member.status === 'member') {
    return `⚠️ ${actor} botning ${group} guruhidagi <b>admin huquqini olib tashladi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  // Bot guruhdan chiqarildi
  if (new_chat_member.status === 'left') {
    return `🚫 ${actor} botni ${group} guruhdan <b>chiqarib tashladi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  return null; // boshqa holatlarda xabar yuborilmaydi
}
