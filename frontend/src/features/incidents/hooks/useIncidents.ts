import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIncident,
  getIncidents,
  type IncidentQueryParams,
} from "../services/incident.api";
import { getIncidentById } from "../services/incident.api";

export function useIncident(id?: string) {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => getIncidentById(id!),
    enabled: !!id,
  });
}


export function useIncidents(params?: IncidentQueryParams) {
 return useQuery({
    queryKey: ["incidents", params],
    queryFn: () => getIncidents(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
}