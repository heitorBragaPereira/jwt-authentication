import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[300px] h-[350px] flex flex-col">
        <Input />
        <Input />
        <Button>Entrar</Button>
      </div>
    </div>
  );
}
