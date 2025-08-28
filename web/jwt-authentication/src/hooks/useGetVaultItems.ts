import { vaultItems } from "@/services/vault";
import { useUserStore } from "@/stores/userStore";

export function useGetVaultItems() {
  const setVaultItems = useUserStore((s) => s.setUser);
  const getVaultItems = async (idUser: string) => {
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
