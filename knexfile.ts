import { config } from "dotenv"
import { Knex } from "knex"

config()

const knexfile = {
  client: "pg",
  debug: process.env.NODE_ENV !== "production",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./src/db/migrations",
    loadExtensions: [".ts"],
  },
  seeds: {
    directory: "./src/db/seeds",
    loadExtensions: [".ts"],
  },
} satisfies Knex.Config

export default knexfile
