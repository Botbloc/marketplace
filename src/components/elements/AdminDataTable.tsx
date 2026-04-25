"use client";

import { useEffect, useState } from "react";
import { fetchWithTokenAuth } from "../../lib/api";


type TableColumn<T> = {
  key: keyof T;
  label: string;
};

type AdminDataTableProps<T> = {
  title: string;
  endpoint: string;
  columns: TableColumn<T>[];
};

export default function AdminDataTable<T extends { id: string }>({
  title,
  endpoint,
  columns,
}: AdminDataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        console.log(`${process.env.NEXT_PUBLIC_URL}${endpoint}`);
        const result : any = await fetchWithTokenAuth(`${process.env.NEXT_PUBLIC_URL}${endpoint}`, {
          method: "GET",
          
        });

        setData(result?.data || result?.items || result?.users || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  if (loading) {
    return <div className="admin-table-status">Loading {title}...</div>;
  }

  if (error) {
    return <div className="admin-table-error">{error}</div>;
  }

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
                <th key={String(column.key)}>{column.label}</th>
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
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {String(row[column.key] ?? "-")}
                    </td>
                  ))}

                  <td className="action-cell">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}