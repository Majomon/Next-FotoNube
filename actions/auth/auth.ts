import claraApi from "@/lib/axios";
import { UserResponse } from "@/interfaces/auth/login.interface";

type AuthResult =
  | { success: true; data: UserResponse }
  | { success: false; error: string };

export const authRegister = async (
  email: string,
  password: string,
  role: "photographer" | "buyer"
): Promise<AuthResult> => {
  try {
    const { data } = await claraApi.post("/auth/register", {
      email,
      password,
      role,
    });

    return { success: true, data: data.response };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error al registrar el usuario.";
    return { success: false, error: message };
  }
};

export const authLogin = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  try {
    const { data } = await claraApi.post("/auth/login", {
      email,
      password,
    });

    console.log(data);

    return { success: true, data: data.response };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Credenciales incorrectas.";
    return { success: false, error: message };
  }
};
