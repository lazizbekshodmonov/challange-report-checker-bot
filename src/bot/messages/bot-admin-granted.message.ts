import type { User } from '@prisma/client';

export default function (user: User) {
  return (
    `🎉 Tabriklayman ${user.first_name}!\n\n` +
    `Sizga <b>ADMIN huquqi</b> berildi. Endi siz botga qo'shilgan foydalanuvchilarni va mavzularni boshqarishingiz mumkin.`
  );
}
