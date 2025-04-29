// scripts/migrateVideos.ts

// (Uncomment if you keep your vars in a .env file)
// import 'dotenv/config'

import fs from 'fs/promises'
import path from 'path'
import { Redis } from '@upstash/redis'

async function migrate() {
  const DB = path.join(process.cwd(), 'data/videos.json')
  const txt = await fs.readFile(DB, 'utf8')
  const videos = JSON.parse(txt)

  const redis = new Redis({
    url: 'https://grown-pigeon-19155.upstash.io',
    token: 'AUrTAAIjcDE4ZGI1NjgwMmQ1MGE0OTY3OTU0NTVkY2UzOTYxODdhOHAxMA',
  })

  await redis.set('videos', JSON.stringify(videos, null, 2))
  console.log('Migration complete!')
}

migrate().catch(console.error)


// to run npx tsx scripts/migrateVideos.ts