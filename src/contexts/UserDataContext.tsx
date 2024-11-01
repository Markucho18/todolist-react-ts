import { createContext, useContext, useEffect, useState } from "react";
import { userType } from "../types";
//import { verifyToken, removeToken } from "../utils/verifyToken";
//import { getFullUserData, clearUserData } from "../utils/userDataUtils";

interface UserDataContext {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  tokenIsValid: boolean
  setTokenIsValid: React.Dispatch<React.SetStateAction<boolean>>
  userData: userType
  setUserData: React.Dispatch<React.SetStateAction<userType>>
}

interface UserDataContextProps {
  children: React.ReactNode
}

const UserDataContext = createContext<UserDataContext | undefined>(undefined)

export const UserDataContextProvider:React.FC<UserDataContextProps> = ({ children }) => {

  const defaultUserData = {
    id: 0,
    username: "",
    email: "",
    profile_pic: ""
  }

  const [token, setToken] = useState("")
  const [tokenIsValid, setTokenIsValid] = useState(false)
  const [userData, setUserData] = useState<userType>(defaultUserData)

  useEffect(()=>{
    console.log("userData: ", userData)
  },[userData])
  

  return (
    <UserDataContext.Provider value={{
      token, setToken,
      tokenIsValid, setTokenIsValid,
      userData, setUserData
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserDataContext = () => {
  const context = useContext(UserDataContext)
  if(!context){
    throw new Error("UserDataContext must be used inside provider")
  }
  return context
} 