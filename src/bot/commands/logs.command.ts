import { type CommandContext, InputFile } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import { getLogFileStream } from '../../utils/logger.js';

export default async function logsCommand(ctx: CommandContext<CustomContext>) {
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
