import { Knex } from "knex"

export const up = async (db: Knex) => {
  await db.schema.alterTable("comments", (table) => {
    table.dropForeign(["authorId"])
    table
      .foreign("authorId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")

    table.dropForeign(["postId"])
    table
      .foreign("postId")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
  })

  await db.schema.alterTable("posts", (table) => {
    table.dropForeign(["authorId"])
    table
      .foreign("authorId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
  })
}

export const down = async (db: Knex) => {
  await db.schema.alterTable("comments", (table) => {
    table.dropForeign(["authorId"])
    table.foreign("authorId").references("id").inTable("users")

    table.dropForeign(["postId"])
    table.foreign("postId").references("id").inTable("posts")
  })

  await db.schema.alterTable("posts", (table) => {
    table.dropForeign(["authorId"])
    table.foreign("authorId").references("id").inTable("users")
  })
}
