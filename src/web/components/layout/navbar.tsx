import NavbarActions from "@/web/components/layout/navbar-actions"

const Navbar = () => (
  <header className="sticky top-4 z-50 px-4 py-1.5 rounded-xl h-14 border bg-background/95 backdrop-blur flex items-center gap-8">
    <h3 className="text-2xl font-medium">Kool</h3>
    <div className="bg-red-200 w-full flex justify-between items-center">
      <nav className="">
        <p>Posts</p>
      </nav>
      <NavbarActions />
    </div>
  </header>
)

export default Navbar
