import { LoginUser } from "@/interfaces/user";
import { loginUser } from "@/services/user";
import { useState } from "react";

export function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const login = async (data: LoginUser) => {
    setLoading(true);
    try {
      await loginUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
}
