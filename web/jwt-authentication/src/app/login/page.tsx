"use client";

import path from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { Subtitle } from "@/components/ui/subtitle";
import { useLoginUser } from "@/hooks/useLoginUser";
import { LoginUser } from "@/interfaces/user";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/ui/loader";

export default function Page() {
  const { login, loading } = useLoginUser();

  const router = useRouter();
  const userDefault = {
    username: "",
    password: "",
  };
  const [user, setUser] = useState<LoginUser>(userDefault);

  const handleChangeUser = (value: Partial<LoginUser>) => {
    setUser((prevState) => ({
      ...prevState,
      ...value,
    }));
  };
  const loginUser = async () => {
    const res = await login(user);
    if (res?.success) {
      router.push("/home");
    } else {
      toast.error("Usuário ou senha incorretos!", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster richColors />
      <form
        className="relative w-[350px] flex flex-col justify-center gap-4 px-4 py-6 bg-secondary rounded"
        action={loginUser}
      >
        <div className="w-full flex flex-col items-center mb-4">
          <Image src={path} alt="Logo" width={100} />
          <Subtitle>Acesso ao sistema</Subtitle>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Usuário</Label>
          <Input
            placeholder="Seu usuário..."
            onChange={(e) =>
              handleChangeUser({
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Sua senha..."
            onChange={(e) =>
              handleChangeUser({
                password: e.target.value,
              })
            }
          />
          <span className="text-end">
            <Link path="/create-user" className="text-primary">
              Cadastrar um novo usuário?
            </Link>
          </span>
        </div>
        <Button type="submit">Entrar</Button>

        {loading && (
          <div className="absolute left-0 top-0 rounded w-full h-full flex justify-center items-center backdrop-blur bg-white/30">
            <Loader />
          </div>
        )}
      </form>
    </div>
  );
}
