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

export interface TaskType{
  task_id: number
  user_id?: number
  task_title: string
  task_deadline: string
  task_priority: number
  task_description: string
}

export type CurrentTasksType = "inbox" | "today" | "tomorrow" | "week" | "month"