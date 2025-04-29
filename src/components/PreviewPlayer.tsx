// src/components/PreviewPlayer.tsx
'use client';

interface PreviewPlayerProps {
  /** 8-second MP4 preview URL */
  src: string;
  /** Optional poster image URL */
  poster?: string;
}

export default function PreviewPlayer({ src, poster }: PreviewPlayerProps) {
  return (
    <video
      poster={poster} // ← shows while loading/if autoplay blocked
      muted // ← required for autoplay on most browsers
      loop // ← replay automatically
      autoPlay // ← start playing immediately
      playsInline // ← inline on iOS
      preload='auto' // ← load entire clip up front
      className='w-full aspect-video rounded-lg shadow bg-black object-cover'
    >
      <source src={src} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
