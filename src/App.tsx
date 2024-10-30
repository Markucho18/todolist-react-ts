import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import RegisterPage from "./pages/RegisterPage"
import ProtectedPage from "./pages/ProtectedPage"
import { verifyToken } from "./utils/verifyToken"
import { getToken, removeToken } from "./utils/tokenUtils"
import { userType } from "./types"

const App: React.FC = () => {

  const [userData, setUserData] = useState<userType | undefined>()
  const [token, setToken] = useState("")
  const [tokenIsValid, setTokenIsValid] = useState(false)
  const [loading, setLoading] = useState(true)

  const updateToken = async (token: string) =>{
    console.log("Se ejecuto updateToken()")
    console.log("Token en updateTOken(): ", token)
    const newTokenIsValid = await verifyToken(token)
    if (!newTokenIsValid) {
      setToken("");
      removeToken();
      setTokenIsValid(false);
    } else {
      setToken(token);
      setTokenIsValid(true);
    }
    setLoading(false); 
  }


  useEffect(()=>{
    const checkToken = async () => {
      const localToken = getToken();
      console.log(localToken);
      if (localToken) await updateToken(localToken)
      else setLoading(false)
    }
    checkToken()
    console.log("Se ha re-renderizado App")
  },[])

  useEffect(() => {
    console.log("userData: ", userData)
  }, [userData]);


  return (
    <div className="flex flex-col bg-blue-200 w-full h-screen">
      {tokenIsValid && <Header userData={userData}/> }
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center size-full bg-white">
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
                  handleToken={setToken}
                  updateToken={updateToken}
                  handleUserData={setUserData}
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