import { VaultItem } from "@/interfaces/vault";
import { registerNewVaultItem } from "@/services/vault";
import { useState } from "react";

export function useRegisterVaultItem() {
  const [loading, setLoading] = useState<boolean>(false);

  const registerVaultItem = async (vaultItem: VaultItem) => {
    setLoading(true);
    try {
      await registerNewVaultItem(vaultItem);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { registerVaultItem, loading };
}
