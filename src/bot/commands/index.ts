import type { CustomContext } from '../../types/context.js';
import { Bot } from 'grammy';
import startCommand from './start.command.js';
import logsCommand from './logs.command.js';

export default function registerCommands(bot: Bot<CustomContext>) {
  bot.command('start', startCommand);
  bot.command('logsCommand', logsCommand);
}
