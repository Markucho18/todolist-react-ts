import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import RegisterPage from "./pages/RegisterPage"
import ProtectedPage from "./pages/ProtectedPage"
import UserEditModal from "./components/userEditModal"
import { useUserDataContext } from "./contexts/userDataContext"

const App: React.FC = () => {

  const {
    tokenData,
    checkToken,
    updateUserData,
  } = useUserDataContext()

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const validateTokenOnInit = async() => {
      const tokenIsValid = await checkToken()
      console.log("tokenIsValid en app: ", tokenIsValid)
      if(tokenIsValid) updateUserData()
      setLoading(false)
    }
    validateTokenOnInit()
    console.log("Se ha re-renderizado App")
  },[])

  const [userEditModal, setUserEditModal] = useState(false)
  const toggleUserEditModal = () => setUserEditModal(prev => !prev)

  return (
    <div className="flex flex-col bg-blue-200 w-full h-screen">
      {userEditModal && <UserEditModal toggleModal={toggleUserEditModal}/>}
      {tokenData.valid && <Header toggleModal={toggleUserEditModal}/> }
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center size-full bg-white">
          <div className="flex gap-2 items-center">
            <svg className="animate-spin size-8"></svg>
            <span className="text-3xl font-bold">Loading...</span>
          </div>
        </div>
      )}
      <main className="flex w-full h-full">
        {tokenData.valid && <Sidebar />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              tokenData.valid
              ? <ProtectedPage/> 
              : <Navigate to="/login"/>
            }></Route>
            <Route path="/login" element={
              tokenData.valid
              ? <Navigate to="/"/>
              : <LoginPage />
            }></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App