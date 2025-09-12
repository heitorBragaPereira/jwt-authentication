import { VaultItem } from "@/interfaces/vault";
import { updateVaultItem } from "@/services/vault";
import { vaultItemStore } from "@/stores/useVaultItemStore";
import { useState } from "react";

export function useUpdateVaultItem() {
  const [loading, setLoading] = useState<boolean>(false);
  const setVaultItems = vaultItemStore((s) => s.setVaultItems);

  const updateVaultItemAction = async (vaultItem: VaultItem) => {
    setLoading(true);
    try {
      const res = await updateVaultItem(vaultItem);
      setVaultItems(res?.data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { updateVaultItemAction, loading };
}
