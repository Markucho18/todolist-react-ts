import { useEffect, useReducer, useState } from "react"

type TaskId = `${string}-${string}-${string}-${string}-${string}`

interface Task{
  id: TaskId
  completed: boolean
  title: string
}

type Action = 
  | { type: "CREATE_TASK"; payload: { title: string}}
  | { type: "TOGGLE_TASK"; payload: { id: TaskId } }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: { id: TaskId } }
  | { type: "FILTER_BY_SEARCH"; payload: {searchQuery: string} }

type sortType = "titleAsc" | "titleDes"

interface Filters {
  sortBy: sortType
  searchQuery: string
  lengthRange: number
}

const UseReducerTest: React.FC = () => {

  const tasksReducer = (state: Task[], action: Action): Task[] | [] => {
    switch(action.type){
      case "CREATE_TASK": {
        return [...state, {
          id: crypto.randomUUID(),
          completed: false,
          title: action.payload.title
        }]
      }
      case "TOGGLE_TASK": {
        const newState = state.map(task =>{
          return task.id === action.payload.id ? {...task, completed: !task.completed} : task
        })
        return newState
      }
      case "EDIT_TASK": {
        const newState = state.map(task => {
          return task.id === action.payload.id ? action.payload : task
        })
        return newState
      }
      case "DELETE_TASK": {
        return state.filter(task => task.id !== action.payload.id)
      }
      default: {
        return state
      }
    }
  }

  const [tasks, tasksDispatch] = useReducer(tasksReducer, [])

  const createTask = (title: string) => tasksDispatch({type: "CREATE_TASK", payload: {title}})

  const toggleTask = (id: TaskId) => tasksDispatch({type: "TOGGLE_TASK", payload: {id}})

  const editTask = (data: Task) => tasksDispatch({type: "EDIT_TASK", payload: data}) 

  const deleteTask = (id: TaskId) => tasksDispatch({type: "DELETE_TASK", payload: {id}})  

  const [formTitle, setFormTitle] = useState("")

  const [editable, setEditable] = useState<{id: TaskId | "", title: string}>({
    id: "",
    title: ""
  })

/*   const filteredTasksReducer = (state: Task[], action: FiltersAction): Task[] => {
    switch(action.type){
      case "FILTER_BY_SEARCH": {
        return action.payload.searchQuery.length > 0
          ? tasks.filter(task => task.title.includes(action.payload.searchQuery))
          : tasks
      }
      default: {
        return state
      }
    }
  } */

  const [filteredTasks, setFilteredTasks] = useState<Task[] | []>(tasks)

  const sortOperations = {
    "titleAsc": (state: Task[]) => {
      return state.sort((a, b)=> a.title.localeCompare(b.title))
    },
    "titleDes": (state: Task[]) => {
      return state.sort((a, b)=> b.title.localeCompare(a.title))
    },
  }

  const filterTasks = (state: Task[], query: string, range: number) => {
    return state.filter(task => {
      return task.title.toLowerCase().includes(query.toLowerCase())
      && task.title.length > range
    }) 
  }

  const updateTasks = (state: Task[]) => {
    const sortedTasks = sortOperations[filters.sortBy](state)
    const newFilteredTasks = filterTasks(sortedTasks, filters.searchQuery, filters.lengthRange)
    console.log({sortedTasks, newFilteredTasks})
    return newFilteredTasks
  }

  const [filters, setFilters] = useState<Filters>({
    sortBy: "titleAsc",
    searchQuery: "",
    lengthRange: 0
  })

  return (
    <div className="flex flex-col items-center w-full">
      <header className="flex gap-2 justify-between items-center w-full p-4">
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault()
            if(formTitle.length > 0){
              createTask(formTitle)
              setFormTitle("")
            }
          }}
        >
          <input
            className="w-[300px]"
            type="text"
            maxLength={40}
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <button
            className="bg-black/20 hover:bg-black/40 hover:text-white px-4 py-1 rounded-md"
            type="submit"
          >
            CREATE TASK
          </button>
        </form>
        <aside>
          <input
            placeholder="Search a task..."
            className="w-[300px]"
            type="text"
            maxLength={40}
            value={filters.searchQuery}
            onChange={(e) => {
              setFilters(prev => {
                return {...prev, searchQuery: e.target.value}
              })
            }}
          />
          <label>
            {filters.lengthRange}
            <input
              type="range"
              max={40}
              value={filters.lengthRange}
              onChange={(e) => {
                setFilters(prev => {
                  return {...prev, lengthRange: parseInt(e.target.value)}
                })
              }}
            />
          </label>
        </aside>
        <select
          value={filters.sortBy}
          onChange={(e) => {
            setFilters(prev => {
              return {...prev, sortBy: e.target.value as sortType}
            })
          }}
        >
          <option value="titleAsc">Title A - Z</option>
          <option value="titleDes">Title Z - A</option>
        </select>
      </header>
      <div className="flex flex-col gap-4 py-2 px-4">
        {updateTasks(tasks).map((task, i)=>(
          <div
            className="bg-white rounded-md p-4 flex gap-2 justify-between items-center w-[600px]"
            key={i}
          >
            <div className="flex gap-2 items-center flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {task.id === editable.id
                ? (
                  <input
                    className="border-black border-2 w-full"
                    type="text"
                    value={editable.title}
                    onChange={(e) =>{
                      setEditable(prev => {
                        return {...prev, title: e.target.value}
                      })
                    }}
                  />
                )
                : (
                  <span className="truncate">{task.title}</span>
                )
              }
              </div>
            <div className="flex gap-2 items-center">
              <button
                className="bg-black/20 hover:bg-black/40 hover:text-white px-4 py-1 rounded-md"
                onClick={() => {
                  if(task.id === editable.id){
                    const {id, completed} = task
                    editTask({id, completed, title: editable.title})
                    setEditable({id: "", title: ""})
                  }
                  else{
                    setEditable({id: task.id, title: task.title})
                  }
                }}
              >
                {task.id === editable.id
                  ? "SAVE"
                  : "EDIT"
                }
              </button>
              <button
                className="bg-black/20 hover:bg-black/40 hover:text-white px-4 py-1 rounded-md"
                onClick={() => deleteTask(task.id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) 
}

export default UseReducerTest