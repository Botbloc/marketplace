import Sidebar_admin from "../../components/layout/Sidebar_admin";


export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar_admin />
      <div className="admin-content">
        
        {children}
      </div>
    </div>
  );
}
