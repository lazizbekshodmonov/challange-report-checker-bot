import type { User } from '@prisma/client';

export default function (user: User) {
  return `${user.first_name} afsuski sizdan <b>ADMIN huquqi</b> olib tashlandi.`;
}
