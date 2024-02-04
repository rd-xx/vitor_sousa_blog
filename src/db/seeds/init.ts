import { pbkdf2, randomBytes } from "crypto"
import { promisify } from "util"
import { faker } from "@faker-js/faker"
import { Knex } from "knex"

/**
 * Copied from src/api/services/user.service.ts
 *
 * Had to copy it to avoid importing it, as I was getting an error while trying to run the seed.
 */
const hashPassword = async (password: string) => {
  const pbkdf2Async = promisify(pbkdf2)
  const salt = randomBytes(128).toString("hex")
  const rawHash = await pbkdf2Async(password, salt, 1_000_000, 256, "sha512")
  const hash = rawHash.toString("hex")

  return { hash, salt }
}

export const seed = async (db: Knex) => {
  // eslint-disable-next-line no-console
  console.log("This will take a while...")

  if (!process.env.SEEDS_RAW_PASSWORD) {
    throw new Error("SEEDS_RAW_PASSWORD environment variable is not set")
  }

  const users = await Promise.all(
    [...new Array(50)].map(async () => {
      const rawPassword = process.env.SEEDS_RAW_PASSWORD!
      const { hash, salt } = await hashPassword(rawPassword)

      return {
        id: faker.string.uuid(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        disabledUntil: faker.datatype.boolean(0.2) ? faker.date.future() : null,
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName(),
        passwordHash: hash,
        passwordSalt: salt,
        role: faker.datatype.boolean(0.4) ? "AUTHOR" : "USER",
      }
    }),
  )
  const posts = [...new Array(100)].map(() => {
    const authors = users.filter((user) => user.role === "AUTHOR")

    return {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      title: faker.lorem.words(5),
      content: faker.lorem.paragraphs(3),
      tags: faker.lorem.words(5).split(" "),
      views: faker.number.int(1000),
      authorId: authors[Math.floor(Math.random() * authors.length)].id,
    }
  })
  const comments = [...new Array(1000)].map(() => ({
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    content: faker.lorem.paragraphs(1),
    authorId: users[Math.floor(Math.random() * users.length)].id,
    postId: posts[Math.floor(Math.random() * posts.length)].id,
  }))

  // Deletes ALL existing entries
  await db("comments").del()
  await db("posts").del()
  await db("users").del()

  // Inserts seed entries
  await db("users").insert(users)
  await db("posts").insert(posts)
  await db("comments").insert(comments)
}
