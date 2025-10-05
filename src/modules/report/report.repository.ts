import type { Topic, User } from '@prisma/client';
import prisma from '../../config/prisma.js';

class ReportRepository {
  create(content: string, user: User, topic: Topic) {
    return prisma.report.create({
      data: {
        content,
        user: {
          connect: { id: user.id },
        },
        topic: {
          connect: { id: topic.id },
        },
      },
    });
  }

  countByTopicId(topicId: number) {
    return prisma.report.count({
      where: {
        topic_id: topicId,
      },
    });
  }

  findByTopicId(topicId: number) {
    return prisma.report.findMany({ where: { topic_id: topicId } });
  }
}

export default new ReportRepository();
