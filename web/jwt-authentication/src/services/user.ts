import { api } from "@/lib/api";
import { CreateUser, LoginUser } from "@/interfaces/user";

export const createUser = (data: CreateUser) => {
  return api.post("/user/create", data);
};

export const loginUser = (data: LoginUser) => {
  return api.post("/user/login", data);
};
