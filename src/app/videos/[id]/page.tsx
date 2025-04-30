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
    title: '🎬 Video Preview',
    openGraph: {
      title: '🎬 Video Preview',
      description: `AI-generated video preview for ${id}`,
    },
  } as Metadata;
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

  const originalPoster = thumbnailUrl(id, 800);
  const previewPoster = thumbnailUrl(id, 800);

  return (
    <main className='min-h-[70vh] bg-gradient-to-b from-white to-gray-50 p-6 space-y-10'>
      <div className='text-center'>
        <h1 className='text-3xl font-extrabold text-gray-800'>
          🎬 Video Preview
        </h1>
        <p className='text-gray-500 text-sm mt-1'>
          Enjoy the full video and AI-generated snippet
        </p>
      </div>

      <div className='grid gap-10 md:grid-cols-2 max-w-6xl mx-auto'>
        {/* Original Video */}
        <section className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-700'>
            Original Video
          </h2>
          <div className='relative aspect-video rounded-lg overflow-hidden shadow'>
            <VideoPlayer
              src={originalUrl}
              poster={originalPoster}
              playsInline
            />
          </div>
        </section>

        {/* AI Preview */}
        <section className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-700'>AI Preview</h2>
          <div className='relative aspect-video rounded-lg overflow-hidden shadow'>
            <PreviewPlayer src={aiPreview} poster={previewPoster} />
          </div>
        </section>
      </div>
    </main>
  );
}
