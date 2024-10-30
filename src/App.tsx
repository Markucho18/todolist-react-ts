import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedPage from "./pages/ProtectedPage"
import Header from "./components/Header"
import { verifyToken } from "./utils/verifyToken"
import { getToken, removeToken } from "./utils/tokenUtils"

const App: React.FC = () => {

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

/*   useEffect(() => {
    if (token) updateToken(token)
    console.log("Token: ", token)
  }, [token]); */


  return (
    <div className="bg-blue-200 h-screen w-screen">
      {tokenIsValid && <Header /> }
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center size-full bg-white">
          <div className="flex gap-2 items-center">
            <svg className="animate-spin size-8"></svg>
            <span className="text-3xl font-bold">Loading...</span>
          </div>
        </div>
      )}
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
            : <LoginPage handleToken={setToken} updateToken={updateToken}/>
          }></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App