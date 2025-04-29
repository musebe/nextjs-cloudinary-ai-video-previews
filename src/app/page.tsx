// src/app/page.tsx
import HomeClient from '@/components/HomeClient';
import { readVideos } from '@/lib/videoDb';
import { thumbnailUrl } from '@/lib/transforms';

// Raw rows from your DB have the same shape that videoDb.ts already exported:
//  • id             (string)
//  • originalUrl    (string)
//  • previewUrl     (string)
//  • title?         (string)
import type { VideoItem as DBVideoRow } from '@/lib/videoDb';

// The UI‐side VideoItem (used in VideoCard) needs two extra fields for posters:
import type { VideoItem as CardVideoItem } from '@/components/VideoCard';

export default async function HomePage() {
  // 1️⃣ Read your stored videos (DB shape)
  const rawVideos: DBVideoRow[] = await readVideos();

  // 2️⃣ Map each DB row → CardVideoItem by generating poster URLs
  const videos: CardVideoItem[] = rawVideos.map((row) => ({
    id: row.id,
    title: row.title,
    originalUrl: row.originalUrl,
    previewUrl: row.previewUrl,
    originalPoster: thumbnailUrl(row.id, 400),
    previewPoster: thumbnailUrl(row.id, 400),
  }));

  // 3️⃣ Pass the correctly‐shaped array into your client component
  return <HomeClient initialVideos={videos} />;
}
