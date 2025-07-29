// app/layout.tsx
import SubHeader from "../../components/layout/SubHeader";

export const metadata = {
  title: 'Next.js App with Sidebar',
  description: 'Plain CSS Sidebar Layout',
};

export default function layout({ children }) {
  return (
    <div className="">
      <SubHeader/>
      <div className="body-container">      
        <main className="product_list_window">
          {children}
        </main>
      </div>
    </div>
    
  );
}
