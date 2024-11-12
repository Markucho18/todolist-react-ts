import { useState } from "react"

interface TaskCreateModalProps{
  toggleModal: () => void
}

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({toggleModal}) => {

  const [formData, setFormData] = useState({
    task_title: "",
    task_deadline: "",
    task_priority: "",
    task_description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const [error, setError] = useState("")

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
      onDoubleClick={toggleModal}
    >
      <form
        className="p-12 bg-white"
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <header></header>
        <main></main>
        <footer className="flex gap-2">
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