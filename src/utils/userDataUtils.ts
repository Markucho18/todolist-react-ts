import { userType } from "../types"

export const saveUserData = ( userData: userType) => {
  localStorage.setItem("id", userData.id.toString())
  localStorage.setItem("username", userData.username)
  localStorage.setItem("email", userData.email)
  localStorage.setItem("profile_pic", userData.profile_pic)
}

export const getUserData = (data: string[]) =>{
  const values = data.map( key =>{
    return localStorage.getItem(key)
  })
  return values
}

export const clearUserData = () => {
  localStorage.removeItem("id")
  localStorage.removeItem("username")
  localStorage.removeItem("email")
  localStorage.removeItem("profile_pic")
}