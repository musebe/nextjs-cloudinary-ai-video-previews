// src/components/VideoCard.tsx
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import PreviewPlayer from './PreviewPlayer';

export interface VideoItem {
  id: string;
  title?: string;
  originalUrl: string;
  previewUrl: string;
  originalPoster: string; // ← JPG for <VideoPlayer>
  previewPoster: string; // ← JPG for <PreviewPlayer>
}

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className='flex flex-col hover:shadow-lg transition-shadow'>
      <Link href={`/videos/${video.id}`} className='flex flex-col flex-1'>
        <CardHeader>
          <CardTitle className='text-lg line-clamp-2'>
            {video.title ?? `Video ${video.id}`}
          </CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-4'>
          {/* Original Full-Length Video */}
          <section>
            <h3 className='mb-1 font-semibold text-sm'>Original</h3>
            <div className='relative aspect-video w-full bg-black'>
              <VideoPlayer
                src={video.originalUrl}
                poster={video.originalPoster}
                playsInline
              />
            </div>
          </section>

          {/* AI-Generated Preview */}
          <section>
            <h3 className='mb-1 font-semibold text-sm'>AI Preview</h3>
            <motion.div
              className='relative aspect-video w-full bg-black group-hover:ring-2 group-hover:ring-primary'
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <PreviewPlayer
                src={video.previewUrl}
                poster={video.previewPoster}
              />
              <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <Play className='w-12 h-12 text-white/80' />
              </div>
            </motion.div>
          </section>
        </CardContent>
      </Link>
    </Card>
  );
}

export default VideoCard;
