import type { CallbackQueryContext } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import topicService from '../../modules/topic/topic.service.js';
import getEnvVariable from '../../config/env.js';
import confirmedTopicMessage from '../messages/confirmed-topic.message.js';
import { botMenuKeyboard } from '../keyboards/bot-menu.keyboard.js';
import newTopicConfirmMessage from '../messages/new-topic-confirm.message.js';

export default async function (ctx: CallbackQueryContext<CustomContext>) {
  const [action, topicId] = ctx.callbackQuery.data.split(':');

  if (!action || !['publish_topic', 'cancel_topic'].includes(action)) return;

  if (topicId) {
    const topic = await topicService.getTopicById(Number(topicId));
    if (!topic) return;
    if (action === 'cancel_topic') {
      await topicService.deleteTopic(Number(topicId));
      await ctx.deleteMessage();
      await ctx.reply('❌Mavzu berkor qilindi!', {
        reply_markup: botMenuKeyboard('create_topic'),
      });
    } else if (action === 'publish_topic') {
      const chatId = getEnvVariable('TELEGRAM_GROUP_ID');
      await ctx.api.sendMessage(chatId, confirmedTopicMessage(topic), {
        parse_mode: 'HTML',
      });
      await ctx.reply('🎉 Mavzu guruhga yuborildi!', {
        reply_markup: botMenuKeyboard('create_topic'),
      });
      await ctx.editMessageText(newTopicConfirmMessage(topic, true), {
        parse_mode: 'HTML',
      });
    }
    ctx.session.step = null;
  }
}
