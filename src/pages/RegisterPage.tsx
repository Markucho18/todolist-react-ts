import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

interface FormData {
  username: string,
  email: string,
  user_password: string
}

const URL = "http://localhost:3000/users/"

const RegisterPage: React.FC = () => {

  const defaultForm = {
    username: "",
    email: "",
    user_password: ""
  }

  const [formData, setFormData] = useState(defaultForm)

  const [errors, setErrors] = useState<string[]>([])
  
  useEffect(()=>{
    console.log("errors: ", errors)
  },[errors])

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

  const validateData = (formData: FormData) => {
    const {username, email, user_password} = formData
    let newErrors = []
    if(username.length <= 0) newErrors.push("username can't be empty")
    else if(username.length > 25) newErrors.push("Username is too long")
    if(email.length <= 0) newErrors.push("email can't be empty")
    else if(!email.includes("@gmail.com")) newErrors.push("Email must contain @gmail.com")
    if(user_password.length < 8) newErrors.push("Password must have at least 8 characters")
    setErrors(newErrors)
    return newErrors.length == 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dataIsValid = validateData(formData)
    if(dataIsValid){
      try{
        const response = await fetch(URL, {
          method: "POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        if(!response.ok){
          throw new Error("La respuesta no fue ok xdd")
        }
        const data = await response.json()
        if(data.emailInUse) setErrors(["Email is already in use"])
        else{
          setFormData(defaultForm)
          setErrors([])
          alert("Usuario creado exitosamente")
        }
        console.log("Data en RegisterPage: ", data)
      }
      catch(error){
        console.log("Error en RegisterPage fetch: ", error)
      }
    }
    console.log("Datos enviados")
  }

  return (
    <main className="flex h-full w-full justify-center items- center">
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
              <span className="text-xl">Username:</span>
              <input
                className="w-full rounded-md p-2"
                placeholder="Your name"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
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
              {errors.length > 0 && (
                <p className="text-red-500 text-lg font-semibold">{errors[0]}</p>
              )}
              <Link className="text-blue-700/60 hover:text-blue-700/90 font-semibold text-lg " to={"/login"}>
                Log in
              </Link>
            </label>
            <button className="w-full py-2 bg-cyan-400 hover:bg-cyan-600 transition duration-200 ease-in-out text-white text-lg font-bold rounded-lg">
              REGISTER
            </button>
          </form>
        </section>
        <section className="bg-red-500 flex-1"></section>
      </div>
    </main>
  )
}

export default RegisterPage