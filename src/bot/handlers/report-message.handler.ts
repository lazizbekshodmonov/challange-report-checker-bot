import type { CustomContext } from '../../types/context.js';
import reportService from '../../modules/report/report.service.js';

export default async function (ctx: CustomContext) {
  const text = ctx.message?.text;
  const chatId = ctx.message?.from.id;

  if (!text) return;
  const match = text.match(/#report_(\d+)/);

  if (match) {
    const topicId = match[1];
    await reportService.createReport(text, chatId!, Number(topicId));
    await ctx.reply(`✅ Report qabul qilindi!\n\n` + `#topic_${topicId}`, {
      parse_mode: 'HTML',
      reply_parameters: {
        message_id: ctx.message!.message_id,
      },
    });
  }
}
