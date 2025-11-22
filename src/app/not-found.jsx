// app/not-found.tsx
'use client';
import {useRouter} from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  const href = "/";
  return (
    <div className="not_found">
      <div class="starfield">
        <div class="stars-layer layer1"></div>
        <div class="stars-layer layer2"></div>
        <div class="stars-layer layer3"></div>
      </div>
      <div className="orbit-scene">
        <div className="planet"></div>
        <div className="orbit-ring">
          <span className="orbit-text">Page coming soon!</span>
        </div>
        <div className="orbit-ring_2">
          <span className="orbit-text_2">Site Under Construction!</span>
        </div>
      </div>

      <button onClick={() => router.push(href)}>
        Click to explore
      </button>
    </div>
  );
}
