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
import { VaultItem } from "@/interfaces/vault";
import { useUserStore } from "@/stores/userStore";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useRegisterVaultItem } from "@/hooks/useRegisterVaultItem";

export default function DialogComponent() {
  const user = useUserStore((s) => s.user);
  const { registerVaultItem } = useRegisterVaultItem();
  const vaultItemDefault = {
    idUser: user?.idUser,
    username: user?.username,
    url: "",
    description: "",
    hashedPassword: "",
  };

  const [vaultItem, setVaultItem] = useState<VaultItem>(vaultItemDefault);

  const handleChangeVaultItem = (el: Partial<VaultItem>) => {
    setVaultItem((prevState) => ({ ...prevState, ...el }));
  };

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
            <Input
              placeholder="Informe uma descrição..."
              value={vaultItem.description}
              onChange={(e) =>
                handleChangeVaultItem({ description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Link</Label>
            <Input
              value={vaultItem.url}
              placeholder="Informe o link de acesso..."
              onChange={(e) => handleChangeVaultItem({ url: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Senha</Label>
            <Input
              placeholder="Informe sua senha..."
              value={vaultItem.hashedPassword}
              type="password"
              onChange={(e) =>
                handleChangeVaultItem({ hashedPassword: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={() => registerVaultItem(vaultItem)}>
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
