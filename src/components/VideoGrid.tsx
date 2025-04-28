// src/components/VideoGrid.tsx
'use client';

import { useMemo } from 'react';
import { motion, Variants } from 'motion/react';
import { VideoCard } from './VideoCard';

export interface VideoItem {
  id: string;
  title?: string;
  originalUrl: string;
  previewUrl: string;
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

interface VideoGridProps {
  videos: VideoItem[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  // filter and reverse so newest first
  const sorted = useMemo(
    () => videos.filter((v): v is VideoItem => Boolean(v && v.id)).reverse(),
    [videos]
  );

  return (
    <motion.ul
      variants={containerVariants}
      initial='hidden'
      animate='show'
      role='list'
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
    >
      {sorted.map((video) => (
        <motion.li
          key={video.id} // ← unique key prop
          variants={itemVariants}
          layout // helps Motion with layout shifts
          role='listitem'
        >
          <VideoCard video={video} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
