import { VaultItem } from "@/interfaces/vault";
import { api } from "@/lib/api";

export const registerNewVaultItem = (vaultItem: VaultItem) => {
  return api.post("/vault/create", vaultItem);
};

export const vaultItems = (id: string) => {
  return api.get("/vault/items", {
    params: { id },
  });
};
