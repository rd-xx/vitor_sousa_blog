import { Trash } from "lucide-react"

import { User } from "@/types"
import DeleteUserForm from "@/web/components/forms/users/delete/delete-user-form"
import { Button } from "@/web/components/generics/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/web/components/generics/dialog"

type Props = {
  user: User
}

const DeleteUserDialog = ({ user }: Props) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive" size="icon">
        <Trash size={20} />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{"Supprimer l'utilisateur"}</DialogTitle>
      </DialogHeader>
      <DeleteUserForm user={user} />
      <p>
        Êtes vous sûr de vouloir supprimer{" "}
        <span className="text-primary font-medium">{user.username}</span> ?
        Cette action est irréversible.
      </p>
      <DialogFooter>
        <Button type="submit" variant="destructive" form="delete-user">
          Supprimer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default DeleteUserDialog
