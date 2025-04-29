// src/components/HomeClient.tsx
'use client';

import { useState, useCallback } from 'react';
import { VideoUploadModal } from '@/components/VideoUploadModal';
import { VideoGrid } from './VideoGrid';
import { thumbnailUrl } from '@/lib/transforms';
import type { VideoItem } from './VideoCard';

export default function HomeClient({
  initialVideos,
}: {
  initialVideos: VideoItem[];
}) {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);

  /**
   * When a user uploads, Cloudinary responds with:
   *   publicId, format, url (full MP4), preview (8s MP4), [title]
   */
  const handleUploadSuccess = useCallback(
    (resp: {
      publicId: string;
      format: string;
      url: string;
      preview: string;
      title?: string;
    }) => {
      const newVideo: VideoItem = {
        id: resp.publicId,
        title: resp.title,
        originalUrl: resp.url,
        previewUrl: resp.preview,
        originalPoster: thumbnailUrl(resp.publicId, 400),
        previewPoster: thumbnailUrl(resp.publicId, 400),
      };
      setVideos((prev) => [newVideo, ...prev]);
    },
    []
  );

  return (
    <div className='min-h-screen flex flex-col items-center pt-24 px-4 sm:px-6 lg:px-8 space-y-12'>
      <header className='text-center space-y-2'>
        <h1 className='text-4xl font-extrabold'>Cloudinary AI Video Preview</h1>
        <p className='text-gray-600 max-w-xl mx-auto'>
          Upload a video and get an AI-generated preview instantly.
        </p>
      </header>

      <VideoUploadModal onUploadSuccess={handleUploadSuccess} />

      {videos.length > 0 && (
        <section className='w-full max-w-7xl'>
          <h2 className='text-2xl font-semibold mb-4'>Your Videos</h2>
          <VideoGrid videos={videos} />
        </section>
      )}
    </div>
  );
}
