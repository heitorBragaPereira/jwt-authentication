import { vaultItems } from "@/services/vault";
import { vaultItemStore } from "@/stores/useVaultItemStore";

export function useGetVaultItems() {
  const setVaultItems = vaultItemStore((s) => s.setVaultItems);
  const getVaultItems = async (idUser: number) => {
    try {
      const response = await vaultItems(idUser);
      setVaultItems(response?.data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
    }
  };
  return { getVaultItems };
}
