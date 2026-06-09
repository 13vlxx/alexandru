import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import handler from './dist/server/server.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const clientRoot = join(__dirname, 'dist/client')

const app = new Hono()

app.use('/assets/*', serveStatic({ root: clientRoot }))
app.use('/*', serveStatic({ root: clientRoot }))

app.all('*', (c) => handler.fetch(c.req.raw))

const port = Number(5173)

serve({ fetch: app.fetch.bind(app), port }, (info) => {
  console.log(`Server listening on http://0.0.0.0:${info.port}`)
})
