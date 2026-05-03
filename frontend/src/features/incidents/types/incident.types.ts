export type Severity = "low" | "medium" | "high" | "critical";
export type Status = "open" | "investigating" | "resolved";

export interface Incident {
  id: string;
  title: string;
  description?: string;
  service: string;
  severity: Severity;
  status: Status;
  createdAt: string;
  updatedAt: string;
}


export interface IncidentListResponse {
  data: Incident[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    sortBy: string;
    sortOrder: "ASC" | "DESC";
  };
  stats: {
    total: number;
    open: number;
    investigating: number;
    resolved: number;
    
  };

  severityStats: {
  critical: number;
  high: number;
  medium: number;
  low: number;
};
}