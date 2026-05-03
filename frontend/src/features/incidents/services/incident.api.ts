import { api } from "@/lib/axios";
import type { IncidentListResponse, Severity, Status } from "../types/incident.types";


export interface IncidentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: Status | "";
  severity?: Severity | "";
  service?: string;
  createdFrom?: string;
  createdTo?: string;
  sortOrder?: "ASC" | "DESC";
}

export const getIncidentById = async (id: string) => {
  const res = await api.get(`/incidents/${id}`);
  return res.data;
};

export const analyzeIncident = async (data: {
  title: string;
  description: string;
}): Promise<{
  severity: "low" | "medium" | "high" | "critical";
  service: string;
}> => {
  const response = await api.post("/ai/analyze", data);
  return response.data;
};

const normalizeDateFilters = (params?: IncidentQueryParams) => {
  if (!params) return params;

  return {
    ...params,
    createdFrom: params.createdFrom
      ? `${params.createdFrom}T00:00:00.000+03:00`
      : params.createdFrom,
    createdTo: params.createdTo
      ? `${params.createdTo}T23:59:59.999+03:00`
      : params.createdTo,
  };
};

export const getIncidents = async (
  params?: IncidentQueryParams
): Promise<IncidentListResponse> => {
  const normalizedParams = normalizeDateFilters(params);

  const cleanParams = Object.fromEntries(
    Object.entries(normalizedParams ?? {}).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null
    )
  );

  const response = await api.get("/incidents", {
    params: cleanParams,
  });

  return response.data;
};

export const createIncident = async (data: {
  title: string;
  description?: string;
  service: string;
  severity: Severity;
}) => {
  const response = await api.post("/incidents", data);
  return response.data;
};