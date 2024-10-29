import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedPage from "./pages/ProtectedPage"

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="bg-blue-200 h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage isAuthenticated={isAuthenticated}/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App