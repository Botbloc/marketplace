type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  content: T[];
  columns: Column<T>[];
};

const Table = <T extends { id: string | number },>({
  content,
  columns,
}: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns?.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((item) => (
          <tr key={item.id}>
            {columns?.map((col) => (
              <td key={String(col.key)}>{String(item[col.key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;