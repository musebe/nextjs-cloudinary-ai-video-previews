'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface PreviewPlayerProps {
  src: string;
}

export default function PreviewPlayer({ src }: PreviewPlayerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='relative w-full aspect-video bg-black rounded-lg overflow-hidden'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
          <Loader2 className='animate-spin h-6 w-6 text-white' />
        </div>
      )}
      <video
        src={src}
        controls
        preload='metadata'
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadedData={() => setLoading(false)}
      />
    </div>
  );
}
