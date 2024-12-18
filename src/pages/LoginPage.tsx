import { useState } from "react"
import { Link } from "react-router-dom"
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { fetchUserData } from "../utils/fetchUserData";

interface LoginPageProps{
  setTokenIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPage: React.FC<LoginPageProps> = ({setTokenIsValid}) => {

  const [formData, setFormData] = useState({
    email: "",
    user_password: ""
  })

  const [passwordType, setPasswordType] = useState<"text" | "password">("password")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    const URL = "http://localhost:3000/users/login"
    try{
      const response = await fetch(URL,{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if(response.status === 404) return setError("The email is not registered")
      if(response.status === 401) return setError("The password is incorrect")
      if(response.status !== 200) throw new Error("Server error")
      if(data.userId) localStorage.setItem("userId", data.userId)
      setError("")
      await fetchUserData()
      setTokenIsValid(true)
    }
    catch(error){
      if(error instanceof Error) console.log(error.message)
      else console.log("Error has ocurred", error)
    }
    console.log("Datos enviados")
  }

  return (
    <main className="flex h-full w-full justify-center items- center obje">
      <div
        style={{ boxShadow: "0px 0px 3px black" }}
        className="flex rounded-lg overflow-hidden w-full md:w-[80%] my-auto"
      >
        <section className="bg-slate-300 flex-1">
          <form
            className="flex flex-col gap-8 px-8 py-16"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2 text-lg">
              <span className="text-xl">Email:</span>
              <input
                className="w-full rounded-md p-2"
                placeholder="yourEmail@gmail.com"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col gap-2 text-lg">
              <span className="text-xl">Password:</span>
              <div className="flex w-full bg-white items-center rounded-md overflow-hidden">
                <input
                  className="flex-1 p-2 focus:outline-none"
                  placeholder="iLikeLemons123"
                  type={passwordType}
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleChange}
                />
                <span className="pr-2">
                  {passwordType == "password" ? (
                    <GoEye
                      className="size-5 opacity-60 text-bold select-none cursor-pointer"
                      onClick={()=> setPasswordType("text")}
                    />
                  ) : (
                    <GoEyeClosed
                      className="size-5 opacity-60 text-bold select-none cursor-pointer"
                      onClick={()=> setPasswordType("password")}
                    />
                  )}
                </span>
              </div>
              <Link className="text-blue-700/60 hover:text-blue-700/90 font-semibold text-lg " to={"/register"}>
                Create an account
              </Link>
              {error.length > 0 && (
                <p className="text-red-500 text-lg font-semibold">{error}</p>
              )}
            </label>
            <button className="w-full py-2 bg-cyan-400 hover:bg-cyan-600 transition duration-200 ease-in-out text-white text-lg font-bold rounded-lg">
              LOG IN
            </button>
          </form>
        </section>
        <section className="bg-red-500 flex-1"></section>
      </div>
    </main>
  )
}

export default LoginPage