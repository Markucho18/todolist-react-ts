const URL = "http://localhost:3000/users/token"

export const verifyToken = async (token: string) => {
  if(token && token.length > 0){
    try{
      const response = await fetch(URL, {
        method: "POST",
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      if(!response.ok){
        throw new Error("Hubo un error en verifyToken()")
      }
      const data = await response.json()
      console.log("response.data: ", data)
      return data.tokenIsValid
    }
    catch(error){
      console.log("Hubo un error en verifyToken(): ", error)
      return false
    }
  }
  else return false
}
