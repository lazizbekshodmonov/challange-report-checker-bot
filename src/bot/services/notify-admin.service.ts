import { type CommandContext } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import type { User } from '@prisma/client';
import userService from '../../modules/user/user.service.js';
import newUserNotifyMessage from '../messages/new-user-notify.message.js';
import roleKeyboard from '../keyboards/role.keyboard.js';
import type { MyChatMemberUpdate } from '../../types/chat.js';
import getBotChatMemberMessage from '../messages/chat-member-status-change.message.js';

export class NotifyAdminService {
  async notifyAdminOnNewUser(ctx: CommandContext<CustomContext>, newUser: User) {
    const adminUsers = await userService.getAdmins();
    const chatId = ctx.message?.from.id;

    for (const admin of adminUsers) {
      if (!admin?.chat_id && chatId && BigInt(chatId) === admin.chat_id) continue;

      const adminChatId = String(admin.chat_id);
      try {
        await ctx.api.sendMessage(adminChatId, newUserNotifyMessage(newUser), {
          reply_markup: roleKeyboard(newUser),
          parse_mode: 'HTML',
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async notifyAdminOnChangeChatMemberStatus(ctx: CustomContext, chatMember: MyChatMemberUpdate) {
    const adminUsers = await userService.getAdmins();
    for (const admin of adminUsers) {
      if (!admin?.chat_id) continue;

      const chatId = String(admin.chat_id);

      const message = getBotChatMemberMessage(chatMember);

      if (!message) continue;
      await ctx.api.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        link_preview_options: {
          is_disabled: true,
        },
      });
    }
  }
}

export default new NotifyAdminService();
