import SearchBar from "./SearchBar"
import NewTaskButton from "./NewTaskButton"
import { MdModeEditOutline } from "react-icons/md";
import { useTasksContext } from "../contexts/TasksContext";

interface HeaderProps {
  toggleTaskCreateModal: () => void
  toggleUserEditModal: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleTaskCreateModal, toggleUserEditModal }) => {

  const {tasks} = useTasksContext()

  return(
    <header className="flex items-center justify-center gap-4 w-full bg-zinc-700 px-2 sm:px-8 lg:px-12 pt-2 pb-4">
      <section className="group relative flex flex-1 items-center p-2">
        <div
          onClick={toggleUserEditModal}
          className="peer size-20 overflow-hidden rounded-full object-cover object-center cursor-pointer"
        >
          <img src={localStorage.getItem("profile_pic") ?? ""} alt="profile_pic"/>
        </div>
        <div
          onClick={toggleUserEditModal}
          style={{boxShadow: "0px 0px 3px black"}}
          className="absolute left-16 top-16 opacity-0 peer-hover:opacity-100 hover:opacity-100 flex min-w-max rounded-full select-none bg-[#5FA6A5] hover:bg-[#509190] p-2 transition duration-200 ease-in-out"
        >
          <MdModeEditOutline className="text-white"/>
        </div>
      </section>
      <SearchBar />
      <NewTaskButton
        toggleModal={toggleTaskCreateModal}
      />
      <button onClick={() => console.log(tasks)}>showTasks</button>
    </header>
  )
}

export default Header