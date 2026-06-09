import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import handler from './dist/server/server.js'

const app = new Hono()

app.use('/assets/*', serveStatic({ root: './dist/client' }))
app.use('/*', serveStatic({ root: './dist/client' }))

app.all('*', (c) => handler.fetch(c.req.raw))

const port = Number(5173)

serve({ fetch: app.fetch.bind(app), port }, (info) => {
  console.log(`Server listening on http://0.0.0.0:${info.port}`)
})
