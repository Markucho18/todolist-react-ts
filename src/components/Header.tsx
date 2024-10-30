import SearchBar from "./SearchBar"

const Header: React.FC = () => {
  return(
    <header className="fixed flex items-center w-full bg-zinc-700 px-12 py-4">
      <section className="flex flex-col">
        <h1 className="text-2xl font-semibold text-white">TodoList-App</h1>
        <p className="text-lg text-white pl-2">by Marcos Sosa</p>
      </section>
      <SearchBar />
    </header>
  )
}

export default Header