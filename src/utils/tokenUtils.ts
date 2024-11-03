export const saveToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const getToken = () => {
  return localStorage.getItem("token")
}

export const removeToken = () => {
  localStorage.removeItem("token")
}

export const saveTokenIsValid = (value: boolean) => {
  const newValue = value.toString()
  localStorage.setItem("tokenIsValid", newValue)
}

export const getTokenIsValid = () => {
  return localStorage.getItem("tokenIsValid")
}

export const removeTokenIsValid = () => {
  localStorage.removeItem("tokenIsValid")
}