// app/layout.tsx
import '../globals.css';
import Sidebar from '../../components/layout/Sidebar';

export const metadata = {
  title: 'Next.js App with Sidebar',
  description: 'Plain CSS Sidebar Layout',
};

export default function layout({ children }) {
  return (
    <div className="body-container">
    
      <Sidebar />
      <main className="product_list">
        {children}
      </main>
    </div>
  );
}
