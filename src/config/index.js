import dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: process.env.SERVER_PORT || process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS,
  }
}