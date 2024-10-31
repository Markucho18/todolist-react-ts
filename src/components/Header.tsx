import SearchBar from "./SearchBar"
import NewTaskButton from "./NewTaskButton"
import { useUserDataContext } from "../contexts/userDataContext"
import { MdModeEditOutline } from "react-icons/md";

interface HeaderProps {
  toggleModal: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleModal }) => {

  const { userData } = useUserDataContext()

  return(
    <header className="flex items-center justify-center gap-4 w-full bg-zinc-700 px-2 sm:px-8 lg:px-12 pt-2 pb-4">
      <section className="group relative flex flex-1 items-center p-2">
        <div
          onClick={toggleModal}
          className="peer size-20 overflow-hidden rounded-full object-cover object-center cursor-pointer"
        >
          <img src={userData.profile_pic ? userData.profile_pic : ""} alt="profile_pic"/>
        </div>
        <div
          onClick={toggleModal}
          style={{boxShadow: "0px 0px 3px black"}}
          className="absolute left-16 top-16 opacity-0 peer-hover:opacity-100 hover:opacity-100 flex min-w-max rounded-full select-none bg-[#5FA6A5] hover:bg-[#509190] p-2 transition duration-200 ease-in-out"
        >
          <MdModeEditOutline className="text-white"/>
        </div>
      </section>
      <SearchBar />
      <NewTaskButton />
    </header>
  )
}

export default Header