export interface userType {
  id: number
  username: string
  email: string
  //user_password: string
  profile_pic: string
}

export interface TokenDataType {
  value: string
  valid: boolean
}