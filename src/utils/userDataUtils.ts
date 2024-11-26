/* import { userType } from "../types"

export const saveUserData = ( userData: userType) => {
  localStorage.setItem("id", userData.id.toString())
  localStorage.setItem("username", userData.username)
  localStorage.setItem("email", userData.email)
  localStorage.setItem("profile_pic", userData.profile_pic)
}

export const getUserAttribute = (data: string) => {
  const value = localStorage.getItem(data)
  if(value !== null){
    return value 
  } else throw new Error(`El atributo ${data} es null`)
}

export const getUserId = () => getUserAttribute("id")
export const getUserUsername = () => getUserAttribute("username")
export const getUserEmail = () => getUserAttribute("email")
export const getUserProfilePic = () => getUserAttribute("profile_pic")

type userDataReturn =  () => userType

export const getFullUserData: userDataReturn = () => {
  const newUserData = {
    id: parseInt(getUserId()),
    username: getUserUsername(),
    email: getUserEmail(),
    profile_pic: getUserProfilePic()
  }
  return newUserData
} */

export const clearUserData = () => {
  localStorage.removeItem("userId")
  localStorage.removeItem("username")
  localStorage.removeItem("email")
  localStorage.removeItem("profile_pic")
}

export const getUserId = () => {
  const user_id = localStorage.getItem("userId") ?? null
  if(user_id === null) throw new Error("userId is null")
  else return parseInt(user_id)
}