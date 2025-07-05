// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Category</h2>
      <nav>
        <ul>    
          <li><Link href="/">Category 1</Link></li>
          <li><Link href="/about">Category 2</Link></li>
          <li><Link href="/contact">Category 3</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
