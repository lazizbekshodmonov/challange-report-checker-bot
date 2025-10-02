import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const envConfig = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  API_URL: process.env.API_URL ?? '',
  PORT: Number(process.env.PORT ?? 3000),
  REDIS_URL: process.env.REDIS_URL ?? '',
};

export default envConfig;
