import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  node_env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  base_url: process.env.BASE_URL,
  origin_url: process.env.ORIGIN_URL,
}
