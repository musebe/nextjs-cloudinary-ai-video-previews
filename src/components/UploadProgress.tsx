// src/components/UploadProgress.tsx
'use client';

import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  /** 0–100 */
  progress: number;
}

export function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className='w-full'>
      <Progress value={progress} max={100} className='h-2 rounded-full' />
      <p className='text-xs text-right mt-1'>{progress}% uploaded</p>
    </div>
  );
}
