import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import RegisterPage from "./pages/RegisterPage"
import ProtectedPage from "./pages/ProtectedPage"
import UserEditModal from "./components/userEditModal"
import { verifyToken } from "./utils/verifyToken"
import { getToken, removeToken } from "./utils/tokenUtils"
import { clearUserData, getFullUserData } from "./utils/userDataUtils"
import { useUserDataContext } from "./contexts/userDataContext"

const App: React.FC = () => {

  const {
    setToken,
    tokenIsValid, setTokenIsValid,
    setUserData
  } = useUserDataContext()

  const [loading, setLoading] = useState(true)

  const updateToken = async (token: string) =>{
    const newTokenIsValid = await verifyToken(token)
    const newUserData = getFullUserData()
    if (!newTokenIsValid) {
      setToken("");
      removeToken();
      clearUserData()
      setTokenIsValid(false);
    } else {
      setToken(token);
      setTokenIsValid(true);
      setUserData(newUserData)
    }
    setLoading(false); 
  }

  useEffect(()=>{
    const checkToken = async () => {
      const localToken = getToken();
      if (localToken) await updateToken(localToken)
      else setLoading(false)
    }
    checkToken()
    console.log("Se ha re-renderizado App")
  },[])

  const [userEditModal, setUserEditModal] = useState(false)
  const toggleUserEditModal = () => setUserEditModal(prev => !prev)

  return (
    <div className="flex flex-col bg-blue-200 w-full h-screen">
      {userEditModal && <UserEditModal toggleModal={toggleUserEditModal}/>}
      {tokenIsValid && <Header toggleModal={toggleUserEditModal}/> }
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center size-full bg-white">
          <div className="flex gap-2 items-center">
            <svg className="animate-spin size-8"></svg>
            <span className="text-3xl font-bold">Loading...</span>
          </div>
        </div>
      )}
      <main className="flex w-full h-full">
        {tokenIsValid && <Sidebar />}
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
              : <LoginPage
                  updateToken={updateToken}
                />
            }></Route>
            <Route path="/register" element={<RegisterPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App