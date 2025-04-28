// src/components/VideoCard.tsx
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export interface VideoItem {
  id: string;
  title?: string;
  originalUrl: string;
  previewUrl: string;
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
          {/* Original Video */}
          <div className='relative aspect-video w-full bg-black'>
            <video
              src={video.originalUrl}
              controls
              className='object-cover w-full h-full'
            />
          </div>
          {/* AI Preview */}
          <motion.div
            className='relative aspect-video w-full bg-black group-hover:ring-2 group-hover:ring-primary'
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <video
              src={video.previewUrl}
              muted
              loop
              autoPlay={false}
              playsInline
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <Play className='w-12 h-12 text-white/80' />
            </div>
          </motion.div>
        </CardContent>
      </Link>
    </Card>
  );
}
