import dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: process.env.SERVER_PORT || 3000,
}