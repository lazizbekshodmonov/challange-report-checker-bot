import bot from './bot/index.js';
import { startCheckReportSchedule } from './schedules/check-report.schedule.js';

bot.start();
startCheckReportSchedule();
