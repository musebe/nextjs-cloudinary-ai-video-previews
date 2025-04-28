// src/components/Footer.tsx
'use client';

import { motion } from 'motion/react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='mt-auto bg-gray-50 text-gray-600 py-4'
    >
      <div className='mx-auto max-w-7xl flex flex-col items-center gap-4 px-4'>
        {/* project tagline */}
        <p className='text-sm font-medium'>
          Cloudinary AI Video Preview &mdash; demo powered by
          Next.js&nbsp;&amp;&nbsp;Cloudinary
        </p>

        {/* tech badges */}
        <div className='flex flex-wrap justify-center gap-2 text-xs'>
          <a
            href='https://nextjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Next.js-15-blue?logo=next.js'
              alt='Next.js 15 badge'
              height={24}
            />
          </a>
          <a
            href='https://cloudinary.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Cloudinary-AI--powered-lightblue?logo=cloudinary'
              alt='Cloudinary AI-powered badge'
              height={24}
            />
          </a>
          <a
            href='https://tailwindcss.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Tailwind-4.0-38BDF8?logo=tailwindcss'
              alt='Tailwind CSS 4 badge'
              height={24}
            />
          </a>
          <a
            href='https://ui.shadcn.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/shadcn.ui-components-pink?logo=tailwindcss'
              alt='shadcn/ui badge'
              height={24}
            />
          </a>
          <a
            href='https://motion.dev/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://img.shields.io/badge/Motion.dev-framer--motion-orange?logo=framer-motion'
              alt='framer-motion badge'
              height={24}
            />
          </a>
        </div>

        {/* author & repo */}
        <p className='text-xs text-gray-500 text-center'>
          Built by{' '}
          <a
            href='https://github.com/musebe/nextjs-cloudinary-ai-video-previews'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gray-700'
          >
            Eugine Musebe
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
