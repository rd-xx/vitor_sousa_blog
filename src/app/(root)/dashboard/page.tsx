import UsersTable from "@/web/components/users/users-table"
import { api } from "@/web/services/api"

const Page = async () => {
  const {
    data: { result: users },
  } = await api.users.getAll()

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-medium">Utilisateurs</h1>
      <UsersTable users={users} />
    </div>
  )
}

export default Page
