import BaseModel from "@/db/models/BaseModel"
import CommentModel from "@/db/models/CommentModel"
import PostModel from "@/db/models/PostModel"

export default class UserModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  disabledUntil: Date | null
  email: string
  username: string
  passwordHash: string
  passwordSalt: string
  role: "USER" | "AUTHOR" | "ADMIN"

  posts: PostModel[]
  comments: CommentModel[]

  static tableName = "users"

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: PostModel,
        join: {
          from: "users.id",
          to: "posts.authorId",
        },
      },
      comments: {
        relation: BaseModel.HasManyRelation,
        modelClass: CommentModel,
        join: {
          from: "users.id",
          to: "comments.authorId",
        },
      },
    }
  }
}
