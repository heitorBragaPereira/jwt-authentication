"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import path from "@/assets/logo.svg";
import Image from "next/image";
import React, { useState } from "react";
import { Subtitle } from "@/components/ui/subtitle";
import { Link } from "@/components/ui/link";
import { CreateUser } from "@/interfaces/createUser";
import { Toaster } from "@/components/ui/sonner";
import { useCreateUser } from "@/hooks/useCreateUser";

export default function Page() {
  const userDefault: CreateUser = {
    name: "",
    username: "",
    password: "",
  };
  const [user, setUser] = useState<CreateUser>(userDefault);
  const [passwordValidate, setPasswordValidate] = useState<string>("");
  const { create, loading } = useCreateUser();
  const disabledButton =
    passwordValidate != user.password ||
    passwordValidate === "" ||
    user.password === "";
  const handleChangeUser = (value: Partial<CreateUser>) => {
    setUser((prevState) => ({
      ...prevState,
      ...value,
    }));
  };
  const handleChangeValidate = (value: string) => {
    setPasswordValidate(value);
  };

  const createUser = async () => {
    const res = await create(user);
    if (res && res.success) {
      toast.success("Usuário cadastrado ;)", {
        position: "top-right",
      });
    } else {
      toast.error("Erro ao cadastrar usuário :(", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <Toaster richColors />
      <div className="w-[350px] flex flex-col justify-center gap-4 px-4 py-6 bg-secondary rounded">
        <div className="w-full flex flex-col items-center mb-4">
          <Image src={path} alt="Logo" width={100} />
          <Subtitle>Cadastrar usuário</Subtitle>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Nome</Label>
          <Input
            placeholder="Seu nome..."
            value={user.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeUser({ name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Usuário</Label>
          <Input
            placeholder="Seu usuário..."
            value={user.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeUser({ username: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Sua senha..."
            value={user.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeUser({ password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Confirme a senha</Label>
          <Input
            type="password"
            placeholder="Sua senha..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeValidate(e.target.value)
            }
          />
          <Link path="/login" className="text-end">
            Voltar para a tela de login
          </Link>
        </div>
        <Button onClick={createUser} disabled={disabledButton}>
          Cadastrar
        </Button>
        {loading && <span className="text-center">Cadastrando...</span>}
      </div>
    </div>
  );
}
