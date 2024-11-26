import { useState, useEffect } from "react"
import Task from "./Task"
import { TaskType } from "../types"

const TasksTomorrow: React.FC = () => {

  const [tasks, setTasks] = useState<TaskType[]>([])

  const getTasks = async () => {
    try{
      const response = await fetch("http://localhost:3000/tasks/tomorrow", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      if(!response.ok) throw new Error(data.message)
      alert(data.message)
      setTasks(data.results)
    } catch(error){
      if(error instanceof Error) console.log(error.message)
      else console.log("Server error", error)
    }
  }

  useEffect(()=>{
    getTasks()
  },[])

  return (
    <ul className="flex flex-col gap-4">
      {tasks.length > 0 && tasks.map((task, i) => (
        <Task
          key={i}
          task_id={task.task_id}
          task_title={task.task_title}
          task_deadline={task.task_deadline}
          task_priority={task.task_priority}
          task_description={task.task_description}
        />
      )) }
    </ul>
  )
}

export default TasksTomorrow