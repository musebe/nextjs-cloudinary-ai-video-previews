// src/components/VideoGrid.tsx
'use client';

import { useMemo } from 'react';
import { motion, Variants } from 'motion/react';
import { VideoCard, VideoItem } from './VideoCard';

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
      {sorted.map((video, index) => (
        <motion.li
          key={video.id}
          variants={itemVariants}
          layout
          role='listitem'
        >
          <VideoCard video={video} index={index} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
