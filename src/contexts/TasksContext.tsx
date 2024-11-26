import {createContext, useContext, useEffect, useReducer} from "react"
import { TaskType } from "../types"

interface TasksContext{
  tasks: TaskType[]
  setTasks: () => void
  addTask: (taskData: TaskType) => void
}

interface TasksContextProviderProps{
  children: React.ReactNode
}

type ReducerAction = 
  | {type: "SET_TASKS", payload: TaskType[]}
  | {type: "ADD_TASK", payload: TaskType}

type TasksReducer = (state: TaskType[] | [], action: ReducerAction) => TaskType[] | []

const TasksContext = createContext<TasksContext | null>(null)

export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({children}) => {

  /* const initialState = {
    all: [],
    inbox: [],
    today: [],
    tomorrow: [],
    week: [],
    month: [],
    deleted: [],
  }
 */
  const tasksReducer: TasksReducer = (state, action) => {
    switch(action.type){
      case 'SET_TASKS':
        return action.payload
      case 'ADD_TASK': 
        return [...state, action.payload]
      default:
        return state
    }
  }

  const [tasks, dispatch] = useReducer(tasksReducer, [])

  const setTasks = async () =>{
    try{
      const response = await fetch("http://localhost:3000/tasks",{
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      if(!response.ok) throw new Error("Server error")
      const tasks = data.rows
      dispatch({type: "SET_TASKS", payload: tasks})
    } catch(error){
      if(error instanceof Error) console.log(error.message)
      else console.log(error)
    }
  }

  const addTask = (taskData: TaskType) => dispatch({type: "ADD_TASK", payload: taskData})

  useEffect(()=>{
    console.log({tasks})
  },[tasks])

  return (
    <TasksContext.Provider value={{
      tasks,
      setTasks,
      addTask
    }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasksContext = () => {
  const context = useContext(TasksContext)
  if(!context){
    throw new Error("TasksContext must be used inside its provider")
  }
  return context
}