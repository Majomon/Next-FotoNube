// interfaces/index.ts
export interface FormUserRegister {
  email: string;
  password: string;
  role: "photographer" | "buyer";
}

export interface UserResponse {
  access_token: string;
  user: {
    email: string;
    role: string;
    id: string;
  };
}
