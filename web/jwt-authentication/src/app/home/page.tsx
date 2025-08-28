"use client";

import logo from "@/assets/logo.svg";
import notPasswords from "@/assets/notPasswords.svg";
import Image from "next/image";
import DialogComponent from "./components/DialogComponent";
import { Button } from "@/components/ui/button";
import { DoorClosedLocked } from "lucide-react";
import { useUserStore } from "@/stores/userStore";

export default function Page() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[80px] bg-secondary flex items-center justify-around">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={55} />
          {user && <p className="text-white">Olá, {user.name}!</p>}
        </div>
        <Button variant={"outline"} className="text-red-200">
          <DoorClosedLocked />
          Sair do sistema
        </Button>
      </div>
      <div className="px-20 py-8 flex flex-col gap-4">
        {/* <Title>Sua Lista</Title> */}
        {/* <TableComponent /> */}
        <div className="w-full flex flex-col items-center mt-28 ">
          <Image src={notPasswords} alt="Sem senhas cadastradas" width={80} />
          <p className="font-light text-white text-center mt-4">
            Heitor, você ainda não possui nenhuma senha cadastrada.
          </p>
          <p className="font-light text-white text-center">
            Adicione uma senha clicando em adicionar nova senha!
          </p>
          <div className="mt-2">
            <DialogComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
