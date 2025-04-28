// src/app/videos/[id]/page.tsx

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60; // ISR every 60 seconds

import { Metadata } from 'next';
import { cld } from '@/lib/cloudinary';
import { previewUrl } from '@/lib/transforms';
import PreviewPlayer from '@/components/PreviewPlayer';

const FOLDER = 'video-previews';

interface Props {
  params: { id: string };
}

// Fix: generateMetadata needs to await props.params
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  return {
    title: `Preview • ${id}`,
    openGraph: { title: `Preview • ${id}` },
  };
}

// Fix: VideoDetail needs to await props.params
export default async function VideoDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const publicId = `${FOLDER}/${id}`;

  const originalUrl = cld.video(publicId).toURL();
  const aiPreview = previewUrl(id, 8); // duration=8 produces “duration_8.0”

  return (
    <main className='min-h-screen bg-gray-50 p-6 space-y-6'>
      <h1 className='text-center text-2xl font-bold'>Preview: {id}</h1>
      <div className='grid gap-6 md:grid-cols-2'>
        <section>
          <h2 className='mb-2 text-lg font-semibold'>Original Video</h2>
          <video
            src={originalUrl}
            controls
            preload='metadata'
            className='w-full aspect-video rounded-lg shadow'
          />
        </section>
        <section>
          <h2 className='mb-2 text-lg font-semibold'>AI-Generated Preview</h2>
          <PreviewPlayer src={aiPreview} />
        </section>
      </div>
    </main>
  );
}
