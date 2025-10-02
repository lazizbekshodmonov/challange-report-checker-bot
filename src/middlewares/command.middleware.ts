import { type CommandContext, InputFile, Keyboard, type NextFunction } from 'grammy';
import type { CustomContext } from '../types/context.js';
import { getLogFileStream } from '../utils/logger.js';
import { adminChatIds } from '../constants/chatIds.js';

export async function startCommandMiddleware(
  ctx: CommandContext<CustomContext>,
  next: NextFunction
) {
  if (!adminChatIds.includes(ctx.message?.chat.id as number)) {
    return await ctx.reply('Botdan foytdalanish uchun admin ruxsati kerak: @shodmonov_lazizbek', {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }
  const keyboard = new Keyboard().text('📊 Statistikani olish').row().resized();

  await ctx.reply(
    "Salom! Men Mirishkor tuman bo'yicha Open Buget ovozlar statistikasini yuboraman. ✅",
    {
      reply_markup: keyboard,
    }
  );
}

export async function logsCommandMiddleware(ctx: CommandContext<CustomContext>) {
  const args = ctx.message?.text?.split(' ').slice(1) || [];
  const dateArg = args[0];

  if (ctx.message?.chat.id !== 1203493326) {
    return ctx.reply('Bu amalni bajarishga faqat admin ruhsati bor!');
  }

  try {
    const { stream, filename } = getLogFileStream(dateArg);
    await ctx.replyWithDocument(new InputFile(stream as any, filename));
  } catch (error) {
    await ctx.reply(
      dateArg ? `${dateArg} sana uchun log fayli topilmadi.` : `Bugungi log fayli topilmadi.`
    );
  }
}
