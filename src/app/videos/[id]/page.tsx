// src/app/videos/[id]/page.tsx
import { Metadata } from 'next';
import { cld } from '@/lib/cloudinary';
import { previewUrl, thumbnailUrl } from '@/lib/transforms';
import VideoPlayer from '@/components/VideoPlayer';
import PreviewPlayer from '@/components/PreviewPlayer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface Params {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
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

  // generate posters here on the server
  const originalPoster = thumbnailUrl(id, 800);
  const previewPoster = thumbnailUrl(id, 800);

  return (
    <main className='min-h-screen bg-gray-50 p-6 space-y-6'>
      <h1 className='text-center text-2xl font-bold'>Preview: {id}</h1>
      <div className='grid gap-6 md:grid-cols-2'>
        <section>
          <h2 className='mb-2 text-lg font-semibold'>Original Video</h2>
          <VideoPlayer src={originalUrl} poster={originalPoster} playsInline />
        </section>

        <section>
          <h2 className='mb-2 text-lg font-semibold'>AI Preview</h2>
          <PreviewPlayer src={aiPreview} poster={previewPoster} />
        </section>
      </div>
    </main>
  );
}
