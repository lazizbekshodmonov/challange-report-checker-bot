import userRepository from '../user/user.repository.js';
import topicRepository from '../topic/topic.repository.js';
import reportRepository from './report.repository.js';

class ReportService {
  async createReport(content: string, chatId: number, topicId: number) {
    const user = await userRepository.findByChatId(chatId);
    const topic = await topicRepository.findById(topicId);
    if (!topic || !user) return;
    return reportRepository.create(content, user, topic);
  }

  async statByTopic(topicId: number) {
    const reports = await reportRepository.findByTopicId(topicId);
    const allUsers = await userRepository.findMany();

    const reportedUserIds = reports.map((report) => report.user_id);

    const reportedUsers = allUsers.filter((user) => reportedUserIds.includes(user.id));
    const nonReportedUsers = allUsers.filter((user) => !reportedUserIds.includes(user.id));

    return {
      reportedUsers,
      nonReportedUsers,
    };
  }
}

export default new ReportService();
