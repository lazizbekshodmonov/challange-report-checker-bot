import { type CommandContext } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import { type ITelegramUser, UserRole } from '../../types/user.js';
import getEnvVariable from '../../config/env.js';
import userService from '../../modules/user/user.service.js';
import notifyAdminService from '../services/notify-admin.service.js';
import userWelcomeMessage from '../messages/user-welcome.message.js';
import { joinGroupInlineKeyboard } from '../keyboards/join-group.keyboard.js';

export default async function startCommand(ctx: CommandContext<CustomContext>) {
  const defaultAdminId = getEnvVariable('BOT_ADMIN_ID');

  if (ctx.message?.from) {
    const role = Number(defaultAdminId) === ctx.message?.from.id ? UserRole.ADMIN : UserRole.USER;

    const telegramUser = ctx.message.from as ITelegramUser;
    const exitingUser = await userService.findByChatId(telegramUser.id);

    if (exitingUser) {
      return await ctx.reply(userWelcomeMessage(exitingUser), {
        reply_markup: joinGroupInlineKeyboard(),
        parse_mode: 'HTML',
      });
    }

    const newUser = await userService.registerUser(telegramUser, role);

    await ctx.reply(userWelcomeMessage(newUser), {
      reply_markup: joinGroupInlineKeyboard(),
      parse_mode: 'HTML',
    });

    await notifyAdminService.notifyAdminOnNewUser(ctx, newUser);
  }
}
