import React, { useState } from "react"
import UserEditForm from "./UserEditForm";
import UserPictureReader from "./UserPictureReader";
import { useUserDataContext } from "../contexts/userDataContext"
import { MdModeEditOutline } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface UserEditModalProps {
  toggleModal: () => void
}

const UserEditModal: React.FC<UserEditModalProps> = ({ toggleModal }) => {

  const { userData } = useUserDataContext()

  const [usernameEdit, setUsernameEdit] = useState(false)
  const [passwordEdit, setPasswordEdit] = useState(false)
  const [pictureEdit, setPictureEdit] = useState(false)

  return (
    <div
      onDoubleClick={toggleModal}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50"
    >
      <div
        onDoubleClick={(e) => e.stopPropagation()}
        className="relative z-20 flex gap-6 pb-8 pt-10 px-6 bg-white rounded-md"
      >
        <button 
          onClick={toggleModal}
          className="absolute top-1 right-1 opacity-70 hover:opacity-100"
        >
          <MdOutlineCancel className="size-8"/>
        </button>
        {usernameEdit ? (
          <UserEditForm
            type="username"
            closeForm={() => setUsernameEdit(false)}
          />
        ) : passwordEdit ? (
          <UserEditForm
            type="password"
            closeForm={() => setPasswordEdit(false)}
          />
        ) : pictureEdit ? (
          <UserPictureReader closeForm={() => setPictureEdit(false)}/>
        ) : (
          <>
            <section className="flex flex-col">
              <div
                onClick={() => setPictureEdit(true)}
                className="group relative size-36 overflow-hidden border-2 border-slate-500 rounded-full object-cover object-center cursor-pointer"
              >
                <img src={userData.profile_pic ? userData.profile_pic : ""} alt="profile_pic"/>
                <div className="absolute inset-0 size-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                  <FaCamera className="size-12 text-[#5FA6A5]"/>
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2">
                <p className="text-xl">Email: </p>
                <p className="text-xl opacity-80">{userData.email}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <p className="text-xl">Username: </p>
                  <p className="text-xl opacity-80">{userData.username}</p>
                </div>
                <button
                  onClick={() => setUsernameEdit(true)}
                  className="group bg-[#5FA6A5] hover:bg-[#509190] p-2 rounded-md transition duration-150 ease-in-out"
                >
                  <MdModeEditOutline className="size-4 text-zinc-100 group-hover:text-white"/>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-xl">Password: </p>
                  <p className="text-2xl font-bold opacity-80 mt-2">********</p>
                </div>
                <button
                  onClick={() => setPasswordEdit(true)}
                  className="group bg-[#5FA6A5] hover:bg-[#509190] p-2 rounded-md transition duration-150 ease-in-out"
                >
                  <MdModeEditOutline className="size-4 text-zinc-100 group-hover:text-white"/>
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default UserEditModal