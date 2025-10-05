import { InlineKeyboard } from 'grammy';
import type { Topic } from '@prisma/client';

export default function (topic: Topic) {
  return new InlineKeyboard()
    .text('✅ Guruhga yuborish', `publish_topic:${topic.id}`)
    .text('❌ Bekor qilish', `cancel_topic:${topic.id}`);
}
