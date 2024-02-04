import { Pencil } from "lucide-react"

import { Post } from "@/types"
import UpdatePostForm from "@/web/components/forms/posts/update/update-post-form"
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
  post: Post
}

const UpdatePostDialog = ({ post }: Props) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button size="icon">
        <Pencil size={20} />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier le post</DialogTitle>
        <DialogDescription>
          Faites les changements ici. Cliquez sur sauvegarder lorsque vous avez
          terminé.
        </DialogDescription>
      </DialogHeader>
      <UpdatePostForm post={post} />
      <DialogFooter>
        <Button type="submit" form="update-post">
          Sauvegarder
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default UpdatePostDialog
