import prisma from '../../config/prisma.js';

class TopicRepository {
  create(content: string) {
    return prisma.topic.create({
      data: {
        title: content,
      },
    });
  }

  delete(id: number) {
    return prisma.topic.delete({ where: { id } });
  }

  findById(id: number) {
    return prisma.topic.findUnique({ where: { id } });
  }

  findLastTopic() {
    return prisma.topic.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  }
}

export default new TopicRepository();
