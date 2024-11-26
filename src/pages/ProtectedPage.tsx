import TasksTomorrow from "../components/TasksTomorrow"

interface ProtectedPageProps{
  currentTasks: string
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ currentTasks }) => {



  return (
    <div>
      {currentTasks === "tomorrow" && <TasksTomorrow /> }
    </div>
  )
}

export default ProtectedPage