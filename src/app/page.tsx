// src/app/page.tsx
import { readVideos } from '@/lib/videoDb';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const videos = await readVideos();
  return <HomeClient initialVideos={videos} />;
}
