// src/components/VideoUploader.tsx
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Dropzone = dynamic(() => import('react-dropzone'), { ssr: false });

export interface UploadResponse {
  publicId: string;
  format: string;
  url: string;
  preview: string;
}

export function VideoUploader({
  onUploadSuccess,
}: {
  onUploadSuccess?: (data: UploadResponse) => void;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(8);
  const [uploading, setUploading] = useState<boolean>(false);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  // abort in-flight upload if unmounted
  useEffect(() => () => xhrRef.current?.abort(), []);

  const isValid = Boolean(file) && duration > 0;

  const upload = useCallback(() => {
    if (!file || uploading) return;
    setUploading(true);
    toast('🔄 Upload started…', { icon: '⏳' });

    const form = new FormData();
    form.append('file', file);
    form.append('duration', String(duration));

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        const data: UploadResponse = JSON.parse(xhr.responseText);
        console.log('[Uploader] response', data);
        toast.success('🎉✅ Video uploaded!');
        onUploadSuccess?.(data);
        router.refresh();
      } else {
        console.error('[Uploader] failed:', xhr.status, xhr.statusText);
        toast.error('❌ Upload failed');
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      console.error('[Uploader] network error');
      toast.error('❌ Upload error');
    };

    xhr.open('POST', '/api/upload/video');
    xhr.send(form);
  }, [file, duration, uploading, onUploadSuccess, router]);

  return (
    <div className='space-y-4'>
      <Label>Choose a video</Label>
      <Dropzone
        onDrop={(accepted) => accepted[0] && setFile(accepted[0])}
        maxFiles={1}
        accept={{ 'video/*': [] }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
              isDragActive ? 'border-primary bg-muted/50' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <p className='break-words text-sm px-2'>{file.name}</p>
            ) : (
              <p className='text-center text-sm text-muted-foreground px-2'>
                Drag or click to select a video
              </p>
            )}
          </div>
        )}
      </Dropzone>

      <div className='space-y-1'>
        <Label>Preview duration: {duration}s</Label>
        <input
          type='range'
          min={1}
          max={30}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className='w-full'
        />
      </div>

      <Button
        onClick={upload}
        disabled={!isValid || uploading}
        className='w-full flex items-center justify-center'
      >
        {uploading ? (
          <>
            <Loader2 className='animate-spin mr-2 h-4 w-4' /> Uploading…
          </>
        ) : (
          'Upload & Preview'
        )}
      </Button>
    </div>
  );
}
