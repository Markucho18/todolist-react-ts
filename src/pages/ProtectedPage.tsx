import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

interface ProtectedPageProps{
  isAuthenticated: boolean
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ isAuthenticated}) => {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login")
    }
  },[isAuthenticated])

  return (
    <div>
      Pagina protegida(?) xdddd
    </div>
  )
}

export default ProtectedPage