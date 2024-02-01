import { z } from "zod"

const schema = z.object({
  // SECURITY_JWT_SECRET="secret"
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // Database
  DATABASE_URL: z.string().url().startsWith("postgres://"),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.coerce.number(),
  SEEDS_RAW_PASSWORD: z.string(),

  // Authentication
  SECURITY_JWT_SECRET: z.string(),
})
const env = schema.parse({
  NODE_ENV: process.env.NODE_ENV,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PORT: process.env.DATABASE_PORT,
  SEEDS_RAW_PASSWORD: process.env.SEEDS_RAW_PASSWORD,

  // Authentication
  SECURITY_JWT_SECRET: process.env.SECURITY_JWT_SECRET,
})

export default env
