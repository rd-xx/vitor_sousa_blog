import { config } from "dotenv"
import { Knex } from "knex"

config()

const knexfile = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./src/db/migrations",
    stub: "./src/db/migration.stub",
    loadExtensions: [".ts"],
  },
  seeds: {
    directory: "./src/db/seeds",
    loadExtensions: [".ts"],
  },
} satisfies Knex.Config

export default knexfile
