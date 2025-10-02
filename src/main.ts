import bot from './bot.js';
import { projectStateCheckCronJob } from './cron/projectStateCheckCronJob.js';

bot
  .start()
  .then((response) => {
    console.log('Bot start:', response);
  })
  .catch((error) => {
    console.log('Error:', error);
  });

setTimeout(() => {
  projectStateCheckCronJob();
}, 3000);
