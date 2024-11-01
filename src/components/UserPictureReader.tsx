import { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";

interface UserPictureReaderProps {
  closeForm: () => void
}

const UserPictureReader: React.FC<UserPictureReaderProps> = ({ closeForm }) => {

  const [preview, setPreview] = useState("")

  const [dragginOver, setDragginOver] = useState(false)

  const [error, setError] = useState("")

  const handleFile = (file: File) => {
    if(
      !file.type.startsWith("image/") ||
      file.type == "image/gif" ||
      file.type == "image/webp"
    ){
      return setError("File format not valid")
    }
    const reader = new FileReader()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-6">
      <section
        className={`flex flex-col items-center border-dashed border-2 border-zinc-400/70 ${dragginOver && "border-zinc-500"} gap-4 py-8 md:py-12 px-16 md:px-24 lg:px-36`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragginOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragginOver(false)
        }}
      >
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
      </section>
    </div>
  )
}

export default UserPictureReader