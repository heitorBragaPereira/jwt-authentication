import { VaultItem, ItemDelete } from "@/interfaces/vault";
import { api } from "@/lib/api";

export const registerNewVaultItem = (vaultItem: VaultItem) => {
  return api.post("/vault/create", vaultItem);
};

export const vaultItems = (id: number) => {
  return api.get("/vault/items", {
    params: { id },
  });
};

export const updateVaultItem = (vaultItem: VaultItem) => {
  return api.put("/vault/update", vaultItem);
};

export const deleteVaultItem = (item: ItemDelete) => {
  return api.delete("/vault/delete", { data: item });
};
