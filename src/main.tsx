import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { UserDataContextProvider } from "./contexts/userDataContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserDataContextProvider>
    <App />
  </UserDataContextProvider>
)