import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import { assign } from "radash"

import { SignInApiResponse, SignInSchema, SignUpSchema } from "@/schemas"
import { ApiResponse } from "@/types"
import config from "@/web/config"

const apiClient = <T, R, M = []>(
  method: Method,
  url: string,
  options: AxiosRequestConfig<T>,
) => {
  const jwt = localStorage.getItem(config.security.session.cookie.key)
  const headers = { Authorization: jwt }

  return axios<T, AxiosResponse<ApiResponse<R, M>>>(
    `/api/${url}`,
    assign(options, { method, headers }),
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
  },
}
