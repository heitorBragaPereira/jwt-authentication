import { LoginUser } from "@/interfaces/user";
import { loginUser } from "@/services/user";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";

export function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const login = async (data: LoginUser) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      setUser(response?.data?.user);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
}
