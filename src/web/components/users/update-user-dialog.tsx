import { Pencil } from "lucide-react"

import { User } from "@/types"
import UpdateUserForm from "@/web/components/forms/users/update/update-user-form"
import { Button } from "@/web/components/generics/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/web/components/generics/dialog"

type Props = {
  user: User
}

const UpdateUserDialog = ({ user }: Props) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button size="icon">
        <Pencil size={20} />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{"Modifier l'utilisateur"}</DialogTitle>
        <DialogDescription>
          Faites les changements ici. Cliquez sur sauvegarder lorsque vous avez
          terminé.
        </DialogDescription>
      </DialogHeader>
      <UpdateUserForm user={user} />
      <DialogFooter>
        <Button type="submit" form="update-user">
          Sauvegarder
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default UpdateUserDialog
