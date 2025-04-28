// src/app/about/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    title: 'AI-Generated Previews',
    description:
      'Automatically extract and stitch together the most engaging moments of any video—no manual editing required.',
  },
  {
    title: 'Adjustable Duration',
    description:
      'Control the length of your preview with a simple slider, from quick 5-second teasers to longer highlights.',
  },
  {
    title: 'Side-by-Side Comparison',
    description:
      'See your original video and its AI-created preview next to each other to gauge impact at a glance.',
  },
  {
    title: 'Easy Next.js Integration',
    description:
      'Plug into any Next.js 15 app with a few lines of code and zero build-time overhead.',
  },
  {
    title: 'Responsive & Accessible',
    description:
      'Designed mobile-first, with keyboard navigation and ARIA labels for full accessibility.',
  },
  {
    title: 'Zero Backend Needed',
    description:
      'Leverage Cloudinary’s cloud APIs directly—no database or server-side code required beyond environment variables.',
  },
];

export default function AboutPage() {
  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20'>
      {/* Hero */}
      <section className='flex flex-col items-center text-center space-y-6 px-2'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 12,
            delay: 0.2,
          }}
          whileHover={{ scale: 1.1 }}
          className='text-6xl'
        >
          🎥
        </motion.div>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl'>
          Cloudinary AI Video Preview
        </h1>
        <p className='text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed'>
          Effortlessly generate smart, engaging video previews in your Next.js
          projects using Cloudinary’s AI. Skip the tedious manual edits and
          deliver eye-catching teasers in seconds.
        </p>
        <Link href='/' className='inline-block'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size='lg'>Try the Demo</Button>
          </motion.div>
        </Link>
        <div className='w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg mt-8'>
          <Image
            src='/preview.png'
            alt='Cloudinary AI Video Preview Demo'
            width={1200}
            height={600}
            priority
            className='object-cover w-full'
          />
        </div>
      </section>

      {/* Features */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2'>
        {FEATURES.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className='h-full hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='text-lg sm:text-xl'>
                  {feat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm sm:text-base'>
                  {feat.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Tech Stack */}
      <section className='space-y-4 px-2 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-2xl sm:text-3xl font-bold'
        >
          Built With
        </motion.h2>
        <div className='flex flex-wrap gap-3 justify-center'>
          <Badge variant='outline'>Next.js 15</Badge>
          <Badge variant='outline'>React 19</Badge>
          <Badge variant='outline'>Tailwind CSS 4</Badge>
          <Badge variant='outline'>shadcn/ui</Badge>
          <Badge variant='outline'>Motion.dev</Badge>
          <Badge variant='outline'>Cloudinary AI</Badge>
        </div>
      </section>
    </main>
  );
}
