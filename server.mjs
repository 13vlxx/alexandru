import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import handler from './dist/server/server.js'

const app = new Hono()

// Serve hashed assets with long-lived cache
app.use('/assets/*', async (c, next) => {
  await next()
  c.res.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
})
app.use('/assets/*', serveStatic({ root: './dist/client' }))
app.use('/*', serveStatic({ root: './dist/client' }))

// SSR handler — HTML must never be cached so asset hashes stay in sync
app.all('*', async (c) => {
  const res = await handler.fetch(c.req.raw)
  const newRes = new Response(res.body, res)
  newRes.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  return newRes
})

const port = Number(process.env.PORT ?? 5173)

serve({ fetch: app.fetch.bind(app), port }, (info) => {
  console.log(`Server listening on http://0.0.0.0:${info.port}`)
})
