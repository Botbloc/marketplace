// app/not-found.tsx
'use client';
import {useRouter} from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  const href = "/";
  return (
    <div className="not_found" style={{ padding: '300px', textAlign: 'center' }}>
      <h1 className="heading">Page coming soon!</h1>
      <p></p>
      <button
        onClick={(e)=> router.push(href)}
      >
        Click to explore
      </button>
    </div>
  );
}
