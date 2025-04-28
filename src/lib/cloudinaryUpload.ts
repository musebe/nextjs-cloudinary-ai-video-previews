// src/lib/cloudinaryUpload.ts

import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from 'cloudinary';

export class CloudinaryUploadError extends Error {
    public httpCode?: number;
    constructor(message: string, httpCode?: number) {
        super(message);
        this.name = 'CloudinaryUploadError';
        this.httpCode = httpCode;
    }
}

/**
 * Uploads a Buffer to Cloudinary using `upload_stream`,
 * and throws a CloudinaryUploadError on failure.
 */
export function uploadVideoBuffer(
    buffer: Buffer,
    options: UploadApiOptions
): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            options,
            (err, result) => {
                if (err) {
                    // Wrap in our custom error
                    const code = (err as any).http_code;
                    reject(new CloudinaryUploadError(err.message, code));
                } else {
                    resolve(result!);
                }
            }
        );
        stream.end(buffer);
    });
}
