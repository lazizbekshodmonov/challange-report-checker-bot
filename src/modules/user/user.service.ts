import { type ITelegramUser, UserRole } from '../../types/user.js';
import userRepository from './user.repository.js';

class UserService {
  async registerUser(
    user: ITelegramUser,
    role: UserRole = UserRole.USER,
    isChatMember: boolean = false
  ) {
    const exitingUser = await userRepository.findByChatId(user.id);
    if (exitingUser) throw new Error('User already exists');

    return userRepository.create({
      chat_id: user.id,
      username: user.username ?? null,
      first_name: user.first_name,
      last_name: user.last_name ?? null,
      is_chat_member: isChatMember,
      missed_count: 0,
      role: role,
      joined_at: new Date(),
    });
  }

  getAdmins() {
    return userRepository.findByRole(UserRole.ADMIN);
  }

  async updateUserRoleByChatId(chatId: number, role: UserRole) {
    const user = await userRepository.findByChatId(chatId);
    if (!user) return null;
    return userRepository.update(user.id, {
      ...user,
      role,
    });
  }

  findByChatId(chatId: number) {
    return userRepository.findByChatId(chatId);
  }
}

export default new UserService();
