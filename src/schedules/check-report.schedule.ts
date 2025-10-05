import schedule from 'node-schedule';
import { logger } from '../config/winston.js';
import reportService from '../modules/report/report.service.js';
import topicService from '../modules/topic/topic.service.js';

const interval = '0 21 * * *';

const intervalEveryFiveSeconds = '*/5 * * * * *';
export function startCheckReportSchedule() {
  schedule.scheduleJob(intervalEveryFiveSeconds, async () => {
    logger.info('Starting report checker job');

    const lastTopic = await topicService.findLastTopic();
    const statistics = await reportService.statByTopic(lastTopic!.id);

    console.log(statistics);

    logger.info('Competed report checker job');
  });
}
