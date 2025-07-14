import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import path from "@/assets/logo.svg";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[350px] flex flex-col justify-center gap-4 bg-secondary px-4 py-6 border border-gray-300">
        <div className="w-full flex justify-center">
          <Image src={path} alt="Logo" width={100} />
        </div>
        <Input />
        <Input />
        <Button>Entrar</Button>
      </div>
    </div>
  );
}
