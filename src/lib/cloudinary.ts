// src/lib/cloudinary.ts

import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
if (!cloudName) {
    throw new Error(
        "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in environment variables"
    );
}

export const cld = new Cloudinary({
    cloud: { cloudName },
    url: { secure: true },
});
