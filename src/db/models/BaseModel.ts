import { Model } from "objection"

import BaseQueryBuilder from "@/db/BaseQueryBuilder"

// See https://vincit.github.io/objection.js/recipes/custom-query-builder.html#extending-the-query-builder-in-typescript
class BaseModel extends Model {
  QueryBuilderType: BaseQueryBuilder<this>
  static QueryBuilder = BaseQueryBuilder
}

export default BaseModel
