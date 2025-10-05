import type { User } from '@prisma/client';

export default function (newUser: User) {
  return `Salom <b>${newUser.first_name || ''}</b>! Men <b>Node.js Community</b> telegram guruhida reportlarni nazolat qilaman!`;
}
