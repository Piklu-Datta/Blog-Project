import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_sault_round: process.env.BCRYPT_SALT_ROUND,
  database_url: process.env.DATABASE_URL,
  jwt_excess_secret: process.env.JWT_EXCESS_SECRET,
  jwt_excess_expireiIn: process.env.JWT_EXCESS_EXPIREIN,
};
