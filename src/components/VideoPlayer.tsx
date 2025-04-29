// src/components/VideoPlayer.tsx
'use client';

interface VideoPlayerProps {
  /** MP4 source URL */
  src: string;
  /** Optional poster image URL (JPG/PNG) */
  poster?: string;
  /** Show native browser controls? */
  controls?: boolean;
  /** iOS inline playback? */
  playsInline?: boolean;
  /** Tailwind/CSS classes */
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  controls = true,
  playsInline = false,
  className = 'w-full aspect-video rounded-lg shadow bg-black object-cover',
}: VideoPlayerProps) {
  return (
    <video
      poster={poster} // ← mobile & desktop use this thumbnail
      controls={controls}
      playsInline={playsInline}
      preload='metadata'
      className={className}
    >
      <source src={src} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
