// app/layout.tsx
export const metadata = {
  title: 'Next.js App with Sidebar',
  description: 'Plain CSS Sidebar Layout',
};

export default function layout({ children }) {
  return (
    <div>
      {children}
    </div>
    
  );
}
