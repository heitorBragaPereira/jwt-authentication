import { api } from "@/lib/api";
import { CreateUser } from "@/interfaces/createUser";

export const createUser = (data: CreateUser) => {
  return api.post("/user/create", data);
};
