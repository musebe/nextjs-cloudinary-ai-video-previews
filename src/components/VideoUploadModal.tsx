// src/components/VideoUploadModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ShimmerButton } from './magicui/shimmer-button';
import { VideoUploader, UploadResponse } from './VideoUploader';

export function VideoUploadModal({
  onUploadSuccess,
}: {
  onUploadSuccess?: (data: UploadResponse) => void;
}) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ShimmerButton className='shadow-2xl'>+ Upload Video</ShimmerButton>
      </DialogTrigger>

      <DialogContent className='max-w-lg p-6'>
        <DialogTitle>Upload & Preview</DialogTitle>

        <DialogDescription>
          Select a video file to upload and generate a preview.
        </DialogDescription>

        {/* ⚠️ Show this warning only while uploading */}
        {uploading && (
          <p className='mt-2 mb-4 text-sm text-yellow-700'>
            ⚠️ Upload in progress… please do not close this dialog.
          </p>
        )}

        <VideoUploader
          onUploadingChange={setUploading}
          onUploadSuccess={(data) => {
            onUploadSuccess?.(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
