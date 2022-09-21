import dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: process.env.SERVER_PORT || process.env.PORT || 3000,
}