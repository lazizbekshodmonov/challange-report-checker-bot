import { InlineKeyboard } from 'grammy';
import getEnvVariable from '../../config/env.js';

export function joinGroupInlineKeyboard() {
  const groupLink = getEnvVariable('TELEGRAM_GROUP_LINK');
  return new InlineKeyboard().url("🚀 Guruhga qo'shilish", groupLink);
}
