export type Role = "USER" | "AUTHOR" | "ADMIN"

export type MinimalUser = {
  id: string
  username: string
  role: Role
}
