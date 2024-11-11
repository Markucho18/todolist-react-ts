export const validateToken = async () => {
  try{
    const response = await fetch(`http://localhost:3000/users/validate-token`, {
      method: "GET",
      credentials: "include"
    })
    const data = await response.json()
    if(!response.ok) throw new Error(data.message)
    if(data.userId){
      localStorage.setItem("userId", data.userId)
      return true
    }
    else return false
  } catch(error){
    if (error instanceof Error) console.log(error.message);
    else console.log("An unknown error occurred", error);
    return false
  }
}