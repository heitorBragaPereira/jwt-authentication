import { createUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    createUser: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
