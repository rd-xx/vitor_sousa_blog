import { User } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/web/components/generics/table"
import DeleteUserDialog from "@/web/components/users/delete-user-dialog"
import UpdateUserDialog from "@/web/components/users/update-user-dialog"

type Props = {
  users: User[]
}

const UsersTable = ({ users }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>E-mail</TableHead>
        <TableHead>{"Nom d'utilisateur"}</TableHead>
        <TableHead>Rôle</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell className="flex gap-2">
            <UpdateUserDialog user={user} />
            <DeleteUserDialog user={user} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default UsersTable
