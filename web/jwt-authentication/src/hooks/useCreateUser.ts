import { useState } from "react";
import { createUser } from "@/services/user";
import { CreateUser } from "@/interfaces/user";

export function useCreateUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const create = async (data: CreateUser) => {
    setLoading(true);
    try {
      await createUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
