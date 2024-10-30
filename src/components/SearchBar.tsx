import { useState } from "react"
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {

  const [searchText, setSearchText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Se envio la busqueda")
  }

  return(
    <form
      className="flex gap-1 w-[600px] items-center bg-white rounded-lg overflow-hidden"
      onSubmit={handleSubmit}
    >
      <label className="w-full">
        <input
          className="w-full py-3 px-4 focus:outline-none"
          placeholder="Search a task..."
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </label>
      <button
        className="opacity-70 hover:opacity-100 px-2"
        type="submit"
      >
        <FaSearch className="size-5 text-black"/>
      </button>
    </form>
  )
}

export default SearchBar