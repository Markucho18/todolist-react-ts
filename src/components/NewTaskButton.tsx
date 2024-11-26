import { FaPlus } from "react-icons/fa";

interface NewTaskButtonProps{
  toggleModal: () => void
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({toggleModal}) => {

  return(
    <div className="relative flex-1 flex justify-end">
      <button
        style={{boxShadow: "0px 0px 3px black"}}
        className="group peer size-12 p-1 bg-[#5FA6A5] hover:bg-[#509190] rounded-lg transition-all duration-200 ease-in-out hover:scale-110"
        onClick={toggleModal}
      >
        <FaPlus className="size-full text-zinc-100 group-hover:text-white"/>
      </button>
      <div
        style={{boxShadow: "0px 0px 3px black", transitionDelay: "500ms"}}
        className="absolute top-14 opacity-0 peer-hover:opacity-100 right-8 flex min-w-max rounded-md select-none bg-zinc-700 p-2 transition duration-200 ease-in-out"
      >
        <p className="text-white text-lg">Create new task</p>
      </div>
    </div>
  )
}

export default NewTaskButton