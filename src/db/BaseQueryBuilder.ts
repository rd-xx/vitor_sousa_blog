import { Model, QueryBuilder } from "objection"

// See https://vincit.github.io/objection.js/recipes/custom-query-builder.html#extending-the-query-builder-in-typescript
export default class BaseQueryBuilder<
  M extends Model,
  R = M[],
> extends QueryBuilder<M, R> {}
