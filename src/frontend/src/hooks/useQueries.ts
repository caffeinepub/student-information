import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentRecord } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllRecords() {
  const { actor, isFetching } = useActor();
  return useQuery<StudentRecord[]>({
    queryKey: ["students"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitRecord() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      rollNumber: string;
      collegeName: string;
      address: string;
      phoneNumber: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitRecord(
        data.rollNumber,
        data.collegeName,
        data.address,
        data.phoneNumber,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
