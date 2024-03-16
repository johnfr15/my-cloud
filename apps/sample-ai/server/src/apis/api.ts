import { Hono } from 'hono'
import { cors } from 'hono/cors'

const api = new Hono()
api.use('/posts/*', cors())

api.get('/posts', (c) => {
return c.text("You try to get post")
})

api.get('/posts/:id', (c) => {
const id = c.req.param('id')
return c.text("You trye to get post: " + id)
})

export default api