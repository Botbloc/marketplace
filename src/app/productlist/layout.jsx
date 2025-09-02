// app/layout.tsx
import { Suspense } from "react";
export const metadata = {
  title: 'Next.js App with Sidebar',
  description: 'Plain CSS Sidebar Layout',
};

export default function layout({ children }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
    
  );
}
