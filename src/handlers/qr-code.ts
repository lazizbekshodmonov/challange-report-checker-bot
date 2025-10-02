import type { NextFunction } from 'grammy';
import { InputFile } from 'grammy';
import type { CustomContext } from '../types/context.js';
import QRCode from 'qrcode';

export async function handleText(ctx: CustomContext, next: NextFunction) {
  const text = ctx.message?.text?.trim();
  if (!text) return;
  try {
    const png = await QRCode.toBuffer(text, {
      type: 'png',
      width: 350,
      margin: 5,
      errorCorrectionLevel: 'M',
    });
    await ctx.replyWithPhoto(new InputFile(png, 'qr.png'), {
      caption: `Text: ${text}`,
    });
  } catch (error) {
    await ctx.reply('QR generatsiyada xatolik yuz berdi.');

    throw error;
  }
}
