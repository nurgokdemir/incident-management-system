import type { Severity, Status } from "./incident.types";

export type SortOrder = "ASC" | "DESC";

export type IncidentFilters = {
  search: string;
  status: Status | "";
  severity: Severity | "";
  service: string;
  createdFrom: string;
  createdTo: string;
  sortOrder: SortOrder;
};

export const EMPTY_FILTERS: IncidentFilters = {
  search: "",
  status: "",
  severity: "",
  service: "",
  createdFrom: "",
  createdTo: "",
  sortOrder: "DESC",
};