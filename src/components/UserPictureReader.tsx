import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { setProfilePic } from "../utils/userDataUtils";
import { verifyToken } from "../utils/verifyToken";
import { useUserDataContext } from "../contexts/userDataContext";

const URL = "http://localhost:3000/users/picture"

interface UserPictureReaderProps {
  closeForm: () => void
}

const UserPictureReader: React.FC<UserPictureReaderProps> = ({ closeForm }) => {

  const { token } = useUserDataContext()

  const [preview, setPreview] = useState("")

  const [file, setFile] = useState<File>()

  const [dragginOver, setDragginOver] = useState(false)

  const [error, setError] = useState("")

  const handleFile = (file: File) => {
    console.log(file)
    const fileIsValid = file.type.startsWith("image/") && file.type !== "image/gif" && file.type !== "image/webp"
    if(!fileIsValid){
      setError("File format not valid")
      return
    }
    setError("")
    setFile(file)
    const reader = new FileReader()
    reader.onload = ((e: ProgressEvent<FileReader>)=>{
      if(e.target){
        setPreview(e.target.result as string)
      }
    })
    reader.readAsDataURL(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if(file) handleFile(file)
  }

  const handleSubmit = async () => {
    const tokenIsValid = await verifyToken(token)
    if(tokenIsValid){
      if(!file) setError("No file selected")
      const formData = new FormData()
      formData.append("profile_pic", file as File)
      try{
        const response = await fetch(URL, {
          method: "PUT",
          body: formData
        })
        console.log(response)
        if(!response.ok) throw new Error("La respuesta no esta ok xd")
        const data = await response.json()
        //setProfilePic()
        console.log("data: ", data)
      } catch(error){
        console.log("Hubo un error en handleSubmit: ", error)
        setError("Failed to upload image")
      }
    } else alert("Your session has expired, refresh and log in again")
  }

  return (
    <div className="flex flex-col gap-6">
      <section
        className={`relative flex flex-col items-center justify-center border-dashed border-2 border-zinc-400/70 ${dragginOver && "border-zinc-500"} gap-4 size-[400px] md:size-[600px]`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragginOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragginOver(false)
        }}
        onDrop={handleDrop}
      >
        {preview.length > 0 && (
          <img
            className="absolute inset-0 size-full p-2 z-10 object-cover object-center"
            src={preview}
            alt="Preview"
          />
        )}
        <MdCloudUpload className={`text-zinc-400 size-36 ${dragginOver && "text-zinc-500"}`}/>
        <p className="text-xl">Drag & Drop to Upload file</p>
        <p className="text-xl">OR</p>
        <div className="relative">
          <input
            className="peer absolute inset-0 opacity-0 cursor-pointer"
            type="file"
            accept="/image"
            onChange={handleChange}
          />
          <button
            type="button"
            className="size-full bg-[#5FA6A5] peer-hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
          >
            Browse File
          </button>
        </div>
      </section>
      <section className="flex w-full justify-between items-center">
        <p className="text-red-500 text-xl">{error && error}</p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              if(preview.length > 0) setPreview("")
              else closeForm()
            }}
            className="bg-[#5FA6A5] hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            className="bg-[#5FA6A5] hover:bg-[#509190] text-white text-xl px-6 py-2 rounded-md"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  )
}

export default UserPictureReader