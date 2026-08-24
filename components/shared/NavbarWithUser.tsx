import { Navbar } from "@/components/shared/Navbar"
import { getMe } from "@/service/getMe"

export async function NavbarWithUser() {
  const user = await getMe()
  return <Navbar user={user} />
}