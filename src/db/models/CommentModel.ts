import BaseModel from "@/db/models/BaseModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"

export default class CommentModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  content: string
  authorId: string
  postId: string

  author: UserModel
  post: PostModel

  static tableName = "comments"

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        filter: (query: PostModel["QueryBuilderType"]) =>
          query.select("id", "username", "role"),
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    }
  }
}
