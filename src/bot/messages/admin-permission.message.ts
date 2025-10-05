export function adminPermissionMessage(ownerUsername?: string, ownerId?: number): string {
  const ownerMention = ownerUsername
    ? `<a href="https://t.me/${ownerUsername}">${ownerUsername}</a>`
    : `<a href="tg://user?id=${ownerId}">Admin</a>`;

  return `
<b>Salom ${ownerMention}!</b>

Reportlarni nazorat qilishim uchun menga <b>admin huquqini</b> berishingiz kerak.

Rahmat! 🙏
`;
}
