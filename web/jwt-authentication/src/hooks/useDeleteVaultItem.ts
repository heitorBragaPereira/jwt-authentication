import { vaultItemStore } from "@/stores/useVaultItemStore";
import { deleteVaultItem } from "@/services/vault";
import { ItemDelete } from "@/interfaces/vault";
import { useState } from "react";

export function useDeleteVaultItem() {
  const [loading, setLoading] = useState<boolean>(false);
  const setVaultItems = vaultItemStore((s) => s.setVaultItems);

  const deleteVaultItemAction = async (item: ItemDelete) => {
    setLoading(true);
    try {
      const res = await deleteVaultItem(item);
      setVaultItems(res?.data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { deleteVaultItemAction, loading };
}
