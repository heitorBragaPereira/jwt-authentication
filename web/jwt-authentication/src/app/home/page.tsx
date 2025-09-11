"use client";

import logo from "@/assets/logo.svg";
import notPasswords from "@/assets/notPasswords.svg";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Title } from "@/components/ui/title";
import { useGetVaultItems } from "@/hooks/useGetVaultItems";
import { useUserStore } from "@/stores/useUserStore";
import { vaultItemStore } from "@/stores/useVaultItemStore";
import { CircleFadingPlus, DoorClosedLocked } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TableComponent from "./components/TableComponent";

import DialogComponent from "@/components/DialogComponent";
import { useRegisterVaultItem } from "@/hooks/useRegisterVaultItem";
import { VaultItem } from "@/interfaces/vault";
import ContentDialog from "./components/contentDialog";
import { toast } from "sonner";

export default function Page() {
  const user = useUserStore((s) => s.user);
  const vaultItemDefault = {
    idUser: user?.idUser,
    username: user?.username,
    url: "",
    description: "",
    hashedPassword: "",
  };
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const openDialogComponent = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
    setVaultItem(vaultItemDefault);
  };
  const footerDialog = [
    {
      text: "Cadastrar",
      action: () => saveNewVaultItem(vaultItem),
    },
  ];
  const { registerVaultItem } = useRegisterVaultItem();
  const [vaultItem, setVaultItem] = useState<VaultItem>(vaultItemDefault);

  const vaultItems = vaultItemStore((s) => s.vaultItems);
  const { getVaultItems } = useGetVaultItems();
  // console.log("Vault ", vaultItem);
  const handleChangeVaultItem = (el: Partial<VaultItem>) => {
    setVaultItem((prevState) => ({ ...prevState, ...el }));
  };

  const saveNewVaultItem = async (vaultItem: VaultItem) => {
    const res = await registerVaultItem(vaultItem);
    if (res.success) {
      closeDialog();
      toast.success("Senha cadastrada!", {
        position: "top-right",
      });
    } else {
      toast.error("Erro ao cadastrar senha!", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchVaultItems = async () => {
      if (user) {
        await getVaultItems(user.idUser);
      }
    };
    fetchVaultItems();
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center">
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
      <div className="w-full max-w-[1400px] px-20 py-8 flex flex-col gap-4">
        {openDialog && (
          <DialogComponent
            open={openDialog}
            closeDialog={closeDialog}
            footer={footerDialog}
            content={
              <ContentDialog
                vaultItem={vaultItem}
                handleChangeVaultItem={handleChangeVaultItem}
              />
            }
            title="Cadastre uma nova senha"
          />
        )}
        {!user ? (
          <div className="fixed top-[200px] left-[50%]">
            <Loader />
          </div>
        ) : vaultItems ? (
          <>
            <div className="w-full flex justify-between">
              <Title>Sua Lista</Title>
              <Button onClick={openDialogComponent}>
                <CircleFadingPlus />
                Adicionar nova senha
              </Button>
            </div>
            <TableComponent />
          </>
        ) : (
          <div className="w-full flex flex-col items-center mt-28 ">
            <Image src={notPasswords} alt="Sem senhas cadastradas" width={80} />
            <p className="font-light text-white text-center mt-4">
              {user?.name}, você ainda não possui nenhuma senha cadastrada.
            </p>
            <p className="font-light text-white text-center">
              Adicione uma senha clicando em adicionar nova senha!
            </p>
            <div className="mt-2">
              <Button onClick={openDialogComponent}>
                <CircleFadingPlus />
                Adicionar nova senha
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
