import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import jsonwebtoken from "jsonwebtoken"
import { assign } from "radash"

import getSessionCookie from "@/api/utils/getSessionCookie"
import {
  CreatePostSchema,
  SignInApiResponse,
  SignInSchema,
  SignUpSchema,
  UpdateUserSchema,
} from "@/schemas"
import { ApiResponse, Comment, Post, User } from "@/types"
import config from "@/web/config"

const apiClient = <T, R, M = []>(
  method: Method,
  url: string,
  options: AxiosRequestConfig<T>,
) => {
  const jwt =
    typeof window !== "undefined"
      ? localStorage.getItem(config.security.session.cookie.key)
      : getSessionCookie()
  const headers: Record<string, string | null> = { Authorization: jwt }

  /**
   * This hack is used to inject the auth session into the request.
   *
   * It lets us use the same API client for both server and client components.
   */
  if (typeof window === "undefined") {
    headers.Authorization = jwt
      ? (jsonwebtoken.decode(jwt) as { payload: string }).payload
      : null
    headers.Cookie = `${config.security.session.cookie.key}=${jwt}`
  }

  /**
   * We should not use the fuill URL here, but it'll do for now.
   *
   * Relative URL is not supported in server components.
   */
  return axios<T, AxiosResponse<ApiResponse<R extends unknown[] ? R : [R], M>>>(
    `http://localhost:3000/api/${url}`,
    assign(options, { method, headers, withCredentials: true }),
  )
}

export const api = {
  users: {
    signIn: (data: SignInSchema) =>
      apiClient<typeof data, SignInApiResponse>("POST", "users/sessions", {
        data,
      }),
    signUp: (data: SignUpSchema) =>
      apiClient<typeof data, boolean>("POST", "users/sign-up", { data }),
    signOut: () => apiClient<void, boolean>("DELETE", "users/sessions", {}),
    getAll: () => apiClient<void, User[]>("GET", "users", {}),
    update: (userId: string) => (data: UpdateUserSchema) =>
      apiClient<typeof data, boolean>("PATCH", `users/${userId}`, { data }),
  },
  posts: {
    get: (data: { page: number; perPage: number }) =>
      apiClient<typeof data, Post[]>("GET", "posts", { params: data }),
    getById: (id: string) => apiClient<void, Post>("GET", `posts/${id}`, {}),
    create: (data: CreatePostSchema) =>
      apiClient<typeof data, Post>("POST", "posts", { data }),
  },
  comments: {
    getByPostId: (id: string) =>
      apiClient<void, Comment[]>("GET", `posts/${id}/comments`, {}),
    create: (data: { postId: string; content: string }) =>
      apiClient<typeof data, [Comment]>(
        "POST",
        `posts/${data.postId}/comments`,
        { data },
      ),
  },
}
