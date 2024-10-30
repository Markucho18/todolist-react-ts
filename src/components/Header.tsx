import SearchBar from "./SearchBar"
import NewTaskButton from "./NewTaskButton"
import { userType } from "../types"
//import { FaTasks } from "react-icons/fa";

interface HeaderProps {
  userData: userType | undefined
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  return(
    <header className="flex items-center justify-center gap-4 w-full bg-zinc-700 px-2 sm:px-8 lg:px-12 py-4">
      {/* <section className="flex gap-2 items-center flex-1">
        <div className="hidden sm:flex justify-center items-center rounded-full border-white border-2 p-2 size-12">
          <FaTasks className="size-full text-white"/>
        </div>
        <div className="hidden lg:flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-white">TodoList-App</h1>
          <p className="text-lg text-white pl-2">by Marcos Sosa</p>
        </div>
      </section> */}
      <section className="flex items-center p-6">
        <div className="size-24 overflow-hidden rounded-full object-cover object-center">
          <img src={userData ? userData.profile_pic : ""} alt="profile_pic"/>
        </div>
      </section>
      <SearchBar />
      <NewTaskButton />
    </header>
  )
}

export default Header