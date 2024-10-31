import { FaInbox } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { IoArrowRedoSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Sidebar: React.FC = () => {

  return(
    <aside className="flex flex-col w-[80px] md:w-[200px] divide-y-2 divide-zinc-500 bg-zinc-600 text-white cursor-pointer select-none transition-all duration-200 ease-in-out">
      <section className="flex items-center gap-3 pl-6 md:px-6 py-6 hover:bg-zinc-500 hover:pl-7 transition-all duration-200 ease-in-out">
        <FaInbox className="size-6"/>
        <p className="text-lg hidden md:flex">No date</p>
      </section>
      <section className="flex items-center gap-3 pl-6 md:px-6 py-6 hover:bg-zinc-500 hover:pl-7 transition-all duration-200 ease-in-out">
        <FaTasks className="size-6"/>
        <p className="text-lg hidden md:flex">Today</p>
      </section>
      <section className="flex items-center gap-3 pl-6 md:px-6 py-6 hover:bg-zinc-500 hover:pl-7 transition-all duration-200 ease-in-out">
        <IoArrowRedoSharp className="size-6"/>
        <p className="text-lg hidden md:flex">Tomorrow</p>
      </section>
      <section className="flex items-center gap-3 pl-6 md:px-6 py-6 hover:bg-zinc-500 hover:pl-7 transition-all duration-200 ease-in-out">
        <FaCalendarAlt className="size-6"/>
        <p className="text-lg hidden md:flex">Calendar</p>
      </section>
      <section className="flex items-center gap-3 pl-6 md:px-6 py-6 hover:bg-zinc-500 hover:pl-7 transition-all duration-200 ease-in-out">
        <MdDelete className="size-6"/>
        <p className="text-lg hidden md:flex">Recycle bin</p>
      </section>
    </aside>
  ) 
}

export default Sidebar