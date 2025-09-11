/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VaultItem } from "@/interfaces/vault";

interface Props {
  vaultItem: VaultItem;
  handleChangeVaultItem: (el: Partial<VaultItem>) => void;
}

export default function contentDialog(props: Props) {
  const { vaultItem, handleChangeVaultItem } = props;
  return (
    <>
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
    </>
  );
}
