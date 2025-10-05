import type { Bot, CallbackQueryContext } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import confirmTopicCallback from './confirm-topic.callback.js';
import roleSelectionCallback from './role-selection.callback.js';

export default function registerCallbacks(bot: Bot<CustomContext>) {
  bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;
    console.log(data);
    if (data.startsWith('set_role:')) {
      await roleSelectionCallback(ctx as CallbackQueryContext<CustomContext>);
    } else if (data.startsWith('publish_topic') || data.startsWith('cancel_topic')) {
      await confirmTopicCallback(ctx as CallbackQueryContext<CustomContext>);
    }
  });
}
