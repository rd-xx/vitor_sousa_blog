import Link from "next/link"

import { LayoutProps } from "@/types"

const Layout = ({ children }: LayoutProps) => (
  <main className="flex flex-col h-dvh items-center justify-center gap-12">
    <Link
      className="text-4xl font-bold hover:scale-105 transition-transform"
      href="/"
    >
      Kool
    </Link>
    <div className="max-w-2xl w-full">{children}</div>
  </main>
)

export default Layout
