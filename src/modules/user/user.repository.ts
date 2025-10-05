import prisma from '../../config/prisma.js';
import { type ICreateUser, UserRole } from '../../types/user.js';
import type { User } from '@prisma/client';

class UserRepository {
  findByChatId(chatId: number) {
    return prisma.user.findUnique({ where: { chat_id: chatId } });
  }

  create(user: ICreateUser) {
    return prisma.user.create({
      data: user,
    });
  }

  findByRole(role: UserRole) {
    return prisma.user.findMany({ where: { role } });
  }

  update(id: number, user: User) {
    return prisma.user.update({
      where: { id },
      data: user,
    });
  }

  findMany() {
    return prisma.user.findMany();
  }
}

export default new UserRepository();
