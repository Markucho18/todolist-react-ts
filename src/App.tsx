import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import RegisterPage from "./pages/RegisterPage"
import ProtectedPage from "./pages/ProtectedPage"
import UserEditModal from "./components/userEditModal"
import TaskCreateModal from "./components/TaskCreateModal"
import { validateToken } from "./utils/validateToken"
import { fetchUserData } from "./utils/fetchUserData"

const App: React.FC = () => {

  const [tokenIsValid, setTokenIsValid] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const checkToken = async () => {
      const newTokenIsValid =  await validateToken()
      setTokenIsValid(newTokenIsValid)
      if(newTokenIsValid) await fetchUserData()
      setLoading(false)
    }
    checkToken()
  },[])

  const [userEditModal, setUserEditModal] = useState(false)
  const toggleUserEditModal = () => setUserEditModal(prev => !prev)
  
  const [taskCreateModal, setTaskCreateModal] = useState(false)
  const toggleTaskCreateModal = () => setTaskCreateModal(prev => !prev)

  return (
    <div className="flex flex-col bg-blue-200 w-full h-screen">
      {userEditModal && <UserEditModal toggleModal={toggleUserEditModal}/>}
      {taskCreateModal && <TaskCreateModal toggleModal={toggleTaskCreateModal}/> }
      {tokenIsValid && (
        <Header
          toggleTaskCreateModal={toggleTaskCreateModal}
          toggleUserEditModal={toggleUserEditModal}
        />
      ) }
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center size-full bg-white">
          <div className="flex gap-2 items-center">
            <svg className="animate-spin size-8"></svg>
            <span className="text-3xl font-bold">Loading...</span>
          </div>
        </div>
      )}
      <main className="flex w-full h-full">
        {tokenIsValid && <Sidebar setTokenIsValid={setTokenIsValid}/>}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              tokenIsValid
              ? <ProtectedPage/> 
              : <Navigate to="/login"/>
            }></Route>
            <Route path="/login" element={
              tokenIsValid
              ? <Navigate to="/"/>
              : <LoginPage setTokenIsValid={setTokenIsValid}/>
            }></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App