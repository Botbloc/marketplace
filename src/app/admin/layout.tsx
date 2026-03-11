import Sidebar from "../../components/layout/Sidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        
        {children}
      </div>
    </div>
  );
}