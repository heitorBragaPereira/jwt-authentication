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

export default function Page() {
  const { login } = useLoginUser();
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
    console.log(res);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[350px] flex flex-col justify-center gap-4 px-4 py-6 bg-secondary rounded">
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
          <Link path="/create-user" className="text-end">
            Cadastrar um novo usuário?
          </Link>
        </div>
        <Button onClick={loginUser}>Entrar</Button>
      </div>
    </div>
  );
}
