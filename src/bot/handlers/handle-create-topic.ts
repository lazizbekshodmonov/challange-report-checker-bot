import { type HearsContext, type NextFunction } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import topicService from '../../modules/topic/topic.service.js';
import newTopicConfirmMessage from '../messages/new-topic-confirm.message.js';
import confirmTopicKeyboard from '../keyboards/confirm-topic.keyboard.js';

export async function handleCreateTopicEvent(ctx: HearsContext<CustomContext>) {
  ctx.session.step = 'waiting_topic';
  await ctx.api.sendMessage(ctx.from?.id!, 'Mavzu matnini yuboring', {
    parse_mode: 'HTML',
    reply_markup: {
      remove_keyboard: true,
    },
  });
}

export async function handleCreateTopicText(ctx: CustomContext, next: NextFunction) {
  const text = ctx.message?.text;
  if (ctx.session.step === 'waiting_topic' && text && text.trim() !== '') {
    const topic = await topicService.createTopic(text);
    await ctx.reply(newTopicConfirmMessage(topic), {
      reply_markup: confirmTopicKeyboard(topic),
      parse_mode: 'HTML',
    });

    ctx.session.step = 'waiting_confirm';
  } else if (ctx.session.step === 'waiting_confirm') {
    await ctx.reply('Mavzuni tasdilang yoki bekor qiling!', {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    ctx.session.step = 'waiting_confirm';
  } else {
    return next();
  }
}
