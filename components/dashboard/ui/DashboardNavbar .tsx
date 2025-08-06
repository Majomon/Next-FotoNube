"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function MiComponente() {
  const { user, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return <div>{JSON.stringify(user, null, 2)}</div>;
}
