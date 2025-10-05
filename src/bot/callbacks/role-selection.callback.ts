import type { CallbackQueryContext } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import userService from '../../modules/user/user.service.js';
import { UserRole } from '../../types/user.js';
import newUserNotifyMessage from '../messages/new-user-notify.message.js';
import roleKeyboard from '../keyboards/role.keyboard.js';
import botAdminGrantedMessage from '../messages/bot-admin-granted.message.js';
import botAdminRemovedMessage from '../messages/bot-admin-removed.message.js';
import { botMenuKeyboard } from '../keyboards/bot-menu.keyboard.js';

export default async function (ctx: CallbackQueryContext<CustomContext>) {
  const [action, chatId, role] = ctx.callbackQuery.data.split(':');

  if (action !== 'set_role') return;
  if (!chatId) return;

  const user = await userService.findByChatId(Number(chatId));
  if (!user) return;
  if (user.role === role) {
    return await ctx.editMessageText(newUserNotifyMessage(user), {
      parse_mode: 'HTML',
      reply_markup: roleKeyboard(user),
    });
  }

  const updatedUser = await userService.updateUserRoleByChatId(Number(chatId), role as UserRole);

  await ctx.answerCallbackQuery({
    text:
      updatedUser?.role === 'ADMIN'
        ? `✅ ${updatedUser?.first_name}ga ADMIN huquqi berildi!`
        : `✅ ${updatedUser?.first_name}dan ADMIN huquqi olib tashlandi!`,
    show_alert: true,
  });

  await ctx.editMessageText(newUserNotifyMessage(updatedUser!), {
    parse_mode: 'HTML',
    reply_markup: roleKeyboard(updatedUser!),
  });

  if (updatedUser) {
    if (updatedUser.role === UserRole.ADMIN) {
      await ctx.api.sendMessage(Number(updatedUser.chat_id), botAdminGrantedMessage(updatedUser), {
        parse_mode: 'HTML',
        reply_markup: botMenuKeyboard('create_topic'),
      });
    } else if (updatedUser.role === UserRole.USER) {
      await ctx.api.sendMessage(Number(updatedUser.chat_id), botAdminRemovedMessage(updatedUser), {
        parse_mode: 'HTML',
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
  }
}
