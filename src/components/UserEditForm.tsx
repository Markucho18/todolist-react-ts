import React, { FormEvent, useState } from "react"
import { useUserDataContext } from "../contexts/userDataContext"
import { verifyToken } from "../utils/verifyToken"

const URL = "http://localhost:3000/users/"

interface UserEditFormProps {
  type: "username" | "password"
  closeForm: () => void
}

const UserEditForm: React.FC<UserEditFormProps> = ({ type, closeForm }) => {

  const { userData, token } = useUserDataContext()

  const [formData, setFormData] = useState({
    old_username: "",
    new_username: "",
    old_password: "",
    new_password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const [error, setError] = useState("")

  const usernameSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if(formData.old_username !== userData.username) return setError("The username doesn't match") 
    else if(formData.new_password.length >= 4) return setError("New username can't be empty or short")
    else{
      try{
        const tokenValid = await verifyToken(token)
        if(tokenValid){
          const response = await fetch(`${URL}${userData.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              "username": formData.new_username
            })
          })
          if(!response.ok){
            throw new Error("La respuesta no esta ok en usernameSubmit")
          }
          const data = await response.json()
          setError("")
          console.log("data: ", data)
        }
        else alert("Your session has expired. Refresh and log in again")
      } catch(error){
        console.log("There was an error in usernameSubmit: ", error)
      }
    }
  }
  
  const passwordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const tokenValid = await verifyToken(token)
    if(tokenValid){
  
    } else alert("Your session has expired. Refresh and log in again")
  }
  

  return (
    <form
      onSubmit={type === "username" ? usernameSubmit : passwordSubmit}
      className="flex flex-col gap-4 bg-white p-2 rounded-md"
    >
      <label className="flex items-center gap-2 text-lg">
        <span className="text-xl">Old {type}:</span>
        <input
          style={{boxShadow: "0px 0px 3px black"}}
          className="flex-1 rounded-md p-2 focus:outline-none"
          placeholder={`Enter your old ${type}`}
          type="text"
          name={`old_${type}`}
          value={formData[`old_${type}`]}
          onChange={handleChange}
        />
      </label>
      <label className="flex items-center gap-2 text-lg">
        <span className="text-xl">New {type}:</span>
        <input
          style={{boxShadow: "0px 0px 3px black"}}
          className="flex-1 rounded-md p-2 focus:outline-none"
          placeholder={`Enter your new ${type}`}
          type="text"
          name={`new_${type}`}
          value={formData[`new_${type}`]}
          onChange={handleChange}
        />
      </label>
      {error.length > 0 && (
        <span className="text-red-500 text-xl">{error}</span>
      )}
      <div className="flex flex-1 justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={closeForm}
          className="bg-[#5FA6A5] hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#5FA6A5] hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default UserEditForm