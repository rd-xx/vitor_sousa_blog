import Navbar from "@/components/layout/navbar"
import { LayoutProps } from "@/lib/types"

const Layout = ({ children }: LayoutProps) => (
  <div className="px-4 md:px-10 xl:px-16 ">
    <Navbar />
    <main>{children}</main>
  </div>
)

export default Layout
