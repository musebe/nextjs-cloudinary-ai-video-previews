'use client';

interface VideoPlayerProps {
  /** Direct URL to an MP4 */
  src: string;
  /** Show native controls? */
  controls?: boolean;
  /** iOS inline playback? */
  playsInline?: boolean;
  /** Extra CSS classes */
  className?: string;
}

export default function VideoPlayer({
  src,
  controls = true,
  playsInline = false,
  className = 'w-full aspect-video rounded-lg shadow bg-black object-cover',
}: VideoPlayerProps) {
  return (
    <video
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
