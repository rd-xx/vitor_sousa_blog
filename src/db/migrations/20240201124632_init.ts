import { Knex } from "knex"

export const up = async (db: Knex) => {
  await db.schema.createTable("users", (table) => {
    table.uuid("id").defaultTo(db.fn.uuid()).primary()
    table.timestamps(true, true, true)
    table.timestamp("disabledUntil")
    table.text("email").notNullable().unique()
    table.text("username").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table
      .enum("role", ["USER", "AUTHOR", "ADMIN"], {
        useNative: true,
        enumName: "ROLES",
      })
      .defaultTo("USER")
      .notNullable()
  })

  await db.schema.createTable("posts", (table) => {
    table.uuid("id").defaultTo(db.fn.uuid()).primary()
    table.timestamps(true, true, true)
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.specificType("tags", "text[]").notNullable()
    table.bigint("views").defaultTo(0).notNullable()
    table.uuid("authorId").references("id").inTable("users").notNullable()
  })

  await db.schema.createTable("comments", (table) => {
    table.uuid("id").defaultTo(db.fn.uuid()).primary()
    table.timestamps(true, true, true)
    table.text("content").notNullable()
    table.uuid("authorId").references("id").inTable("users").notNullable()
    table.uuid("postId").references("id").inTable("posts").notNullable()
  })
}

export const down = async (db: Knex) => {
  await db.schema.dropTable("comments")

  await db.schema.dropTable("posts")

  await db.schema.dropTable("users")
  await db.raw('DROP TYPE "ROLES";')
}
