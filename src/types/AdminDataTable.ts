import { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export type AdminDataTableProps<T> = {
  title: string;
  endpoint: string;
  columns: TableColumn<T>[];
  rowKey?: keyof T;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  refreshKey?: number;
};
