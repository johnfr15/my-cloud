import openai from "./apis/openai"
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'


const PORT = 80
const app = new Hono()

app.use("*", logger())
app.use('/openai/*', cors())
app.use('/*', serveStatic({ root: './src/public' }));


app.route('/openai', openai);

console.log( `Listening on port ${ PORT }` )
serve({
    fetch: app.fetch,
    port: PORT,
})