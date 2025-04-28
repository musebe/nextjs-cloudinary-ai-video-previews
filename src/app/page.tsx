// src/app/page.tsx
export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start pt-24 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-4xl font-extrabold text-center'>
        Cloudinary AI Video Preview
      </h1>
      <p className='mt-2 text-gray-600 text-center max-w-xl'>
        Upload a video below and let Cloudinary AI generate a smart preview
        automatically.
      </p>

      {/* Placeholder for your upload & preview components */}
      <div className='w-full max-w-2xl mt-12'>{/* <UploadVideo /> */}</div>
    </div>
  );
}
