// src/app/videos/[id]/page.tsx

import { Metadata } from 'next';
import { cld } from '@/lib/cloudinary';
import { previewUrl } from '@/lib/transforms';
import VideoPlayer from '@/components/VideoPlayer';
import PreviewPlayer from '@/components/PreviewPlayer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60; // ISR every 60 seconds

interface Params {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Preview • ${id}`,
    openGraph: { title: `Preview • ${id}` },
  };
}

export default async function VideoDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const publicId = `video-previews/${id}`;
  const originalUrl = cld.video(publicId).format('mp4').quality('auto').toURL();
  const aiPreview = previewUrl(id, 8);

  return (
    <main className='min-h-screen bg-gray-50 p-6 space-y-6'>
      <h1 className='text-center text-2xl font-bold'>Preview: {id}</h1>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Original Full-Length Video */}
        <section>
          <h2 className='mb-2 text-lg font-semibold'>Original Video</h2>
          <VideoPlayer src={originalUrl} playsInline />
        </section>

        {/* AI-Generated 8-Second Preview */}
        <section>
          <h2 className='mb-2 text-lg font-semibold'>AI Preview</h2>
          <PreviewPlayer src={aiPreview} />
        </section>
      </div>
    </main>
  );
}
