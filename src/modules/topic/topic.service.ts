import topicRepository from './topic.repository.js';

class TopicService {
  createTopic(content: string) {
    return topicRepository.create(content);
  }

  deleteTopic(topicId: number) {
    return topicRepository.delete(topicId);
  }

  getTopicById(topicId: number) {
    return topicRepository.findById(topicId);
  }

  findLastTopic() {
    return topicRepository.findLastTopic();
  }
}

export default new TopicService();
