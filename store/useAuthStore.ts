import { authLogin, authRegister } from "@/actions/auth/auth";
import { UserResponse } from "@/interfaces/auth/login.interface";
import { create } from "zustand";

type AuthStatus = "authenticated" | "unauthenticated" | "checking";

interface AuthState {
  user?: UserResponse["user"];
  status: AuthStatus;
  error?: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    role: "photographer" | "buyer"
  ) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  status: "unauthenticated",
  error: undefined,

  login: async (email, password) => {
    set({ status: "checking", error: undefined });

    const result = await authLogin(email, password);

    if (!result.success) {
      set({ status: "unauthenticated", error: result.error });
      return false;
    }

    set({ user: result.data.user, status: "authenticated", error: undefined });
    return true;
  },

  register: async (email, password, role) => {
    set({ status: "checking", error: undefined });

    const result = await authRegister(email, password, role);

    if (!result.success) {
      set({ status: "unauthenticated", error: result.error });
      return false;
    }

    set({ user: result.data.user, status: "authenticated", error: undefined });
    return true;
  },

  logout: () => {
    set({ user: undefined, status: "unauthenticated", error: undefined });
    // si usás cookies, podés hacer claraApi.post('/auth/logout') acá
  },

  checkAuthStatus: () => {
    // futuro: podés hacer claraApi.get('/auth/profile') para ver si hay usuario
  },
}));
