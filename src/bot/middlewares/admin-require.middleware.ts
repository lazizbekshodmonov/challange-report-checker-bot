import type { CustomContext } from '../../types/context.js';
import type { NextFunction } from 'grammy';
import userService from '../../modules/user/user.service.js';
import { UserRole } from '../../types/user.js';

export async function adminRequireMiddleware(ctx: CustomContext, next: NextFunction) {
  const chatId = ctx.message?.from.id;
  const admin = await userService.findByChatId(chatId!);

  if (!admin || admin.role !== UserRole.ADMIN) {
    return ctx.reply("Bu amalni bajarish uchun ruxsatingiz yo'q", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }
  return next();
}
