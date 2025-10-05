import { Bot } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import chatMemberStatusChangeHandler from './chat-member-status-change.handler.js';
import { handleCreateTopicEvent, handleCreateTopicText } from './handle-create-topic.js';
import reportMessageHandler from './report-message.handler.js';
import { adminRequireMiddleware } from '../middlewares/admin-require.middleware.js';

export default function registerHandlers(bot: Bot<CustomContext>) {
  bot.on('my_chat_member', chatMemberStatusChangeHandler);

  // Create topic handlers
  bot.hears("Mavzu qo'shish", adminRequireMiddleware, handleCreateTopicEvent);
  bot.on('message:text', adminRequireMiddleware, handleCreateTopicText);

  // Catch reports
  bot.on('message:text', reportMessageHandler);
}
