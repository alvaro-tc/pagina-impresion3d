import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Models3D } from './collections/Models3D'
import { Products } from './collections/Products'
import { Posts } from './collections/Posts'
import { Quotes } from './collections/Quotes'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { About } from './globals/About'
import { runSeed } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— PRINT BOX',
    },
  },
  collections: [Users, Media, Pages, Posts, Products, Models3D, Quotes],
  globals: [Header, Footer, About],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: process.env.PAYLOAD_MIGRATE !== '1',
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    if (process.env.PRINTBOX_SKIP_SEED === '1') return
    await runSeed(payload)
  },
})
