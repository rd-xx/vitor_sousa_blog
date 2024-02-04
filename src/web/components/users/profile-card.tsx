import OwnUpdateUserForm from "@/web/components/forms/users/own-update/own-update-user-form"
import { Button } from "@/web/components/generics/button"
import { Card, CardContent, CardFooter } from "@/web/components/generics/card"
import { api } from "@/web/services/api"

const ProfileCard = async () => {
  const {
    data: {
      result: [user],
    },
  } = await api.users.getMe()

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Profil</h1>
      <Card>
        <CardContent>
          <OwnUpdateUserForm user={user} />
        </CardContent>
        <CardFooter className="justify-end">
          <Button form="update-user">Sauvegarder</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfileCard
