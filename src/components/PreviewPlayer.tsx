'use client';

interface PreviewPlayerProps {
  /** Direct URL to an 8 s MP4 preview */
  src: string;
}

export default function PreviewPlayer({ src }: PreviewPlayerProps) {
  return (
    <video
      controls={true}
      muted
      loop
      playsInline
      preload='metadata'
      className='w-full aspect-video rounded-lg shadow bg-black object-cover'
    >
      <source src={src} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
