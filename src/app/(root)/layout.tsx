import { LayoutProps } from "@/types"
import Navbar from "@/web/components/layout/navbar"

const Layout = ({ children }: LayoutProps) => (
  <div className="p-4 md:p-10 xl:p-16 !pt-4">
    <Navbar />
    <main className="mt-8">{children}</main>
  </div>
)

export default Layout
