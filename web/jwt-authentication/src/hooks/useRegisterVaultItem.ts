import { VaultItem } from "@/interfaces/vault";
import { registerNewVaultItem } from "@/services/vault";
import { vaultItemStore } from "@/stores/useVaultItemStore";
// import { vaultItemStore } from "@/stores/vaultItemStore";
import { useState } from "react";

export function useRegisterVaultItem() {
  const [loading, setLoading] = useState<boolean>(false);
  const setVaultItems = vaultItemStore((s) => s.setVaultItems);

  const registerVaultItem = async (vaultItem: VaultItem) => {
    setLoading(true);
    try {
      const res = await registerNewVaultItem(vaultItem);
      setVaultItems(res?.data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { registerVaultItem, loading };
}
