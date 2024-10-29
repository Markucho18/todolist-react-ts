import { useState } from "react"
import { Link } from "react-router-dom"
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const URL = "http://localhost:3000/users/login"

const LoginPage: React.FC = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    try{
      const response = await fetch(URL,{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      if(!response.ok){
        throw new Error(`Hubo un error en el fetch de ${URL}`)
      }
      const data = await response.json()
      console.log(data)
    }
    catch(error){
      console.log(`Hubo un error en LoginPage: `, error)
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
              <div className="relative w-full">
                <input
                  className="w-full rounded-md p-2"
                  placeholder="iLikeLemons123"
                  type={passwordType}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="absolute right-3 top-3">
                  {passwordType == "password" ? (
                    <button
                      className="opacity-60 text-bold size-5"
                      onClick={()=> setPasswordType("text")}
                    >
                      <GoEye className="size-full"/>
                    </button>
                  ) : (
                    <button
                      className="opacity-60 text-bold size-5"
                      onClick={()=> setPasswordType("password")}
                    >
                      <GoEyeClosed className="size-full"/>
                    </button>
                  )}
                </span>
              </div>
              <Link className="text-blue-700/60 hover:text-blue-700/90 font-semibold text-lg " to={"/register"}>
                  Create an account
                </Link>
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