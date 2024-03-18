export interface LoginRequest {
  inputUserName: string | null;
  inputPassword: string | null;
}

export interface User {
  userID: string | null;
  userName: string | null;
  employeeID: string | null;
  password: string | null;
  isManagerment: string | null;
}
