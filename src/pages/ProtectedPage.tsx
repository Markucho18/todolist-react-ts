import { useNavigate } from "react-router-dom"

interface ProtectedPageProps{
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ }) => {

  const navigate = useNavigate()

  return (
    <div>
      Pagina protegida(?) xdddd
    </div>
  )
}

export default ProtectedPage