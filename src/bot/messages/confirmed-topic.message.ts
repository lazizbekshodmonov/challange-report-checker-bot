import type { Topic } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function (topic: Topic) {
  const formattedDate = dayjs().tz('Asia/Tashkent').format('DD.MM.YYYY');
  return `📌 <b>Yangi mavzu:\n</b> ${topic.title}\n\n` + `#topic_${topic.id} ${formattedDate}\n`;
}
