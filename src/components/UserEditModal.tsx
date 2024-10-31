import React, { useState } from "react"
import { useUserDataContext } from "../contexts/userDataContext"
import { MdModeEditOutline } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

interface UserEditModalProps {
  toggleModal: () => void
}

const UserEditModal: React.FC<UserEditModalProps> = ({ toggleModal }) => {

  const { userData, token } = useUserDataContext()

  const [userEditable, setUserEditable] = useState(false)

  const [passwordEditable, setPasswordEditable] = useState(false)

  const defaultForm = {
    username: userData.username,
    email: userData.email,
    user_password: "********",
    profile_pìc: userData.profile_pic
  }

  const [formData, setFormData] = useState(defaultForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
  const handleSubmit = (e: React.FormEvent ) => {
    e.preventDefault()
  }

  return (
    <div
      onClick={() => toggleModal()}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 flex gap-6 py-8 px-6 bg-white rounded-md"
      >
        <section className="flex flex-col">
          <div
            className="group relative size-36 overflow-hidden border-2 border-slate-500 rounded-full object-cover object-center cursor-pointer"
          >
            <img src={userData.profile_pic ? userData.profile_pic : ""} alt="profile_pic"/>
            <div className="absolute inset-0 size-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
              <FaCamera className="size-12 text-[#5FA6A5]"/>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          {userEditable
            ? (
              <label className="flex items-center gap-2 text-lg">
                <span className="text-xl">Username:</span>
                <input
                  className="w-full rounded-md p-2"
                  placeholder="yourEmail@gmail.com"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
            )
            : (
              <div className="flex items-center gap-2">
                <p className="text-xl">Username: </p>
                <p className="text-xl opacity-80">{userData.username}</p>
                <button
                  type="button"
                  onClick={() => setUserEditable(true)}
                  className="group bg-[#5FA6A5] hover:bg-[#509190] p-2 rounded-md transition duration-150 ease-in-out"
                >
                  <MdModeEditOutline className="size-4 text-zinc-100 group-hover:text-white"/>
                </button>
              </div>
            )
          }
          {passwordEditable
            ? (
              <label className="flex items-center gap-2 text-lg">
                <span className="text-xl">Password:</span>
                <input
                  className="w-full rounded-md p-2"
                  placeholder="yourEmail@gmail.com"
                  type="password"
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleChange}
                />
              </label>
            )
            : (
              <div className="flex items-center gap-2">
                <p className="text-xl">Password: </p>
                <p className="text-2xl font-bold opacity-80 mt-2">{formData.user_password}</p>
                <button
                  type="button"
                  onClick={() => setPasswordEditable(true)}
                  className="group bg-[#5FA6A5] hover:bg-[#509190] p-2 rounded-md transition duration-150 ease-in-out"
                >
                  <MdModeEditOutline className="size-4 text-zinc-100 group-hover:text-white"/>
                </button>
              </div>
            )
          }
          <button
            type="submit"
          >
            ENVIARRR
          </button>
        </section>
      </form>
    </div>
  )
}

export default UserEditModal