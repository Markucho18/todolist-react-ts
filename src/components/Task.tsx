import { TaskType } from "../types"

const Task: React.FC<TaskType> = ({task_title, task_deadline, task_priority, task_description}) => {
  return (
    <li className="flex flex-col gap-4 bg-white p-4 rounded-md">
      <p>{task_title}</p>
      <p>{task_deadline}</p>
      <p>{task_priority}</p>
      <p>{task_description}</p>
    </li>
  )
}

export default Task