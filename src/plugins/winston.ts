import winston from 'winston';
import dayjs from 'dayjs';
import 'winston-daily-rotate-file';

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/bot-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      const formattedTime = dayjs(timestamp as string).format('DD.MM.YYYY, HH:mm:ss');
      return `[${formattedTime}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    dailyRotateFileTransport,
    // new winston.transports.File({ filename: 'logs/bot.log' }),
  ],
});
