import { deleteVaultItem } from "@/services/vault";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteVaultItem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteVaultItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteVaultItem"] });
    },
  });

  const { mutateAsync, isPending, error } = mutation;

  return {
    deleteVaultItemAction: mutateAsync,
    loading: isPending,
    error: error,
  };
}
