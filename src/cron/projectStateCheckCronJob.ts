import bot from '../bot.js';
import { projectMessageFormatter } from '../utils/message.formatter.js';
import { getProjects } from '../services/project.service.js';
import { chatIds } from '../constants/chatIds.js';

export function projectStateCheckCronJob() {
  setTimeout(async () => {
    try {
      const projects = await getProjects();
      if (projects) {
        for (let i = 0; i < chatIds.length; i++) {
          const chatId = chatIds[i];
          if (chatId) {
            await bot.api.sendMessage(chatId, projectMessageFormatter(projects), {
              parse_mode: 'HTML',
            });
          }
        }
      }
      projectStateCheckCronJob();
    } catch (error) {
      console.log(error);
      projectStateCheckCronJob();
    }
  }, 1000 * 5);
}
