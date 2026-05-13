"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { fetchWithSessionAuth } from "../../lib/api";
import {
  AdminDataTableProps,
  SortDirection,
} from "../../types/Index";

export default function AdminDataTable<T extends Record<string, unknown>>({
  title,
  endpoint,
  columns,
  rowKey,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onEdit,
  refreshKey,
}: AdminDataTableProps<T>) {
  const defaultPageSize = initialPageSize > 0 ? initialPageSize : 10;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: SortDirection;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const requestUrl = `${process.env.NEXT_PUBLIC_URL ?? ""}${endpoint}`;
        const result: any = await fetchWithSessionAuth(requestUrl, {
          method: "GET",
        });
        const nextData = Array.isArray(result)
          ? result
          : result?.data || result?.items || result?.users || [];

        setData(Array.isArray(nextData) ? nextData : []);
        setCurrentPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, title, refreshKey]);

  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [defaultPageSize]);

  if (loading) {
    return <div className="admin-table-status">Loading {title}...</div>;
  }

  if (error) {
    return <div className="admin-table-error">{error}</div>;
  }

  const getRowKey = (row: T, index: number) => {
    const preferredKey = rowKey ? row[rowKey] : undefined;
    const fallbackKey = preferredKey ?? row.id ?? row.uid ?? index;

    return String(fallbackKey);
  };

  const normalizedPageSizeOptions = Array.from(
    new Set([...pageSizeOptions, defaultPageSize].filter((size) => size > 0))
  ).sort((first, second) => first - second);

  const getSortableValue = (value: unknown): number | string => {
    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }

    if (typeof value === "string") {
      const trimmedValue = value.trim();
      const numericValue = Number(trimmedValue);

      if (trimmedValue !== "" && !Number.isNaN(numericValue)) {
        return numericValue;
      }

      const dateValue = Date.parse(trimmedValue);

      if (!Number.isNaN(dateValue)) {
        return dateValue;
      }

      return trimmedValue.toLowerCase();
    }

    if (
      typeof value === "object" &&
      "_seconds" in value &&
      typeof value._seconds === "number"
    ) {
      return value._seconds;
    }

    return JSON.stringify(value).toLowerCase();
  };

  const sortedData = [...data].sort((firstRow, secondRow) => {
    if (!sortConfig) {
      return 0;
    }

    const firstValue = getSortableValue(firstRow[sortConfig.key]);
    const secondValue = getSortableValue(secondRow[sortConfig.key]);

    if (firstValue === secondValue) {
      return 0;
    }

    const result = firstValue > secondValue ? 1 : -1;
    return sortConfig.direction === "asc" ? result : -result;
  });

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex =
    sortedData.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sortedData.length);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (key: keyof T) => {
    setSortConfig((currentSort) => {
      if (!currentSort || currentSort.key !== key) {
        return { key, direction: "asc" };
      }

      return {
        key,
        direction: currentSort.direction === "asc" ? "desc" : "asc",
      };
    });
    setCurrentPage(1);
  };

  const getSortLabel = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      return "-";
    }

    return sortConfig.direction === "asc" ? "^" : "v";
  };

  return (
    <section className="admin-table-container">
      <div className="admin-table-header">
        <h2>{title}</h2>
        <span>{data.length} records</span>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  aria-sort={
                    sortConfig?.key === column.key
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <button
                    type="button"
                    className="sort-button"
                    onClick={() => handleSort(column.key)}
                  >
                    <span>{column.label}</span>
                    <span className="sort-indicator">
                      {getSortLabel(column.key)}
                    </span>
                  </button>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="empty-cell">
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={getRowKey(row, startIndex + index)}>
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? "-")}
                    </td>
                  ))}

                  <td className="action-cell">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => onEdit?.(row)}
                    >
                      Edit
                    </button>
                    <button type="button" className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 ? (
        <div className="admin-table-pagination">
          <div className="pagination-summary">
            <span>
              Showing {startIndex + 1}-{endIndex} of {sortedData.length}
            </span>

            <label>
              Rows per page
              <select value={pageSize} onChange={handlePageSizeChange}>
                {normalizedPageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={safeCurrentPage === 1}
            >
              First
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {safeCurrentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={safeCurrentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
