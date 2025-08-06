import { authLogin, authRegister } from "@/actions/auth/auth";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/user/user";
import { AuthUserResponse } from "@/interfaces/auth/auth.interface";

type AuthStatus = "authenticated" | "unauthenticated" | "checking";

interface AuthState {
  user?: AuthUserResponse["user"];
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

        set({
          user: result.data.user,
          status: "authenticated",
          error: undefined,
        });
        return true;
      },

      register: async (email, password, role) => {
        set({ status: "checking", error: undefined });

        const result = await authRegister(email, password, role);

        if (!result.success) {
          set({ status: "unauthenticated", error: result.error });
          return false;
        }

        set({
          user: result.data.user,
          status: "authenticated",
          error: undefined,
        });
        return true;
      },

      logout: () => {
        Cookies.remove("token");
        set({
          user: undefined,
          status: "unauthenticated",
          error: undefined,
        });
      },

      checkAuthStatus: async () => {
        set({ status: "checking", error: undefined });

        const token = Cookies.get("token");

        if (!token) {
          get().logout();
          return;
        }

        try {
          const user = await getCurrentUser();

          set({
            user,
            status: "authenticated",
            error: undefined,
          });
        } catch (error) {
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        status: state.status,
        error: state.error,
      }),
    }
  )
);
