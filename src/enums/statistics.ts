import type { CustomContext } from '../types/context.js';
import { getProjects } from '../services/project.service.js';
import { projectMessageFormatter } from '../utils/message.formatter.js';
import { adminChatIds } from '../constants/chatIds.js';

export async function statisticsButtonHandler(ctx: CustomContext) {
  if (!adminChatIds.includes(ctx.message?.chat.id as number)) {
    return await ctx.reply('Botdan foytdalanish uchun admin ruxsati kerak: @shodmonov_lazizbek');
  }
  await ctx.reply('📊 Statistikalar yuklanmoqda...');
  const projects = await getProjects();
  if (projects) {
    await ctx.reply(projectMessageFormatter(projects), {
      parse_mode: 'HTML',
    });
  } else {
    await ctx.reply("Ma'lumot topilmadi");
  }
}
