import { useState } from "react"
import { FaFlag } from "react-icons/fa";
import { useTasksContext } from "../contexts/TasksContext";
import { TaskType } from "../types";
import { getUserId } from "../utils/userDataUtils";

interface TaskCreateModalProps{
  toggleModal: () => void
}

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({toggleModal}) => {

  const { tasks, addTask } = useTasksContext()

  const [formData, setFormData] = useState({
    task_title: "",
    task_deadline: "",
    task_priority: 4,
    task_description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const {name, value} = e.target
    if(name === "task_priority") setCurrentColor(priorityColors[parseInt(value) - 1])
    setFormData(prev => {
      return {
        ...prev,
        [name]: name === "task_priority" ? parseInt(value) : value
      }
    })
  }

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user_id = getUserId()
    if(formData.task_title.length < 5) setError("Task title can't be empty or short")
    try{
      const response = await fetch("http://localhost:3000/tasks/create-task",{
        method: "POST",
        credentials: "include",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if(!response.ok) throw new Error(data.message)
      const task_id = data.result[0].insertId
      const newTask = {...formData, user_id, task_id}
      addTask(newTask)
      setError("")
      alert(data.message)
      toggleModal()
    } catch(error){
      if(error instanceof Error) console.log(error.message)
      else console.log("Server error", error)
    }
  }

  const priorityColors = ["text-red-600", "text-orange-500", "text-yellow-500", "text-blue-300"]

  const [currentColor, setCurrentColor] = useState(priorityColors[formData.task_priority - 1])
  

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
      onDoubleClick={toggleModal}
    >
      <form
        className="flex flex-col gap-4 py-8 md:py-12 px-6 md:px-8  rounded-md bg-white w-[400px] md:w-[500px]"
        onDoubleClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <main className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-lg justify-between">Title:
            <input
              style={{boxShadow: "0px 0px 2px black"}}
              className="rounded-md p-2 focus:outline-none w-[80%] pl-auto"
              type="text"
              required
              maxLength={50}
              name="task_title"
              value={formData.task_title}
              onChange={handleChange}
              />
          </label>
          <label className="flex items-center gap-2 text-lg justify-between">Date:
            <input
              style={{boxShadow: "0px 0px 2px black"}}
              className="rounded-md p-2 focus:outline-none w-[80%] pl-auto"
              type="date"
              name="task_deadline"
              value={formData.task_deadline}
              onChange={handleChange}
              />
          </label>
          <label className="flex items-center gap-2 text-lg justify-between">
            <span className="flex gap-1 items-center">
              Priority
              <FaFlag className={`${currentColor}`}/>
            </span>

            <input
              type="number"
              style={{boxShadow: "0px 0px 2px black"}}
              className="rounded-md p-2 focus:outline-none w-[80%] pl-auto"
              min={1}
              max={4}
              name="task_priority"
              value={formData.task_priority}
              onChange={handleChange}
              />
          </label>
          <label className="flex flex-col gap-2 text-lg">Description:
            <textarea
              style={{resize: "none", boxShadow: "0px 0px 2px black" }}
              className="w-full text-md text-slate-700/80 rounded-md p-2 focus:outline-none h-40"
              maxLength={150}
              name="task_description"
              value={formData.task_description}
              onChange={handleChange}
              ></textarea>
          </label>
        </main>
        <footer className="flex justify-end gap-2">
          <button
            type="button"
            onClick={toggleModal}
            className="bg-[#5FA6A5] hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#5FA6A5] hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  )
}

export default TaskCreateModal