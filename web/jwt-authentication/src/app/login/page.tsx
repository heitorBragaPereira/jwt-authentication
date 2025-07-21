"use client";

import path from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { Subtitle } from "@/components/ui/subtitle";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="w-[350px] flex flex-col justify-center gap-4 px-4 py-6 bg-secondary rounded">
        <div className="w-full flex flex-col items-center mb-4">
          <Image src={path} alt="Logo" width={100} />
          <Subtitle>Acesso ao sistema</Subtitle>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Usuário</Label>
          <Input placeholder="Seu usuário..." />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Senha</Label>
          <Input type="password" placeholder="Sua senha..." />
          <Link path="/create-user" className="text-end">
            Cadastrar um novo usuário?
          </Link>
        </div>
        <Button>Entrar</Button>
      </div>
    </div>
  );
}
