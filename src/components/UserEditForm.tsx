import React, { FormEvent, useState } from "react"
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { fetchUserData } from "../utils/fetchUserData"

interface UserEditFormProps {
  type: "username" | "password"
  closeForm: () => void
}

const UserEditForm: React.FC<UserEditFormProps> = ({ type, closeForm }) => {

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

  const [passwordType, setPasswordType] = useState<"text" | "password">("password")

  const usernameSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const currentUsername = localStorage.getItem("username")
    if(currentUsername){
      if(formData.old_username !== currentUsername) return setError("The username doesn't match") 
      else if(formData.new_username.length <= 4) return setError("New username can't be empty or short")
      else{
        try{
          console.log({ username: formData.new_username})
          const response = await fetch(`http://localhost:3000/users/edit-username`, {
            method: "PUT",
            credentials: "include",
            headers:{
              "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
          })
          const data = await response.json()
          if(!response.ok) throw new Error(data.message)
          console.log("data: ", data)
          setError("")
          await fetchUserData()
          alert("Username updated successfully")
          closeForm()
        } catch(error){
          if(error instanceof Error) console.log(error.message)
          else console.log("username edit error", error)
        }
      }
    }
    else console.log("No username in localStorage")
  }
  
  const passwordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try{
      if(formData.new_password.length < 8) return setError("New password must have at least 8 characters")
      const response = await fetch(`http://localhost:3000/users/edit-password`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if(response.status === 401) setError("Old password is incorrect")
      if(response.status !== 200) throw new Error(data.message)
      await fetchUserData()
      alert("password updated successfully")
      closeForm()
    } catch(error){
      if(error instanceof Error) console.log(error.message)
      else console.log("username edit error", error)
    }
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
          type={type == "password" ? passwordType : "text"}
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
          type={type == "password" ? passwordType : "text"}
          name={`new_${type}`}
          value={formData[`new_${type}`]}
          onChange={handleChange}
        />
        
      </label>
      {error.length > 0 && (
        <span className="text-red-500 text-xl">{error}</span>
      )}
      <div className="flex flex-1 justify-end gap-4 pt-2">
        {type == "password" && (
          <span className="flex items-center pr-2 h-full">
            {passwordType == "password" ? (
              <GoEye
                className="size-8 opacity-60 text-bold select-none cursor-pointer"
                onClick={()=> setPasswordType("text")}
              />
            ) : (
              <GoEyeClosed
                className="size-8 opacity-60 text-bold select-none cursor-pointer"
                onClick={()=> setPasswordType("password")}
              />
            )}
          </span>
        )}
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