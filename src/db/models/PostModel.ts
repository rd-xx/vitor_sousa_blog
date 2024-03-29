import { Model } from "objection"

import BaseModel from "@/db/models/BaseModel"
import CommentModel from "@/db/models/CommentModel"
import UserModel from "@/db/models/UserModel"

export default class PostModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  content: string
  tags: string[]
  // See https://github.com/knex/knex/issues/387
  views: string
  authorId: string

  author: UserModel
  comments: CommentModel[]

  static tableName = "posts"

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        filter: (query: PostModel["QueryBuilderType"]) =>
          query.select("id", "username", "role"),
        join: {
          from: "posts.authorId",
          to: "users.id",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    }
  }
}
