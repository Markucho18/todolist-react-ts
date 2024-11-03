import { createContext, useContext, useEffect, useState } from "react";
import { TokenDataType, userType } from "../types";
import { verifyToken } from "../utils/verifyToken";
import { getToken, removeToken, removeTokenIsValid, saveToken, saveTokenIsValid } from "../utils/tokenUtils";
import { clearUserData, getFullUserData, saveUserData } from "../utils/userDataUtils";
//import { verifyToken, removeToken } from "../utils/verifyToken";
//import { getFullUserData, clearUserData } from "../utils/userDataUtils";

interface UserDataContext {
/*   token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  tokenIsValid: boolean
  setTokenIsValid: React.Dispatch<React.SetStateAction<boolean>> */
  tokenData: TokenDataType
  setTokenData: React.Dispatch<React.SetStateAction<TokenDataType>> 
  userData: userType
  setUserData: React.Dispatch<React.SetStateAction<userType>>
  checkToken: () => Promise<boolean>
  updateUserData: () => void 
  fetchUserData: () => void
}

interface UserDataContextProps {
  children: React.ReactNode
}

const UserDataContext = createContext<UserDataContext | undefined>(undefined)

export const UserDataContextProvider:React.FC<UserDataContextProps> = ({ children }) => {
  
  const defaultTokenData: TokenDataType = {
    value: "",
    valid: false
  }

  const defaultUserData = {
    id: 0,
    username: "",
    email: "",
    profile_pic: ""
  }
  
/*   const [token, setToken] = useState("")
  const [tokenIsValid, setTokenIsValid] = useState(false) */
  const [tokenData, setTokenData] = useState<TokenDataType>(defaultTokenData)
  const [userData, setUserData] = useState<userType>(defaultUserData)

  const checkToken = async () => {
    console.log("Se ejecuto checkToken");
    const localToken = getToken();
    if (localToken) {
      try {
        const tokenIsValid = await verifyToken(localToken);
        console.log("Resultado de verifyToken:", tokenIsValid);
          if (tokenIsValid) {
            setTokenData(prev => {
              console.log("Token válido. Actualizando tokenData...");
              return { ...prev, valid: true };
            });
            return true;
          }
      } catch (error) {
        console.error("Error en verifyToken:", error);
      }
    }
    alert("Your session has expired, you must log in again");
    setTokenData(defaultTokenData);
    clearUserData();
    return false;
  };

  const updateUserData = () => {
    const localUserData = getFullUserData()
    if(localUserData){
      setUserData(localUserData)
    }
  }



  const fetchUserData = async () => {
    const URL = `http://localhost:3000/users/${userData.id}`
    try{
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${tokenData.value}`
        }
      })
      if(!response.ok) throw new Error("Hubo un error en la solicitud")
      const data = await response.json()
      const result = data.results[0]
      if(result){
        const {username, profile_pic} = result
        setUserData(prev => {
          return {
            ...prev,
            username, profile_pic
          }
        })
        console.log({username, profile_pic})
      }
    } catch(error){
      console.log("Error en getUserData: ", error)
    }
  }

  useEffect(()=>{
    if(tokenData.value.length > 0){
      saveToken(tokenData.value)
      saveTokenIsValid(tokenData.valid)
    }
    else{
      removeToken()
      removeTokenIsValid()
    }
  },[tokenData])

  useEffect(()=>{
    if(userData.id !== 0){
      saveUserData(userData)
      console.log("Se guardo toda la data en el localStorage")
    }
  },[userData])

  

  return (
    <UserDataContext.Provider value={{
/*       token, setToken,
      tokenIsValid, setTokenIsValid, */
      tokenData, setTokenData,
      userData, setUserData,
      checkToken,
      updateUserData,
      fetchUserData
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