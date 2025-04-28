// src/components/VideoUploadModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShimmerButton } from './magicui/shimmer-button';
import { VideoUploader, UploadResponse } from './VideoUploader';


export function VideoUploadModal({
  onUploadSuccess,
}: {
  onUploadSuccess?: (data: UploadResponse) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ShimmerButton className='shadow-2xl'>+ Upload Video</ShimmerButton>
      </DialogTrigger>

      <DialogContent className='max-w-lg p-6'>
        <DialogTitle>Upload & Preview</DialogTitle>
        <VideoUploader
          onUploadSuccess={(data) => {
            onUploadSuccess?.(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
