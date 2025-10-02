import { Bot, BotError, MemorySessionStorage, session } from 'grammy';
import { Redis } from 'ioredis';
import { RedisAdapter } from '@grammyjs/storage-redis';

import envConfig from './env.config.js';
import { logBotError, loggerMiddleware } from './middlewares/logger.middleware.js';
import { logsCommandMiddleware, startCommandMiddleware } from './middlewares/command.middleware.js';

import type { SessionData } from './types/session.js';
import type { CustomContext } from './types/context.js';
import { handleText } from './handlers/qr-code.js';
import { statisticsButtonHandler } from './enums/statistics.js';

const { TELEGRAM_BOT_TOKEN, REDIS_URL, NODE_ENV } = envConfig;

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN must be provided!');
}
if (NODE_ENV === 'production' && !REDIS_URL) {
  throw new Error('REDIS_URL must be provided!');
}
const store =
  NODE_ENV === 'production'
    ? new RedisAdapter<SessionData>({ instance: new Redis(REDIS_URL) })
    : new MemorySessionStorage<SessionData>();

const bot = new Bot<CustomContext>(TELEGRAM_BOT_TOKEN);

function initialSession(): SessionData {
  return {
    step: null,
  };
}

bot.use(loggerMiddleware);

bot.use(session({ initial: initialSession, storage: store }));

bot.command('start', startCommandMiddleware);
bot.command('logs', logsCommandMiddleware);

bot.hears('📊 Statistikani olish', statisticsButtonHandler);

bot.catch(async (err: BotError<CustomContext>) => {
  await logBotError(err);
});

export default bot;
