import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleFadingPlus } from "lucide-react";

export default function DialogComponent() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <CircleFadingPlus />
            Adicionar nova senha
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-white bg-secondary">
          <DialogHeader className="mb-4">
            <DialogTitle>Cadastre uma nova senha!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            <Label>Descrição</Label>
            <Input placeholder="Informe uma descrição..." />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Link</Label>
            <Input placeholder="Informe o link de acesso..." />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Senha</Label>
            <Input placeholder="Informe sua senha..." type="password" />
          </div>
          <DialogFooter>
            <Button type="submit">Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
