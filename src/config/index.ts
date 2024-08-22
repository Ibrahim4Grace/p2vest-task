import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT ?? 8000,
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL,
  'api-prefix': 'api/v1',
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  TOKEN_SECRET: process.env.AUTH_SECRET,
  TOKEN_EXPIRY: process.env.AUTH_EXPIRY,
};

export default config;
