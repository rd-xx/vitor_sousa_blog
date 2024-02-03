import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import { assign } from "radash"

import getSessionCookie from "@/api/utils/getSessionCookie"
import {
  CreatePostSchema,
  SignInApiResponse,
  SignInSchema,
  SignUpSchema,
} from "@/schemas"
import { ApiResponse, Post } from "@/types"
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
  const headers = { Authorization: jwt }

  /**
   * We should not use the fuill URL here, but it'll do for now.
   *
   * Relative URL is not supported in server components.
   */
  return axios<T, AxiosResponse<ApiResponse<R, M>>>(
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
  },
  posts: {
    get: (data: { page: number; perPage: number }) =>
      apiClient<typeof data, Post[]>("GET", "posts", { params: data }),
    create: (data: CreatePostSchema) =>
      apiClient<typeof data, [Post]>("POST", "posts", { data }),
  },
}
